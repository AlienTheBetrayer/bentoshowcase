import { Button } from '../ui/Button/components/Button';
import { useUploadContext, type UploadFile } from './context/UploadContext';
import './FileList.css';
import { bytesToString } from './utils/bytesToString';

export const FileList = () => {
    const [state, dispatch] = useUploadContext();

    return (
        <>
            <h4>Files:</h4>
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
        </>
    );
};

type ElementProps = {
    file: UploadFile;
    onDelete: (file: UploadFile) => void;
    onUpload: (file: UploadFile) => void;
};

export const FileListElement = ({ file, onDelete, onUpload }: ElementProps) => {
    return (
        <li className='file-list-element'>
            <span>{file.file.name}</span>
            <span>
                progress: {bytesToString(file.progress ?? 0)} is:{' '}
                {(file.isUploading ?? false).toString()} has:{' '}
                {(file.hasUploaded ?? false).toString()}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button onClick={() => onDelete(file)}>Delete</Button>
                <Button
                    isEnabled={
                        (file.isUploading ?? false) === false &&
                        (file.hasUploaded ?? false) === false
                    }
                    onClick={() => onUpload(file)}
                >
                    Upload
                </Button>
            </div>

            <div
                className='file-list-element-progress'
                style={{ transform: `scaleX(${(file.progress ?? 0) / 100})` }}
            />
        </li>
    );
};
