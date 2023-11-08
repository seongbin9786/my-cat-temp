import { Component } from "../shared/Component.js";
import { createDOMSpec as jsx } from "../shared/Parser.js";
import { Loading } from "./Loading.js";

export class Folder extends Component {

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
