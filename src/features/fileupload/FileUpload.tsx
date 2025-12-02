import { FileList } from './FileList';
import './FileUpload.css';
import { FileUploadMenu } from './FileUploadMenu';

export const FileUpload = () => {
    return (
        <div className='file-upload'>
            <FileUploadMenu />
            <FileList />
        </div>
    );
};
