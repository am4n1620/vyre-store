import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";

function FloatingShape() {
    return (
        <Float
            speed={2}
            rotationIntensity={1.5}
            floatIntensity={2}
        >
            <mesh rotation={[0.4, 0.5, 0.2]}>
                <torusKnotGeometry
                    args={[1, 0.3, 128, 32]}
                />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}

function Hero3D() {
    return (
        <section className="hero" id="home">

            <div className="hero-text">
                <p className="small-title">
                    WEAR YOUR STYLE.
                </p>

                <h1>
                    WEAR
                    <br />
                    YOUR
                    <br />
                    <span>STYLE.</span>
                </h1>

                <p>
                    Perfumes • Caps • Hats • Sunglasses •
                    Printed Socks
                </p>

                <button>
                    SHOP NOW
                </button>
            </div>

            <div className="hero-3d">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1} />

                    <directionalLight
                        position={[3, 3, 3]}
                        intensity={3}
                    />

                    <Environment preset="city" />

                    <FloatingShape />

                    <OrbitControls
                        enableZoom={false}
                    />
                </Canvas>
            </div>

        </section>
    );
}

export default Hero3D;