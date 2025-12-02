import { useEffect } from 'react';
import { useUpload } from '../../hooks/useUpload';
import type { UploadData } from '../UploadContext';
import type { UploadReducerAction } from '../UploadReducer';

export const useUploadContextUpload = (
    state: UploadData,
    dispatch: React.Dispatch<UploadReducerAction>
) => {
    const uploadFiles = useUpload({
        onStart: (file) => {
            dispatch({ type: 'AWAITING_REMOVE_FILE', file: file });
        },
        onProgress: (file, progress) => {
            dispatch({
                type: 'UPDATE_FILE_PROGRESS',
                file: file,
                progress: progress,
            });
        },
        onFinish: (file) => {
            dispatch({ type: 'FINISH_FILE', file: file });
        },
        onError: (file, error) => {
            dispatch({ type: 'ERROR_FILE', file: file, error: error });
        },
    });

    useEffect(() => {
        if (state.awaitingUpload.length > 0) {
            uploadFiles.set(state.awaitingUpload);
        }
    }, [state.awaitingUpload]);
};
