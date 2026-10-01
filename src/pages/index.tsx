import * as React from "react";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import type {HeadFC, PageProps} from "gatsby";
import {Suspense, useEffect, useMemo, useRef} from "react";
import {Box3, Group, ShaderMaterial, Vector2, Vector3} from "three";
import "./portfolio.scss";
// @ts-ignore
import lispPocketMonsterGif from '../images/lisp-pocket-monsters.gif';
// @ts-ignore
import gogameEditorMp4 from '../images/gogame_editor.mp4';
// @ts-ignore
import gogameDemoMp4 from '../images/gogame_demo.mp4';
// @ts-ignore
import mechDemoMp4 from '../images/mech_demo_reduced.mp4';
// @ts-ignore
import playerIdleSheet from '../assets/player_idle_4h_1v.png';
// @ts-ignore
import playerWalkingSheet from '../assets/player_walking_4h_1v.png';
// @ts-ignore
import pixelFireSheet from '../assets/pixelfire_4h_1v.png';
// @ts-ignore
import blenderSpinSheet from '../assets/blender-spin_4h_1v.png';
// @ts-ignore
import grassIdleSheet from '../assets/grass_idle_2h_1v.png';
// @ts-ignore
import flowerSprite from '../assets/flower.png';
// @ts-ignore
import wateringCanSprite from '../assets/watering_can.png';
// @ts-ignore
import tomatoSeedSprite from '../assets/seed_packet_tomato.png';
// @ts-ignore
import watermelonSeedSprite from '../assets/seed_packet_watermelon.png';
// @ts-ignore
import zombieSprite from '../assets/zombie.png';
// @ts-ignore
import headshot from '../images/headshot.jpg';

type PortfolioProject = {
    name: string;
    slug: string;
    description: string;
    images: string[];
    videos: string[];
    stack: string[];
};

const projects: PortfolioProject[] = [
    {
        name: "Lisp Pocket Monsters",
        slug: "lisp-pocket-monsters",
        description: "A prototype game of pocket monsters written in Common Lisp utilizing Raylib",
        stack: ["Common Lisp", "Raylib", "LDtk"],
        images: [lispPocketMonsterGif],
        videos: [],
    },
    {
        name: "Gogame",
        slug: "gogame",
        description: "A prototype of a game editor and game based on farming and combat written in Go",
        stack: ["Golang", "Ebiten", "EbitenUI"],
        images: [],
        videos: [gogameEditorMp4, gogameDemoMp4],
    },
    {
        name: "Mech Game",
        slug: "mech-game",
        description: "A first person mech game built in Godot Mono with C#",
        stack: ["Godot", "Blender", "C#"],
        images: [],
        videos: [mechDemoMp4],
    },
];

const technologies = [
    {
        name: "Java",
        yearsOfExperience: 8,
        type: "language"
    },
    {
        name: "JavaScript",
        yearsOfExperience: 8,
        type: "language"
    },
    {
        name: "React",
        yearsOfExperience: 8,
        type: "framework"
    },
    {
        name: "Python",
        yearsOfExperience: 2,
        type: "language"
    },
    {
        name: "Golang",
        yearsOfExperience: 1,
        type: "language"
    },
    {
        name: "C#",
        yearsOfExperience: 2,
        type: "language"
    },
    {
        name: "Spring Boot",
        yearsOfExperience: 5,
        type: "framework"
    },
    {
        name: "NestJS",
        yearsOfExperience: 3,
        type: "framework"
    },
]

const favoriteTools = [
    {
        name: "Git"
    },
    {
        name: "NeoVim"
    },
    {
        name: "Webstorm"
    },
    {
        name: "Junie"
    },
];

const pastCompanies = [
    {
        name: "Pearson Education",
        startYear: 2023,
        endYear: 2026,
    },
    {
        name: "Red Hat",
        startYear: 2021,
        endYear: 2023,
    },
    {
        name: "BlueAcorn ICI",
        startYear: 2019,
        endYear: 2021,
    },
    {
        name: "Capgemini",
        startYear: 2018,
        endYear: 2019,
    }
];

