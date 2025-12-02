import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import type { UploadFile } from '../context/UploadContext';

type UploadFunctions = {
    onStart?: (file: UploadFile) => void;
    onProgress?: (file: UploadFile, progress: number) => void;
    onFinish?: (file: UploadFile) => void;
    onError?: (file: UploadFile, error: string) => void;
};

export const useUpload = ({
    onFinish,
    onStart,
    onProgress,
    onError,
}: UploadFunctions) => {
    // state
    const [files, setFiles] = useState<UploadFile[]>([]);

    // api
    useEffect(() => {
        if (files.length > 0) {
            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file.file);
                onStart?.(file);

                try {
                    const response = await axios.post(
                        'https://httpbin.org/post',
                        formData,
                        {
                            onUploadProgress: (progressEvent) => {
                                const progress = Math.round(
                                    (progressEvent.loaded * 100) /
                                        (progressEvent.total || 1)
                                );
                                onProgress?.(file, progress);
                            },
                        }
                    );

                    onFinish?.(file);
                    return { file, response };
                } catch (e) {
                    onError?.(file, `${e}`);
                    throw e;
                }
            });

            Promise.allSettled(promises).then(() => {
                setFiles([]);
            });
        }
    }, [files]);

    // user API
    const set = useCallback((files: UploadFile[]) => {
        setFiles(files);
    }, []);

    return {
        set,
    };
};
