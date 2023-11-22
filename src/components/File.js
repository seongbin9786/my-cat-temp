import { Component, jsx } from "@seongbin9786/my-renderer";

export class File extends Component {

    handleClick() {
        const { type } = this.props;
        if (type === "FILE") {
            this.handleImageClick();
            return;
        }

        this.handleFolderClick();
    }

    handleImageClick() {
        const { filePath, openImageViewer } = this.props;

        openImageViewer(filePath);
    }

    handleFolderClick() {
        const { id, name, type, goToDirectory } = this.props;
        
        goToDirectory(id, name, type);
    }

    render() {
        const { name, type, api } = this.props;

        return jsx`
            <div className=Node onclick=${this.handleClick.bind(this)}>
                <img src=${api.iconUrl(type)} />
                <span>${name}</span>
            </div>
        `;
    }
}
