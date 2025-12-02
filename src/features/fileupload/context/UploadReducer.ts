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
    | { type: 'UPDATE_FILE_PROGRESS'; file: UploadFile; progress: number };

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
            };
        case 'UPLOAD_FILES':
            return {
                ...state,
                awaitingUpload: [...state.awaitingUpload, ...action.files],
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
                files: state.files.map((file) =>
                    file.file.name === action.file.file.name &&
                    file.file.size === action.file.file.size
                        ? { ...file, isUploading: true }
                        : file
                ),
            };
        case 'AWAITING_REMOVE_FILES':
            return {
                ...state,
                awaitingUpload: state.awaitingUpload.filter(
                    (file) =>
                        !state.awaitingUpload.find(
                            (f) =>
                                f.file.name === file.file.name &&
                                f.file.size === file.file.size
                        )
                ),
                files: state.files.map((file) =>
                    action.files.find(
                        (f) =>
                            f.file.name === file.file.name &&
                            f.file.size === file.file.size
                    )
                        ? { ...file, isUploading: true }
                        : file
                ),
            };
        case 'FINISH_FILE':
            return {
                ...state,
                files: state.files.map((file) =>
                    file.file.name === action.file.file.name &&
                    file.file.size === action.file.file.size
                        ? { ...file, isUploading: false, hasUploaded: true }
                        : file
                ),
            };
        case 'FINISH_FILES':
            return {
                ...state,
                files: state.files.map((file) =>
                    action.files.find(
                        (f) =>
                            f.file.name === file.file.name &&
                            f.file.size === file.file.size
                    )
                        ? { ...file, isUploading: false, hasUploaded: true }
                        : file
                ),
            };

        // progress
        case 'UPDATE_FILE_PROGRESS':
            return {
                ...state,
                files: state.files.map((file) =>
                    file.file.name === action.file.file.name &&
                    file.file.size === action.file.file.size
                        ? { ...file, progress: action.progress }
                        : file
                ),
            };
    }
};
