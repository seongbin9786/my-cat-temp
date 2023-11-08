import { API } from "./api.js";
import { App } from "./components/App.js";
import { Breadcrumb } from "./components/Breadcrumb.js";
import { File } from "./components/File.js";
import { Folder } from "./components/Folder.js";
import { ImageViewer } from "./components/ImageViewer.js";
import { DOMRenderer } from "./shared/DOMRenderer.js";
import { createDOMSpec } from "./shared/Parser.js";
import { VDOM } from "./shared/VDOM.js";
import { enableDebugModule } from "./shared/debug.js";

// enableDebugModule('VDOM');
// enableDebugModule('Parser');
// enableDebugModule('NodeParser');

VDOM.componentMap.set('App', App);
VDOM.componentMap.set('File', File);
VDOM.componentMap.set('Folder', Folder);
VDOM.componentMap.set('Breadcrumb', Breadcrumb);
VDOM.componentMap.set('ImageViewer', ImageViewer);

const $body = document.getElementsByTagName('body').item(0);

const api = new API();

// FIXME: api 주입을 props drilling 말고 다르게 하는 방법?
new DOMRenderer().renderRoot(
    createDOMSpec`<App api=${api} />`, 
    $body
);
