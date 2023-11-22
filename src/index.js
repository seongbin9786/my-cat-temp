import { jsx, registerComponent, renderRoot } from "@seongbin9786/my-renderer";
import { API } from "./api.js";
import { App } from "./components/App.js";
import { Breadcrumb } from "./components/Breadcrumb.js";
import { File } from "./components/File.js";
import { Folder } from "./components/Folder.js";
import { ImageViewer } from "./components/ImageViewer.js";

// enableDebugModule('VDOM');
// enableDebugModule('Parser');
// enableDebugModule('NodeParser');

registerComponent('App', App);
registerComponent('File', File);
registerComponent('Folder', Folder);
registerComponent('Breadcrumb', Breadcrumb);
registerComponent('ImageViewer', ImageViewer);

const $body = document.getElementsByTagName('body').item(0);

const api = new API();

// FIXME: api 주입을 props drilling 말고 다르게 하는 방법?
renderRoot(
    jsx`<App api=${api} />`, 
    $body
);
