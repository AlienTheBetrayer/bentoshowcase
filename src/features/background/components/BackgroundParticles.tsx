import { Instance, Instances } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"

export const particlesQuantity = 128;

export const BackgroundParticles = () => {
    const three = useThree();

    useFrame(() => {

    });
    
    return (
        <Instances>
            <meshPhysicalMaterial color='#fff'/>
            <sphereGeometry args={[0.1]}/>

            { Array.from({ length: particlesQuantity }).map((_, idx) => (
                <Instance key={idx}/>
            ))}
        </Instances>
    )
}