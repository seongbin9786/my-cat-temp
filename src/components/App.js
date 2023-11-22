import { Component, jsx } from "@seongbin9786/my-renderer";

export class App extends Component {
    state = {
        loading: false,
        currentId: 0,
        allFolders: [],
        parentFolders: [],
        currentImagePath: null,
        imageViewerOpen: false,
    };

    constructor(props) {
        super(props);

        this.goToChildDirectory('0', '전체');
    }

    handleBreadcrumbClick(folderId) {
        const { parentFolders } = this.state;
        const targetIdx = parentFolders.findIndex(({ id }) => id === folderId);

        // CASE 1. 가장 우측의 폴더(현재 폴더)를 클릭한 경우 무시됨
        if (targetIdx === parentFolders.length - 1) {
            return;
        }

        this.setState({ 
            currentId: folderId,
            parentFolders: parentFolders.slice(0, targetIdx + 1),
        });
    }

    // 해당 folderId 뒤는 잘라내야 함
    goToChildDirectory(folderId, folderName) {
        const { allFolders, parentFolders } = this.state;

        if (!allFolders[folderId]) {
            this.getFolderById(folderId);
        }

        this.setState({ 
            currentId: folderId,
            parentFolders: [
                ...parentFolders,
                { 
                    id: folderId,
                    name: folderName,
                },
            ],
        });
    }

    goToParentDirectory() {
        const { parentFolders } = this.state;

        // 최상위 부모 상태일 때는 무시
        if (parentFolders.length === 1) {
            return;
        }

        const nextParentFolders = [...parentFolders];
        const { id: parentId } = nextParentFolders[nextParentFolders.length - 2]; // 끝에서 2번째 위치가 대상
        nextParentFolders.pop(); // FIXME: pop() 보다 좋은 방법 =?

        this.setState({ 
            currentId: parentId,
            parentFolders: nextParentFolders,
        });
    }

    async getFolderById(id) {
        this.setState({ loading: true });

        const folder = await this.props.api.fetchFolderById(id);

        this.setState({
            loading: false,
            allFolders: {
                ...this.state.allFolders,
                [id]: folder,
            }
        });
    }

    openImageViewer(currentImagePath) {
        this.setState({ 
            imageViewerOpen: true, 
            currentImagePath,
        });
    }

    closeImageViwer() {
        this.setState({ 
            imageViewerOpen: false,
            currentImagePath: null,
        });
    }

    render() {
        const { api } = this.props;
        const { 
            loading, 
            allFolders,
            currentId,
            parentFolders,
            imageViewerOpen, 
            currentImagePath,
        } = this.state;
        const currentFolder = allFolders[currentId]; // object key로 관리한다.

        return jsx`
            <div>
                <Breadcrumb 
                    folders=${parentFolders}
                    goToDirectory=${this.handleBreadcrumbClick.bind(this)}
                />
                <Folder
                    api=${api}
                    loading=${loading}
                    currentFolder=${currentFolder}
                    currentId=${currentId}
                    goToParentDirectory=${this.goToParentDirectory.bind(this)}
                    goToChildDirectory=${this.goToChildDirectory.bind(this)}
                    openImageViewer=${this.openImageViewer.bind(this)}
                />
                <ImageViewer 
                    open=${imageViewerOpen} 
                    handleClose=${this.closeImageViwer.bind(this)} 
                    imageUrl=${currentImagePath}
                    api=${api}
                />
            </div>
        `;
    }
}
