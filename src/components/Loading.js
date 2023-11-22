import { jsx } from "@seongbin9786/my-renderer";

export const Loading = (api) => jsx`
    <div>
        <img style=${{ width: "100%" }} src=${api.loadingUrl()} />
    </div>
`;
