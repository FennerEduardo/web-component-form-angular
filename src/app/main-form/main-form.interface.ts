// interfaces to object JSON
export interface ObjectJson {
  author: Author;
  authorDependence: AuthorDependence;
  type: Type;
  reference: string;
  observations: string;
  sourceThirdPerson: SourceThirdPerson;
  targetDependence: TargetDependence;
  targetUser: TargetUser;
}

export interface Author {
  identification: string;
}

export interface AuthorDependence {
  code: string;
}

export interface Type {
  id: string;
}

export interface IdentificationType {
  name: string;
}

export interface Municipality {
  code: string;
}

export interface SourceThirdPerson {
  identificationType: IdentificationType;
  identification: string;
  name: string;
  lastname: string;
  email: string;
  address: string;
  phone: string;
  municipality: Municipality;
}

export interface TargetDependence {
  code: string;
}

export interface TargetUser {
  identification: string;
}


// interfaces to input file


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


