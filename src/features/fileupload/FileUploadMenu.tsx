import { FileInput } from '../fileinput/FileInput';
import { Button } from '../ui/Button/components/Button';
import { useUploadContext } from './context/UploadContext';
import './FileUploadMenu.css';

import clearImg from './assets/clear.svg';
import selectImg from './assets/select.svg';
import uploadImg from './assets/upload.svg';

export const FileUploadMenu = () => {
    const [state, dispatch] = useUploadContext();

    const errorFound = state.files.some((file) => file.error !== undefined);

    return (
        <ul className='file-upload-menu'>
            <li>
                <FileInput
                    onSelect={(files) => {
                        dispatch({ type: 'ADD_FILES', files: files });
                    }}
                >
                    <img src={selectImg} className='img' alt='select' />
                </FileInput>
            </li>
            <li>
                <Button
                    isEnabled={state.files.length > 0}
                    onClick={() => {
                        dispatch({ type: 'CLEAR_FILES' });
                    }}
                >
                    <img src={clearImg} className='img' alt='clear' />
                    Clear
                </Button>
            </li>
            <li>
                <Button
                    isEnabled={
                        state.files.length > 0 &&
                        state.files.some(
                            (file) =>
                                ((file.hasUploaded ?? false) === false &&
                                    (file.isUploading ?? false) === false) ||
                                errorFound
                        )
                    }
                    onClick={() => {
                        dispatch({
                            type: `${
                                errorFound ? 'RELOAD_ERRORS' : 'UPLOAD_CURRENT'
                            }`,
                        });
                    }}
                >
                    <img src={uploadImg} className='img' alt='upload' />
                    {errorFound ? 'Reload all' : 'Upload All'}
                </Button>
            </li>
        </ul>
    );
};
