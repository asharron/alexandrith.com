import * as React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import type { HeadFC, PageProps } from "gatsby";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import "./app.scss";

type ExtrudedTextProps = {
    text: string;
    font: Font;
    position?: [number, number, number];
    center?: boolean;
};

const ExtrudedText: React.FC<ExtrudedTextProps> = ({ text, font, position, center = false }) => {
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

    return (
        <mesh geometry={geometry} position={position}>
            <meshStandardMaterial color={0xff00ff} />
        </mesh>
    );
};

const TextScene: React.FC<{ characters: string[] }> = ({ characters }) => {
    const font = useLoader(FontLoader, "/fira.json");

    return (
        <>
            <ExtrudedText text="Test" font={font} center />
            {characters.map((text, index) => (
                <ExtrudedText
                    key={index}
                    text={text}
                    font={font}
                    position={[index % 18, -Math.floor(index / 18) * 1.5, 0]}
                />
            ))}
            <directionalLight color={0xffffff} position={[0, 0, 10]} />
        </>
    );
};

const IndexPage: React.FC<PageProps> = () => {
    const [characters, setCharacters] = useState<string[]>([]);

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

            setCharacters((current) => [...current, event.key]);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <main className="main">
            <Canvas camera={{ position: [9, -8, 20], fov: 80 }}>
                <Suspense fallback={null}>
                    <TextScene characters={characters} />
                </Suspense>
            </Canvas>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
