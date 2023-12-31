import { Component, jsx } from "@seongbin9786/my-renderer";
import { Loading } from "./Loading.js";

export class Folder extends Component {

    #listener;

    // 이미지를 열고 닫을 때 굳이 리-렌더할 필요 없음.
    shouldComponentUpdate(nextProps) {
        if (this.props.loading !== nextProps.loading) {
            return true;
        }

        if (this.props.currentId !== nextProps.currentId) {
            return true;
        }

        return false;
    }

    componentDidMount() {
        this.#listener = this.handleBackspace.bind(this);
        window.addEventListener('keydown', this.#listener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.#listener);
    }

    handleBackspace(e) {
        if (e.key !== 'Backspace') {
            return;
        }
        this.props.goToParentDirectory();
    }

    render() {
        const {
            api,
            currentFolder,
            loading, 
            currentId,
            goToParentDirectory,
            goToChildDirectory,
            openImageViewer,
        } = this.props;

        return jsx`
            <div>
                ${loading
                    ? Loading(api)
                    : jsx`
                        <div className=Nodes>
                            ${currentId !== '0'
                                ? jsx`
                                    <File
                                        name=${"../"}
                                        type=prev
                                        goToDirectory=${goToParentDirectory}
                                        api=${api}
                                    />`
                                : null
                            }
                            ${currentFolder.map((file) => jsx`
                                <File 
                                    goToDirectory=${goToChildDirectory}
                                    openImageViewer=${openImageViewer}
                                    api=${api} 
                                    ${file}
                                />
                            `)}
                        </div>`
                }
            </div>
        `;
    }
}