const pastClients = [
    {
        name: "Charter"
    },
    {
        name: "Cox Communications"
    },
    {
        name: "First Citizens Bank",
    },
    {
        name: "Tractor Supply"
    }
]

const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
        vec2 point = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
        float time = uTime * 0.16;

        float firstWave = point.y - (sin(point.x * 2.7 + time) * 0.09 + sin(point.x * 5.2 - time) * 0.025);
        float secondWave = point.y - (-0.28 + sin(point.x * 1.6 - time * 0.7) * 0.13);
        float firstGlow = exp(-abs(firstWave) * 20.0);
        float secondGlow = exp(-abs(secondWave) * 15.0);
        float firstLine = 1.0 - smoothstep(0.002, 0.006, abs(firstWave));
        float secondLine = 1.0 - smoothstep(0.003, 0.009, abs(secondWave));

        vec2 gridPoint = abs(fract(point * vec2(8.0, 13.0)) - 0.5);
        float grid = 1.0 - smoothstep(0.475, 0.5, min(gridPoint.x, gridPoint.y));
        float vignette = 1.0 - smoothstep(0.22, 1.0, length(point * vec2(0.8, 1.0)));

        vec3 color = vec3(0.114, 0.169, 0.325);
        color += vec3(0.0, 0.529, 0.318) * grid * 0.16;
        color += vec3(1.0, 0.0, 0.302) * (firstGlow * 0.18 + firstLine * 0.48);
        color += vec3(1.0, 0.925, 0.153) * (secondGlow * 0.13 + secondLine * 0.22);
        color *= 0.58 + vignette * 0.42;

        gl_FragColor = vec4(color, 1.0);
    }
`;

const ShaderBackground: React.FC = () => {
    const material = useRef<ShaderMaterial>(null);
    const viewport = useThree((state) => state.viewport);
    const size = useThree((state) => state.size);
    const uniforms = useMemo(() => ({
        uTime: {value: 0},
        uResolution: {value: new Vector2(size.width, size.height)},
    }), []);

    useEffect(() => {
        uniforms.uResolution.value.set(size.width, size.height);
    }, [size.height, size.width, uniforms]);

    useFrame(({clock}) => {
        if (material.current) {
            material.current.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        <mesh scale={[viewport.width / 2, viewport.height / 2, 1]}>
            <planeGeometry args={[2, 2]}/>
            <shaderMaterial
                ref={material}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

type PixelSpriteProps = {
    src: string;
    frames: number;
    label: string;
    className?: string;
    frameSize?: number;
};

const PixelSprite: React.FC<PixelSpriteProps> = ({src, frames, label, className = "", frameSize = 128}) => (
    <span
        className={`pixel-sprite ${className}`}
        role="img"
        aria-label={label}
        style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${frames * frameSize}px ${frameSize}px`,
            "--sprite-frames": frames,
            "--sprite-animation-end": `${frames * -frameSize}px`,
        } as React.CSSProperties}
    />
);

const FloatingModel: React.FC<{src: string; position?: [number, number, number]; targetSize?: number}> = ({
    src,
    position = [0, 0, 0],
    targetSize = 1.4,
}) => {
    const gltf = useLoader(GLTFLoader, src);
    const modelRef = useRef<Group>(null);
    const model = useMemo(() => {
        const clone = gltf.scene.clone(true);
        const bounds = new Box3().setFromObject(clone);
        const size = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        clone.position.sub(center);
        clone.scale.setScalar(targetSize / Math.max(size.x, size.y, size.z, 0.001));
        return clone;
    }, [gltf, targetSize]);

    useFrame(({clock}, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.35;
            modelRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.06;
        }
    });

    return (
        <group ref={modelRef} position={position}>
            <primitive object={model}/>
        </group>
    );
};

