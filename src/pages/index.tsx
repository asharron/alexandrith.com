import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import './app.scss';
import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {KeyboardEventHandler, useEffect} from "react";

let loadFont = new Promise((resolve, reject) => {
    new FontLoader().load('/fira.json', (font) => {

        resolve(font);
    });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
camera.position.z = 20;
camera.position.x = 9;
camera.position.y = -8;
const renderer = new THREE.WebGLRenderer();
camera.aspect = window.innerWidth / window.innerHeight;
renderer.setSize(window.innerWidth, window.innerHeight);

const letterMeshes = [];

let xOffset = 0;
let yOffset = 0;

const IndexPage: React.FC<PageProps> = () => {
    useEffect(() => {
        const mainTag = document.querySelector("main");
        const childrenCount = mainTag?.children.length ?? 0;
        for (let childIdx = 0; childIdx< childrenCount; childIdx++) {
            const child = mainTag?.children[childIdx];
            if (child) {
                mainTag?.removeChild(child);
            }
        }

        document.querySelector('main')?.appendChild(renderer.domElement);
        renderer.render(scene, camera);

        loadFont.then((font) => {
            const geometry = new TextGeometry('Test', {
                font,
                size: 1,
                depth: 0.3,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3,
            });
            geometry.center();

            const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: 0xff00ff}));
            scene.add(mesh);
            const light = new THREE.DirectionalLight(0xffffff);
            light.position.z = 10;
            scene.add(light);
            renderer.render(scene, camera);
        });
    }, []);

    const onKeyDown = (event: KeyboardEvent) => {
        if(event.key == 'Backspace') {
            scene.remove(letterMeshes.pop());
            renderer.render(scene, camera);
            xOffset -= 1;
        }

        if (['Shift', 'Backspace', 'Control', 'Alt'].includes(event.key)) {
            return;
        }

        loadFont.then((font) => {
            const geometry = new TextGeometry(event.key, {
                font,
                size: 1,
                depth: 0.3,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3,
            });
            const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: 0xff00ff}));
            mesh.position.x = 0;
            mesh.position.x += xOffset;
            mesh.position.y = 0;
            mesh.position.y += yOffset;

            if (mesh.position.x / 18 >= 1) {
                xOffset = 0;
                yOffset = yOffset-1.5;
                mesh.position.x = 0;
                mesh.position.y -= 1.5;
            }
            xOffset += 1;
            scene.add(mesh);
            letterMeshes.push(mesh);
            renderer.render(scene, camera);
        })
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);


  return (
    <main className={'main'}>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
