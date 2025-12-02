import type { UploadData, UploadFile } from './UploadContext';

export type UploadReducerAction =
    // files
    | {
          type: 'SET_FILES';
          files: FileList | null;
      }
    | { type: 'ADD_FILES'; files: FileList | null }
    | { type: 'CLEAR_FILES' }
    | { type: 'DELETE_FILE'; file: UploadFile }
    // uploads
    | { type: 'UPLOAD_FILE'; file: UploadFile }
    | { type: 'UPLOAD_FILES'; files: UploadFile[] }
    | { type: 'UPLOAD_CURRENT' }
    | {
          type: 'AWAITING_REMOVE_FILE';
          file: UploadFile;
      }
    | { type: 'AWAITING_REMOVE_FILES'; files: UploadFile[] }
    | { type: 'FINISH_FILE'; file: UploadFile }
    | { type: 'FINISH_FILES'; files: UploadFile[] }

    // progress
    | { type: 'UPDATE_FILE_PROGRESS'; file: UploadFile; progress: number }

    // error handling
    | { type: 'ERROR_FILE'; file: UploadFile; error: string }
    | { type: 'RELOAD_ERRORS' };

export const UploadReducer = (
    state: UploadData,
    action: UploadReducerAction
): UploadData => {
    switch (action.type) {
        // files
        case 'SET_FILES':
            return {
                ...state,
                files:
                    action.files === null
                        ? []
                        : Array.from(action.files, (f) => ({
                              file: f,
                          })),
            };
        case 'ADD_FILES':
            return {
                ...state,
                files:
                    action.files === null
                        ? state.files
                        : [
                              ...state.files,
                              ...Array.from(action.files, (f) => ({
                                  file: f,
                              })).filter(
                                  (f) =>
                                      !state.files.find(
                                          (stateFile) =>
                                              stateFile.file.name ===
                                                  f.file.name &&
                                              stateFile.file.size ===
                                                  f.file.size
                                      )
                              ),
                          ],
            };
        case 'CLEAR_FILES':
            return { ...state, files: [] };
        case 'DELETE_FILE':
            return {
                ...state,
                files: state.files.filter((file) => file !== action.file),
            };

        // uploads
        case 'UPLOAD_FILE':
            return {
                ...state,
                awaitingUpload: [...state.awaitingUpload, action.file],
                files: state.files.map((element) =>
                    element.file.name === action.file.file.name &&
                    element.file.size === action.file.file.size
                        ? {
                              ...element,
                              error: undefined,
                              progress: 0,
                              isUploading: true,
                              hasUploaded: false,
                          }
                        : element
                ),
            };
        case 'UPLOAD_FILES':
            return {
                ...state,
                awaitingUpload: [...state.awaitingUpload, ...action.files],
                files: state.files.map((element) =>
                    action.files.find(
                        (f) =>
                            f.file.name === element.file.name &&
                            f.file.size === element.file.size
                    )
                        ? {
                              ...element,
                              error: undefined,
                              progress: 0,
                              isUploading: true,
                              hasUploaded: false,
                          }
                        : element
                ),
            };
        case 'UPLOAD_CURRENT':
            return {
                ...state,
                awaitingUpload: [
                    ...state.awaitingUpload,
                    ...state.files.filter(
                        (file) =>
                            (file.isUploading ?? false) === false &&
                            (file.hasUploaded ?? false) === false
                    ),
                ],
            };
        case 'AWAITING_REMOVE_FILE':
            return {
                ...state,
                awaitingUpload: state.awaitingUpload.filter(
                    (file) => file !== action.file
                ),
                files: state.files.map((element) =>
                    element.file.name === action.file.file.name &&
                    element.file.size === action.file.file.size
                        ? { ...element, isUploading: true }
                        : element
                ),
            };
        case 'AWAITING_REMOVE_FILES':
            return {
                ...state,
                awaitingUpload: state.awaitingUpload.filter(
                    (element) =>
                        !state.awaitingUpload.find(
                            (f) =>
                                f.file.name === element.file.name &&
                                f.file.size === element.file.size
                        )
                ),
                files: state.files.map((element) =>
                    action.files.find(
                        (f) =>
                            f.file.name === element.file.name &&
                            f.file.size === element.file.size
                    )
                        ? { ...element, isUploading: true }
                        : element
                ),
            };
        case 'FINISH_FILE':
            return {
                ...state,
                files: state.files.map((element) =>
                    element.file.name === action.file.file.name &&
                    element.file.size === action.file.file.size
                        ? { ...element, isUploading: false, hasUploaded: true }
                        : element
                ),
            };
        case 'FINISH_FILES':
            return {
                ...state,
                files: state.files.map((element) =>
                    action.files.find(
                        (f) =>
                            f.file.name === element.file.name &&
                            f.file.size === element.file.size
                    )
                        ? { ...element, isUploading: false, hasUploaded: true }
                        : element
                ),
            };

        // progress
        case 'UPDATE_FILE_PROGRESS':
            return {
                ...state,
                files: state.files.map((element) =>
                    element.file.name === action.file.file.name &&
                    element.file.size === action.file.file.size
                        ? { ...element, progress: action.progress }
                        : element
                ),
            };

        // error
        case 'ERROR_FILE':
            return {
                ...state,
                files: state.files.map((element) =>
                    element.file.name === action.file.file.name &&
                    element.file.size === action.file.file.size
                        ? { ...element, error: action.error }
                        : element
                ),
            };
        case 'RELOAD_ERRORS':
            return {
                ...state,
                files: state.files.map((element) =>
                    element.error
                        ? {
                              ...element,
                              error: undefined,
                              isUploading: true,
                              hasUploaded: false,
                              progress: 0,
                          }
                        : element
                ),
                awaitingUpload: [
                    ...state.awaitingUpload,
                    ...state.files.filter((file) => file.error !== undefined),
                ],
            };
    }
};