const IndexPage: React.FC<PageProps> = () => {
    return (
        <main className="portfolio-shell">
            <div className="shader-canvas" aria-hidden="true">
                <Canvas orthographic camera={{position: [0, 0, 1], zoom: 1}} dpr={[1, 1.5]}>
                    <ShaderBackground/>
                </Canvas>
            </div>

            <div className="site-frame" id="top">
                <header className="site-header">
                    <a className="brand" href="#top" aria-label="Alexandrith home">
                        <img src={flowerSprite} alt=""/>
                        <span>alexandrith<span className="brand-dot">.com</span></span>
                    </a>
                    <nav className="main-nav" aria-label="Main navigation">
                        <a href="#projects">Projects</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                    <a className="header-link" href="https://github.com/asharron" target="_blank"
                       rel="noopener noreferrer">GITHUB <span aria-hidden="true">↗</span></a>
                </header>

                <section className="hero" aria-labelledby="portfolio-title">
                    <div className="hero-copy">
                        <p className="hero-kicker"><span/> WEB / SOFTWARE / GAMES / PIXEL ART</p>
                        <h1 id="portfolio-title">Building<br/>Software With <em>Passion</em><span
                            className="title-star">✳</span></h1>
                        <p className="hero-intro">Hey, I’m Alexandrith — a full stack software developer with experience in Java and React. I love web technology, but I also love to make games in my free time!</p>
                        <img src={headshot} alt="profile headshot" className={'headshot'}/>
                        <div className="hero-actions">
                            <a className="button button-primary" href="#projects">Explore projects <span
                                aria-hidden="true">↓</span></a>
                            <a className="button button-secondary" href="/resume.pdf" target="_blank"
                               rel="noopener noreferrer">My résumé <span aria-hidden="true">↗</span></a>
                        </div>
                        <div className="hero-footnote">
                            <span>IN MY INVENTORY</span>
                            <img src={wateringCanSprite} alt=""/>
                            <img src={tomatoSeedSprite} alt=""/>
                            <img src={watermelonSeedSprite} alt=""/>
                            <span>ideas, games &amp; tools</span>
                        </div>
                    </div>

                    <div className="hero-art" role="img" aria-label="Pixel art and a 3D game character">
                        <div className="art-topline"><span>FIG. 01</span><span>✳ 2026—∞</span></div>
                        <div className="hero-stage">
                            <div className="stage-sparkle stage-sparkle-one" aria-hidden="true">✦</div>
                            <div className="stage-sparkle stage-sparkle-two" aria-hidden="true">✳</div>
                            <div className="hero-player-walker">
                                <PixelSprite src={playerWalkingSheet} frames={4} label="Walking player character"
                                             className="hero-player"/>
                            </div>

                            <img className="hero-zombie-sprite" src={zombieSprite} alt=""/>
                            <img className="hero-zombie-sprite hero-zombie-sprite--2" src={zombieSprite} alt=""/>

                            <div className="stage-ground" aria-hidden="true"/>
                            <PixelSprite src={grassIdleSheet} frames={2} label="Swaying pixel grass"
                                         className="hero-grass"/>
                            <PixelSprite src={grassIdleSheet} frames={2} label="Swaying pixel grass"
                                         className="hero-grass hero-grass--2"/>
                            <PixelSprite src={grassIdleSheet} frames={2} label="Swaying pixel grass"
                                         className="hero-grass hero-grass--3"/>
                            <PixelSprite src={grassIdleSheet} frames={2} label="Swaying pixel grass"
                                         className="hero-grass hero-grass--4"/>
                            <PixelSprite src={grassIdleSheet} frames={2} label="Swaying pixel grass"
                                         className="hero-grass hero-grass--5"/>
                            <PixelSprite src={flowerSprite} frames={1} label="Flower Sprite"
                                         className="hero-flower"/>
                            <PixelSprite src={flowerSprite} frames={1} label="Flower Sprite"
                                         className="hero-flower2"/>
                        </div>
                        <div className="art-caption"><span>pixel by pixel, polygon by polygon</span><PixelSprite
                            src={blenderSpinSheet} frames={4} label="Spinning Blender icon" className="blender-sprite"/></div>
                    </div>
                </section>

                <div className="marquee" aria-hidden="true">
                    <div>GAMES <span>✳</span> SYSTEMS <span>✳</span> PIXEL ART <span>✳</span> EXPERIMENTS <span>✳</span> GAMES <span>✳</span> SYSTEMS <span>✳</span> PIXEL ART <span>✳</span> EXPERIMENTS <span>✳</span></div>
                </div>

                <section className="projects-section" id="projects" aria-labelledby="projects-title">
                    <div className="section-heading">
                        <div><p className="section-kicker">THE PROJECT ARCADE <span>✳</span></p>
                            <h2 id="projects-title">A few things I’ve <em>made.</em></h2></div>
                        <p className="section-note">Personal projects, prototypes, and worlds built one experiment at a time.</p>
                    </div>
                    <div className="project-grid">
                        {projects.map((project, index) => (
                            <article className={`project-card project-card-${project.slug}`} key={project.slug}>
                                <div className="project-card-top"><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>✳</span></div>
                                <div className="project-media">
                                    {project.images.map((image, imageIndex) => (
                                        <img key={imageIndex} src={image} alt={`${project.name} gameplay preview`}
                                             loading="lazy"/>
                                    ))}
                                    {project.videos.map((video, videoIndex) => (
                                        <video key={videoIndex} src={video} controls muted loop playsInline
                                               preload="metadata" aria-label={`${project.name} demo ${videoIndex + 1}`}/>
                                    ))}
                                    {project.slug === "gogame" && <div className="farm-sprites" aria-hidden="true">
                                        <img src={wateringCanSprite} alt=""/>
                                        <img src={tomatoSeedSprite} alt=""/>
                                        <img src={watermelonSeedSprite} alt=""/>
                                    </div>}
                                    {project.slug === "mech-game" && <PixelSprite src={blenderSpinSheet} frames={4}
                                        label="Spinning Blender icon" className="project-blender-sprite"/>}
                                </div>
                                <div className="project-info">
                                    <p className="project-slug">/{project.slug}</p>
                                    <h3>{project.name}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <ul className="tag-list" aria-label={`${project.name} technology stack`}>
                                        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="about-section" id="about" aria-labelledby="about-title">
                    <div className="about-copy">
                        <p className="section-kicker">A LITTLE ABOUT ME <span>✳</span></p>
                        <h2 id="about-title">Curiosity is my<br/><em>favorite tool.</em></h2>
                        <p>I’m drawn to the whole process of making things: shaping an idea, building the systems behind it, and adding the details that make a world feel alive. Lately that means games, graphics, and small experiments that grow into something playable.</p>
                        <a className="text-link" href="https://linkedin.com/in/alexandrith" target="_blank"
                           rel="noopener noreferrer">More about me on LinkedIn <span aria-hidden="true">↗</span></a>
                    </div>
                    <div className="about-art" aria-label="A collection of game development pixel art">
                        <div className="about-art-label">CURRENT LOADOUT <span>04 ITEMS</span></div>
                        <div className="loadout-grid">
                            <div><img src={wateringCanSprite} alt=""/><span>GROW</span></div>
                            <div><img src={tomatoSeedSprite} alt=""/><span>PLANT</span></div>
                            <div><img src={watermelonSeedSprite} alt=""/><span>PLAY</span></div>
                            <div><PixelSprite src={grassIdleSheet} frames={2} label="Animated grass"
                                              frameSize={48}/><span>REPEAT</span></div>
                        </div>
                        <div className="about-art-bottom"><PixelSprite src={pixelFireSheet} frames={4}
                            label="Animated pixel fire" frameSize={54}/><span>MADE WITH<br/>A LITTLE MAGIC</span><img
                            src={flowerSprite} alt=""/></div>
                    </div>
                </section>

                <section className="contact-section" id="contact" aria-labelledby="contact-title">
                    <div className="contact-pixel" aria-hidden="true"><PixelSprite src={playerIdleSheet} frames={4}
                        label="Animated player character"/></div>
                    <div><p className="section-kicker">YOUR TURN <span>✳</span></p>
                        <h2 id="contact-title">Got a fun idea?</h2>
                        <p>Come say hi, peek at the code, or take a look at my résumé.</p></div>
                    <div className="contact-links">
                        <a href="https://github.com/asharron" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                        <a href="https://linkedin.com/in/alexandrith" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
                    </div>
                </section>

                <footer className="site-footer"><a className="footer-brand" href="#top">alexandrith<span>.com</span></a>
                    <span>BUILT WITH PIXELS, POLYGONS &amp; CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></footer>
            </div>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Alexandrith — Game &amp; Software Developer</title>;
