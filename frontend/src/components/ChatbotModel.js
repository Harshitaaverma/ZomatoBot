import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const ChatbotModel = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
};

export default ChatbotModel;