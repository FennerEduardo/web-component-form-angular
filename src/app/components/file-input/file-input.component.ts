import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { attachmentList, configFileInputs, fileUploadMessageTypes, selectedFiles, validations } from './file-input.interface';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  el: null | ElementRef = null;
  file: null | File = null;
  files: any = [];
  @Input('label') label: string = 'label'
  @Input('extensions') extensions: any = [];
  @Input('size') size: number = 0;
  @Input('quantity') quantity: number = 1;
  @Input('idElement') idElement: string = '';
  @Output() loadFiles: EventEmitter<any> = new EventEmitter();
  @Output() fileDeleted: EventEmitter<any> = new EventEmitter();
  @Output() enableSubmit: EventEmitter<any> = new EventEmitter();

  fileUploadMessageTypes: fileUploadMessageTypes = {
    extensionNotAllowed: 'Formato de archivo no permitido.',
    sizeNotAllowed: 'El archivo excede el tamaño máximo permitido.',
    extensionsNotAllowed: 'Uno de los archivos tiene un formato no admitido.',
    sizesNotAllowed: 'Uno de los archivos excede el tamaño máximo permitido.',
    noFile: 'Seleccione un documento para adjuntar.',
    maximumQuantityExceeded: 'Supera la cantidad de archivos permitida.'
  }

  attachmentList: attachmentList = {};
  selectedFiles: selectedFiles = { files: [], id: '' };
  configFileInputs: configFileInputs = {};
  validations: validations = {};

  parentInput: null | Object = null;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.setValidationParameters(this.idElement, this.extensions, this.size, this.quantity);
  }


  errorInputFile = (input: HTMLInputElement, active: boolean, message: string) => {

    const hostElem = this.el.nativeElement;

    const containerParent = hostElem.querySelector('.container-detail-carga-de-archivo-govco');
    const containerAlert = hostElem.querySelector('.alert-carga-de-archivo-govco');
    input.setAttribute('data-error', active ? "1" : "0");
    this.activateContainer(containerAlert, active);
    containerAlert.innerHTML = message;


    if (this.attachmentList.files.length <= 0) {
      containerParent.style.display = active ? 'block' : 'none';

    }
  }

  activateContainer = (container: HTMLDivElement, active: boolean) => {
    if (active) {
      container.classList.remove('visually-hidden');
    } else {
      container.classList.add('visually-hidden');
    }
  }


  validateFiles = (files: any): object => {
    let invalidExtensions: number = 0;
    let invalidSize: number = 0;
    let listValidExtensions = this.configFileInputs.validExtensions;
    const validSize: number = this.configFileInputs.validSize;


    if (listValidExtensions.length > 0 || validSize > 0) {
      [...files].forEach((element) => {
        const extensionFile = element.name.split('.').pop().toLowerCase();

        if (listValidExtensions && Array.isArray(listValidExtensions) && listValidExtensions.includes(extensionFile)) {
          if (validSize >= element.size) {
            this.selectedFiles.files.push(element);
          } else {
            invalidSize++;
          }
        } else {
          invalidExtensions++;
        }
      });
    } else {
      this.selectedFiles.files.push(...files);
    }

    return {
      'invalidExtensions': invalidExtensions,
      'invalidSize': invalidSize
    }
  }

  setValidationParameters = (idElement: string, extensions: any, size: number = 0, quantity: number = 1) => {

    const validExtensions = extensions.map((e: any) => e.toString().toLowerCase());
    const validSize = !isNaN(size) ? size : 0;
    const maximumQuantity = !isNaN(quantity) ? quantity : 0;

    this.configFileInputs = {
      id: idElement,
      maximumQuantity,
      validExtensions,
      validSize
    }
  }

  enableDisableFileUploadButton = (element: any, value: boolean) => {
    element.disabled = value;
  }

  assignName = (fileName: string | null) => {
    const hostElem = this.el.nativeElement;
    const containerNameFile = hostElem.querySelector('.file-name-carga-de-archivo-govco');
    containerNameFile.innerHTML = fileName ? fileName : 'Sin archivo seleccionado';
  }

  validationErrortext = (extensions: any, size: number) => {
    let textoError = '';
    if (extensions > 0) {
      if (extensions > 1) {
        textoError = this.fileUploadMessageTypes.extensionNotAllowed;
      } else {
        textoError = this.fileUploadMessageTypes.extensionsNotAllowed;
      }
    }

    if (size > 0) {
      if (size > 1) {
        textoError += ' ' + this.fileUploadMessageTypes.sizeNotAllowed;
      } else {
        textoError += ' ' + this.fileUploadMessageTypes.sizesNotAllowed;
      }
    }

    return textoError;
  }

  cleanInputfile = (inputFile: any, container: any | null = null) => {
    inputFile.value = '';
    if (container) this.assignName('');
  }

  clickButtonFile = async (event: Event) => {
    event.preventDefault();
    const btn = event.target as HTMLInputElement;
    const parentButton = btn.parentNode;

    const hostElem = this.el.nativeElement;

    const inputFile = hostElem.querySelector('.input-carga-de-archivo-govco');

    const idInput = inputFile.id;
    const containerLoader = hostElem.querySelector('.load-carga-de-archivo-govco');
    this.activateContainerLoader(containerLoader, true);
    this.enableDisableFileUploadButton(btn, true);

    if (inputFile.value) {

      const container = hostElem.querySelector('.attached-files-carga-de-archivo-govco');
      const span = hostElem.querySelector('.file-name-carga-de-archivo-govco');

      let filesResponse = await this.validateFunction(inputFile, containerLoader, parent, 'add', this.selectedFiles.files);


      if (filesResponse.length > 0) {


        this.createAttachedFiles(container, filesResponse, idInput);
        this.loadFiles.emit(this.selectedFiles);

        // containerParent.style.display = attachmentList[idInput].length > 0 ? 'block' : 'none';

        if (this.attachmentList.files.length >= this.configFileInputs.maximumQuantity) {
          inputFile.disabled = true;
          inputFile.classList.remove("active");
        }
      }

      this.cleanInputfile(inputFile);
    } else {
      this.errorInputFile(inputFile, true, this.fileUploadMessageTypes.noFile);
      this.activateContainerLoader(containerLoader, false);
    }
  }

  activateContainerLoader = (container: any, active: boolean) => {
    if (active) {
      container.style.visibility = "visible";
    } else {
      container.style.visibility = "hidden";
    }
  }

  validateFunction = async (inputFile: any, containerLoader: any, parent: any, action: string, listFiles: any) => {
    const nameDataAction = action == 'add' ? 'data-action' : 'data-action-delete';
    // const nameMethod = inputFile.getAttribute(nameDataAction);
    // let method;
    let answer: any = {};

    this.activateContainerLoader(containerLoader, false);


    if (nameDataAction === 'data-action') {
      answer = await this.uploadFile(listFiles);

    } else {
      answer = await this.deleteFile(listFiles);

    }
    this.activateContainerLoader(containerLoader, false);
    // this.loadFiles.emit(this.attachmentList);

    if (action == 'delete') return true;

    // if (!nameMethod) {
    //   console.error(nameDataAction + ' method is not defined');
    // }

    // try {
    //   method = new Function('return ' + nameMethod)();
    // } catch (error) {
    //   console.error(nameDataAction + ' method is not defined');
    // }

    // if (method) {
    //   try {
    //     answer = await method(listFiles);
    //     this.activateContainerLoader(containerLoader, false);
    //     if (action == 'delete') return true;
    //   } catch (error: any) {
    //     this.errorInputFile(inputFile, true, error);
    //     this.activateContainerLoader(containerLoader, false);
    //     this.cleanInputfile(inputFile, parent);
    //     if (action == 'delete') return false;
    //   }
    // } else {
    //   answer = listFiles;
    //   this.activateContainerLoader(containerLoader, false);
    //   if (action == 'delete') return true;
    // }
    return answer;
  }

  createAttachedFiles = (container: any, files: any, idInput: string) => {
    files.forEach((value: File, idx: number) => {
      const size = this.formatterSizeUnit(value.size);
      this.createElement(container, value.name, size, idx);
      this.attachmentList.files.push(value);
    });

    return true;
  }

  formatterSizeUnit = (size: any): string => {
    if (size) {

      let result: number = size;

      if (result < 1024) {
        return result + "bytes";
      } else if (result < 1024 * 1024) {
        return `${(result / 1024)}  KB`;
      } else if (result < 1024 * 1024 * 1024) {
        return `${result / (1024 * 1024)} MB`;
      } else {
        return `${result / (1024 * 1024 * 1024)}  GB`;
      }
    } else {
      return `${size}`;
    }
  }


  createElement = (container: any, name: string, type: string, idx: number) => {
    const newDivAttached = document.createElement('div');
    newDivAttached.classList.add('attached-file-carga-de-archivo-govco');
    newDivAttached.setAttribute("tabindex", `${idx}`);
    newDivAttached.setAttribute("id", `parent-${idx}`);

    const newDivContainerIcon = document.createElement('div');
    newDivContainerIcon.classList.add('icon-text-carga-de-archivo-govco');

    const newDivIconFile = document.createElement('div');
    newDivIconFile.classList.add('file-alt-carga-de-archivo-govco');

    const newDiv = document.createElement('div');
    newDiv.classList.add('container-text-name-carga-de-archivo-govco');
    const span1 = document.createElement('span');
    span1.classList.add('text-name-carga-de-archivo-govco');
    const textSpan1 = document.createTextNode(name);
    span1.appendChild(textSpan1); //añade texto al div creado.
    const span2 = document.createElement('span');
    const textSpan2 = document.createTextNode(type);
    span2.appendChild(textSpan2); //añade texto al div creado.

    const newButtonIconTrash = document.createElement('button');
    newButtonIconTrash.classList.add('trash-alt-1-carga-de-archivo-govco');
    newButtonIconTrash.setAttribute("data-id", `${idx}`);

    newDivContainerIcon.appendChild(newDivIconFile);
    newDiv.appendChild(span1);
    newDiv.appendChild(span2);
    newDivContainerIcon.appendChild(newDiv);
    newDivAttached.appendChild(newDivContainerIcon);
    newDivAttached.appendChild(newButtonIconTrash);
    container.appendChild(newDivAttached);

    newButtonIconTrash.addEventListener("click", this.removeAttachment, false);
  }


  removeAttachment = async (event: Event) => {
    event.preventDefault();
    const btn = event.target as HTMLInputElement;
    const hostElem = this.el.nativeElement;
    const parentId = btn.getAttribute('data-id');


    const containerAll = hostElem.querySelector(`#parent-${parentId}`);
    const inputFile = hostElem.querySelector('.input-carga-de-archivo-govco');
    const containerLoader = hostElem.querySelector('.load-carga-de-archivo-govco');
    const spanText = hostElem.querySelector('.file-name-carga-de-archivo-govco');
    const containerName = containerAll.querySelector('.text-name-carga-de-archivo-govco');
    const name = containerName.innerHTML;
    const element = this.attachmentList.files.find((file: any) => file.name === name);
    const index = this.attachmentList.files.indexOf(element);
    const index2 = this.selectedFiles.files.indexOf(element);


    this.activateContainerLoader(containerLoader, true);

    if (index >= 0) {
      const responseRemove = await this.validateFunction(
        inputFile, containerLoader, containerAll, 'delete', element
      );

      if (responseRemove === true) {

        this.attachmentList.files.splice(index, 1);
        this.selectedFiles.files.splice(index2, 1);

        containerAll.remove();

        if (this.attachmentList.files.length < this.configFileInputs.maximumQuantity) {

          inputFile.classList.add("active");
          inputFile.removeAttribute('disabled');
        }
      }
    } else {
      this.activateContainerLoader(containerLoader, false);
    }
    let fileName: string | null = '';
    if (this.selectedFiles.files.length > 1) {
      fileName = `${this.selectedFiles.files.length}   archivos seleccionados`;
    } else if(this.selectedFiles.files.length == 1) {
      fileName = this.selectedFiles.files[0].name;
    }else{
      fileName = null
    }

    this.assignName(fileName);
    // this.loadFiles.emit(this.selectedFiles);
    this.fileDeleted.emit(element)
  }

  selectingFiles(event: Event) {

    const input = event.target as HTMLInputElement;
    const idInput = input?.id;
    const parent = input?.parentNode;

    this.attachmentList.id = idInput;
    this.attachmentList.files = [];

    const parentCarga = parent?.parentNode;
    const button = parentCarga?.querySelector('.button-loader-carga-de-archivo-govco');

    let fileName = '';
    const maximumQuantity = this.configFileInputs.maximumQuantity;
    this.selectedFiles.id = idInput;

    this.errorInputFile(input, true, '');

    if ((this.attachmentList.files.length + input.files?.length) > maximumQuantity) {
      this.errorInputFile(input, true, this.fileUploadMessageTypes.maximumQuantityExceeded);

      if (this.attachmentList.files.length >= maximumQuantity) {
        input.disabled = true;
        input.classList.remove("active");
      }

    } else if (input.files.length > 0) {
      this.validations = this.validateFiles(input.files);

      if (this.validations.invalidExtensions === 0 && this.validations.invalidSize === 0) {

        if (this.selectedFiles.id === idInput && this.selectedFiles.files.length > 1) {
          fileName = `${this.selectedFiles.files.length}   archivos seleccionados`;
        } else {
          fileName = this.selectedFiles.files[0].name;
        }

        this.assignName(fileName);
        this.enableDisableFileUploadButton(button, false);

      } else {
        this.selectedFiles.files = [];
        const textError = this.validationErrortext(this.validations.invalidExtensions, this.validations.invalidSize);
        this.errorInputFile(input, true, textError);
      }

    } else {
      this.errorInputFile(input, true, this.fileUploadMessageTypes.noFile);
      this.cleanInputfile(input, parent);
      this.enableDisableFileUploadButton(button, true);
    }

  }

  uploadFile = (files: any) => {

    // files es un arreglo con el o los archivos seleccionados por el usuario
    return new Promise(function (resolve, reject) {
      // Aquí agregar la lógica para procesar los archivos


      if (true) {
        // filesLoadedSuccesfully es un arreglo con o los archivos que se procesaron correctamente
        const filesLoadedSuccesfully = files;
        resolve(filesLoadedSuccesfully);
      } else {
        reject('Ocurrió un error al cargar los archivos.');
      }
    });
  }

  deleteFile = (files: any) => {
    // file contiene el archivo seleccionado por el usuario para eliminar
    return new Promise(function (resolve, reject) {
      // Aquí agregar la lógica para procesar el archivo
      if (true) {
        const filesLoadedSuccesfully = files;
        resolve(filesLoadedSuccesfully);
      } else {
        reject('Ocurrió un error al procesar el archivo.');
      }
    });
  }



}
