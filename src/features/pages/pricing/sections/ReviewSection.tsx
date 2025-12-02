import { UploadProvider } from '../../../fileupload/context/UploadContext';
import { FileUpload } from '../../../fileupload/FileUpload';
import './ReviewSection.css';

export const ReviewSection = () => {
    return (
        <UploadProvider>
            <section className='section review-section'>
                <div className='info'>
                    <h2>
                        <u>Review</u> process
                    </h2>
                    <p>
                        <mark>Select</mark> files and <b>send them</b> to us so
                        we can review and <mark>qualify</mark> them, after that
                        we'll be able to <b>assess</b> your needs.
                    </p>
                </div>

                <FileUpload />
                <hr/>
            </section>
        </UploadProvider>
    );
};
