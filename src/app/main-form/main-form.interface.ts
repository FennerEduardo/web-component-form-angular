export interface fileUploadMessageTypes {
  extensionNotAllowed: string;
  sizeNotAllowed: string;
  extensionsNotAllowed: string;
  sizesNotAllowed: string;
  noFile: string;
  maximumQuantityExceeded: string;
}


export interface newFile {
  file?: File
}


export interface configFileInputs {
  id?: string;
  validExtensions?: any;
  validSize?: number;
  maximumQuantity?: number;

}

export interface selectedFiles {
  id?: string;
  files?: any
}

export interface attachmentList {
  id?: string;
  files?: any
}
export interface validations{
  invalidExtensions?: number;
  invalidSize?: number;
}


