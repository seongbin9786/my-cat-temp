const API_END_POINT = "https://kdt-frontend.cat-api.programmers.co.kr";

const CDN_END_POINT = "https://cdn.roto.codes";

export class API {
    imageUrl(filePath) {
        return `${API_END_POINT}/static${filePath}`;
    }

    iconUrl(type) {
        return `${CDN_END_POINT}/images/${type.toLowerCase()}.png`;
    }

    loadingUrl() {
        return "https://cdn.roto.codes/images/nyan-cat.gif";
    }

    async fetchFolderById(folderId) {
        const url = `${API_END_POINT}/${folderId === '0' ? "" : folderId}`;
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error("고양이 폴더 목록을 불러오던 중 오류가 발생했습니다.");
        }
    
        return response.json();
    }
}
