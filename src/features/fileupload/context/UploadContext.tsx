import { createContext, useContext, useReducer } from 'react';
import { UploadReducer, type UploadReducerAction } from './UploadReducer';
import { useUploadContextUpload } from './hooks/useUploadContextUpload';

export type UploadFile = {
    file: File;

    progress?: number;
    isUploading?: boolean;
    hasUploaded?: boolean;
};

export type UploadData = {
    files: UploadFile[];
    awaitingUpload: UploadFile[];
};

type UploadContextType = [UploadData, React.Dispatch<UploadReducerAction>];

export const UploadContext = createContext<UploadContextType | null>(null);

type Props = {
    children?: React.ReactNode;
};

export const UploadProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(UploadReducer, {
        files: [],
        awaitingUpload: [],
    });

    useUploadContextUpload(state, dispatch);

    return (
        <UploadContext.Provider value={[state, dispatch]}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUploadContext = () => {
    const ctx = useContext(UploadContext);
    if (!ctx) throw new Error('useUploadContext() is used incorrectly.');
    return ctx;
};
