import { FileInput } from '../fileinput/FileInput';
import { useUploadContext } from './context/UploadContext';
import './FileUploadMenu.css';

export const FileUploadMenu = () => {
    const [state, dispatch] = useUploadContext();

    return (
        <ul className='file-upload-menu'>
            <li>
                <FileInput
                    onSelect={(files) => {
                        dispatch({ type: 'ADD_FILES', files: files });
                    }}
                />
            </li>
        </ul>
    );
};
