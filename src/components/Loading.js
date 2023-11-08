import { createDOMSpec as jsx } from "../shared/Parser.js";

export const Loading = (api) => jsx`<div><img style=${{ width: "100%" }} src=${api.loadingUrl()} /></div>`;
