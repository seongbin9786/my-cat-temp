import { Component } from "../shared/Component.js";
import { createDOMSpec as jsx } from "../shared/Parser.js";

export class ImageViewer extends Component {

    #listener;

    componentDidMount() {
        this.#listener = this.handleESC.bind(this);
        window.addEventListener('keydown', this.#listener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.#listener);
    }

    handleClickBackdrop(e) {
        if (!e.target.classList.contains("Modal")) { // 바깥 영역
            return;
        }
        this.props.handleClose();
    }

    handleESC(e) {
        if (e.key !== 'Escape') {
            return;
        }
        this.props.handleClose();
    }

    render() {
        const { open, imageUrl, api } = this.props;

        if (!open) {
            return null;
        }

        return jsx`
            <div className=Modal onclick=${this.handleClickBackdrop.bind(this)}>
                <div>
                    <img className=Modal__image src=${api.imageUrl(imageUrl)} />
                </div>
            </div>
        `;
    }
}
