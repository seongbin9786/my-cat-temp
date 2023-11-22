import { Component, jsx } from "@seongbin9786/my-renderer";

export class Breadcrumb extends Component {
    
    // 폴더 변경이 없을 때는 리-렌더 필요 없음.
    // 현재는 이미지를 열고 닫을 때 리-렌더가 감소되는 효과가 있음.
    shouldComponentUpdate(nextProps) {
        if (this.props.folders === nextProps.folders) {
            return false;
        }
        return true;
    }

    render() {
        const { folders, goToDirectory } = this.props;

        return jsx`
            <div className=Breadcrumb>
                ${folders.map(({ id, name }) => jsx`
                    <div onclick=${() => goToDirectory(id)}>
                        ${name}
                    </div>
                `)}
            </div>
        `;
    }
}
