export const downloadFile = (url: string, fileName: string) => {
    var download = document.createElement("a");
    download.href = url;
    download.download = fileName;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
};

export const generateExcelFileURL = (data: string) => {
    return `data:application/vnd.ms-excel;base64,${encodeURIComponent(data)}`;
};
