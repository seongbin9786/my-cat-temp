const API_END_POINT = "https://kdt-frontend.cat-api.programmers.co.kr";

/*
[
  {
    "id": "1",
    "name": "노란고양이",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": null
  },
  {
    "id": "3",
    "name": "까만고양이",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": null
  }
]
*/
export const fetchFolderById = async (folderId = "") => {
    const response = await fetch(`${API_END_POINT}${folderId}`);

    if (!response.ok) {
        throw new Error("고양이 폴더 목록을 불러오던 중 오류가 발생했습니다.");
    }

    return response.json();
};
