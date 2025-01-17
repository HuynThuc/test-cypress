export interface IFileBody {
  fileName: string;
  uuid: string;
}

export interface IFileUpload {
  id: number;
  fileDisplay: string;
  fileName: string;
  dir: string;
  uuid: string;
}

export interface IDownloadFileRequest {
  uuid: string;
  fileName: string;
}

export interface IDownloadFileResponse {
  file: Blob;
  fileName: string;
}
