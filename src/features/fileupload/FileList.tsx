import { useMemo } from 'react';
import { Button } from '../ui/Button/components/Button';
import { useUploadContext, type UploadFile } from './context/UploadContext';
import './FileList.css';

export const FileList = () => {
    const [state, dispatch] = useUploadContext();

    const errorFound = useMemo(() => {
        return state.files.some((file) => file.error !== undefined);
    }, [state.files]);

    return (
        <div className='file-list-container'>
            <h4 style={{ textAlign: 'center' }}>
                <mark>Uploaded</mark> files:
                {errorFound && <u> (ERROR)</u>}
            </h4>

            <ul className='file-list'>
                {state.files.map((file, idx) => (
                    <FileListElement
                        key={idx}
                        file={file}
                        onDelete={(file) =>
                            dispatch({ type: 'DELETE_FILE', file: file })
                        }
                        onUpload={(file) =>
                            dispatch({ type: 'UPLOAD_FILE', file: file })
                        }
                    />
                ))}
            </ul>
        </div>
    );
};

type ElementProps = {
    file: UploadFile;
    onDelete: (file: UploadFile) => void;
    onUpload: (file: UploadFile) => void;
};

export const FileListElement = ({ file, onDelete, onUpload }: ElementProps) => {
    // states
    const isUploading = (file.isUploading ?? false) === true;
    const hasUploaded = (file.hasUploaded ?? false) === true;

    const isWaiting =
        (file.isUploading ?? false) === true && file.error === undefined;

    const isUploadEnabled =
        ((file.isUploading ?? false) === false &&
            (file.hasUploaded ?? false) === false) ||
        file.error !== undefined;

    return (
        <li
            className={`file-list-element ${
                isUploading ? 'file-list-element-uploading' : ''
            }
        ${hasUploaded ? 'file-list-element-has-uploaded' : ''}
        ${file.error ?? false ? 'file-list-element-error' : ''}`}
        >
            <span>{file.file.name}</span>
            <span>
                {isWaiting && 'Wait...'}
                {hasUploaded && 'Uploaded!'}
                {file.error ? file.error : ''}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button onClick={() => onDelete(file)}>Delete</Button>
                <Button
                    isEnabled={isUploadEnabled}
                    onClick={() => onUpload(file)}
                >
                    {file.error === undefined ? 'Upload' : 'Reload'}
                </Button>
            </div>

            <div
                className='file-list-element-progress'
                style={{ transform: `scaleX(${(file.progress ?? 0) / 100})` }}
            />
        </li>
    );
};
