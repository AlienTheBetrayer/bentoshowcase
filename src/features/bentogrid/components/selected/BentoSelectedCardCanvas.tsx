import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { BentoGridBox } from '../../context/types/BentoTypes';
import { BentoSelectedCardReplica } from './BentoSelectedCardReplica';

interface Props {
    box: BentoGridBox;
}

export const BentoSelectedCardCanvas = ({ box }: Props) => {
    return (
        <Canvas style={{ width: '100%', height: '100%'}}>
            <pointLight position={[3, 3, 3]} intensity={128} />

            <Center>
                <BentoSelectedCardReplica box={box} />
            </Center>

            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};
