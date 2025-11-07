import { useLoadingContext } from '../context/LoadingContext';
import { useLoadingAnimation } from '../hooks/useLoadingAnimation';
import './Loading.css';

export const chunkQuantity: number = 6;

export const Loading = () => {
    const [loadingState] = useLoadingContext();

    useLoadingAnimation();

    return (
        !loadingState.hasInitialFinished && (
            <div className='loading-container'>
                {Array.from({ length: chunkQuantity }).map((_, idx) => (
                    <div className='loading-chunk' key={idx}>
                        <div className='loading-element'></div>
                    </div>
                ))}
            </div>
        )
    );
};
