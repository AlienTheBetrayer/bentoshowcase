import { Button } from '../ui/Button/components/Button';
import { useUploadContext, type UploadFile } from './context/UploadContext';
import './FileList.css';

export const FileList = () => {
    const [state, dispatch] = useUploadContext();

    return (
        <div className='file-list-container'>
            <h4 style={{ textAlign: 'center' }}>
                <mark>Uploaded</mark> files:
                {state.files.some((file) => file.error !== undefined) && (
                    <u> (ERROR)</u>
                )}
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
    return (
        <li
            className={`file-list-element ${
                (file.isUploading ?? false) === true
                    ? 'file-list-element-uploading'
                    : ''
            }
        ${
            (file.hasUploaded ?? false) === true
                ? 'file-list-element-has-uploaded'
                : ''
        }
        ${file.error ?? false ? 'file-list-element-error' : ''}`}
        >
            <span>{file.file.name}</span>
            <span>
                {(file.isUploading ?? false) === true &&
                    file.error === undefined &&
                    'Wait...'}
                {(file.hasUploaded ?? false) === true && 'Uploaded!'}
                {file.error ? file.error : ''}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button onClick={() => onDelete(file)}>Delete</Button>
                <Button
                    isEnabled={
                        ((file.isUploading ?? false) === false &&
                            (file.hasUploaded ?? false) === false) ||
                        file.error !== undefined
                    }
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
