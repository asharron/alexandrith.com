import * as React from "react";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import type { HeadFC, PageProps } from "gatsby";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import type { Mesh } from "three";
import "./app.scss";

type ExtrudedTextProps = {
    text: string;
    font: Font;
    position?: [number, number, number];
    rotationPhase?: number;
    center?: boolean;
};

const CameraRig: React.FC<{x: number; y: number}> = ({x, y}) => {
    const camera = useThree((s) => s.camera);
    useEffect(() => {
        camera.position.set(x, y, 20);
        camera.lookAt(x, y, 0);
    }, [camera, x, y]);

    return null;
}

const ExtrudedText: React.FC<ExtrudedTextProps> = ({ text, font, position, rotationPhase, center = false }) => {
    const mesh = useRef<Mesh>(null);
    const geometry = useMemo(() => {
        const textGeometry = new TextGeometry(text, {
            font,
            size: 1,
            depth: 0.3,
            curveSegments: 2,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 3,
        });

        if (center) {
            textGeometry.center();
        }

        return textGeometry;
    }, [center, font, text]);

    useFrame(({ clock }) => {
        if (mesh.current && rotationPhase !== undefined) {
            mesh.current.rotation.z = Math.sin(clock.elapsedTime * 2 + rotationPhase) * (Math.PI / 6);
        }
    });

    return (
        <mesh ref={mesh} geometry={geometry} position={position}>
            <meshStandardMaterial color={0xff00ff} />
        </mesh>
    );
};

const TextScene: React.FC<{ characters: Array<{ text: string; rotationPhase: number }> }> = ({ characters }) => {
    const font = useLoader(FontLoader, "/fira.json");

    return (
        <>
            {characters.map(({ text, rotationPhase }, index) => (
                <ExtrudedText
                    key={index}
                    text={text}
                    font={font}
                    position={[index % 18, -Math.floor(index / 18) * 1.5, 0]}
                    rotationPhase={rotationPhase}
                />
            ))}
            <directionalLight color={0xffffff} position={[0, 0, 10]} />
        </>
    );
};

const IndexPage: React.FC<PageProps> = () => {
    const [characters, setCharacters] = useState<Array<{ text: string; rotationPhase: number }>>([]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Backspace") {
                event.preventDefault();
                setCharacters((current) => current.slice(0, -1));
                return;
            }

            if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) {
                return;
            }

            const rotationPhase = Math.random() * Math.PI * 2;
            setCharacters((current) => [...current, { text: event.key, rotationPhase }]);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <main className="main">
            <Canvas camera={{ position: [0, 0, 20], fov: 80 }}>
                <Suspense fallback={null}>
                    <CameraRig x={10} y={-10} />
                    <TextScene characters={characters} />
                </Suspense>
            </Canvas>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
