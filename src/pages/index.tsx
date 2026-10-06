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
    subDescription: string;
    images: string[];
    videos: string[];
    stack: string[];
};

const projects: PortfolioProject[] = [
    {
        name: "Lisp Pocket Monsters",
        slug: "lisp-pocket-monsters",
        description: "A prototype game of pocket monsters written in Common Lisp utilizing Raylib. ",
        subDescription: "I built this as an experiment to learn Common Lisp since the language is very different from anything I had worked with previously. " +
            "While the language was hard to grasp at first, it definitely taught me how to think of code differently!",
        stack: ["Common Lisp", "Raylib", "LDtk"],
        images: [lispPocketMonsterGif],
        videos: [],
    },
    {
        name: "Gogame",
        slug: "gogame",
        description: "A prototype of a game editor and game based on farming and combat written in Go.",
        subDescription: "I made this to learn more about Go and to try and build a large codebase without a framework. " +
            "In the end, I had 120 Go files and tons of abstractions I had created to handle things from world loading, saving, editing, pathfinding, and inventory. " +
            "One of my favorite projects that really pushed me to organize code in a meaningful way.",
        stack: ["Golang", "Ebiten", "EbitenUI"],
        images: [],
        videos: [gogameEditorMp4, gogameDemoMp4],
    },
    {
        name: "Mech Game",
        slug: "mech-game",
        description: "A first person mech game built in Godot Mono with C#.",
        subDescription: "I did this one just for fun! After working on prior prototypes without a game engine, I wanted to see how Godot solved the common issues I faced. " +
            "It certainly deserves the love it gets, since I was able to build the prototype above in just one week.",
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
        endYear: 2026
    },
    {
        name: "Red Hat",
        startYear: 2021,
        endYear: 2023
    },
    {
        name: "BlueAcorn ICI",
        startYear: 2019,
        endYear: 2021
    },
    {
        name: "Capgemini",
        startYear: 2018,
        endYear: 2019
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
        name: "First Citizens Bank"
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

const FloatingModel: React.FC<{ src: string; position?: [number, number, number]; targetSize?: number }> = ({
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
                        <a href="#technologies">Stack</a>
                        <a href="#past-companies">Experience</a>
                        <a href="#contact">Contact</a>
                    </nav>
                    <div className={"header-links"}>
                        <a className="header-link" href="https://github.com/asharron" target="_blank"
                           rel="noopener noreferrer">GITHUB <span aria-hidden="true">↗</span></a>
                        <a className="header-link" href="https://linkedin.com/in/alexandrith" target="_blank"
                           rel="noopener noreferrer">LINKEDIN <span aria-hidden="true">↗</span></a>
                        <a className="header-link" href="/resume.pdf" target="_blank"
                           rel="noopener noreferrer">RÉSUMÉ <span aria-hidden="true">↗</span></a>
                    </div>
                </header>

                <section className="hero" aria-labelledby="portfolio-title">
                    <div className="hero-copy">
                        <p className="hero-intro">Hi, I’m Alexandrith. I'm a full stack software developer with experience
                            in Java and React. I have over 8 years of working with web professionally. In my free time, I tackle projects to grow my design and engineering skills.</p>
                        <img src={headshot} alt="profile headshot" className={'headshot'}/>
                        <div className="hero-actions">
                            <a className="button button-primary" href="#projects">Explore projects <span
                                aria-hidden="true">↓</span></a>
                            <a className="button button-secondary" href="/resume.pdf" target="_blank"
                               rel="noopener noreferrer">My résumé <span aria-hidden="true">↗</span></a>
                        </div>
                    </div>

                    <div className="hero-art" role="img" aria-label="Pixel art and a 3D game character">
                        <div className="art-topline"><span>FIG. 01</span><span>✳ 2026—∞</span></div>
                        <div className="hero-stage">
                            <div className="stage-sparkle stage-sparkle-one" aria-hidden="true">✦</div>
                            <div className="stage-sparkle stage-sparkle-two" aria-hidden="true">✦</div>
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
                    </div>
                </section>

                <div className="portfolio-details" aria-label="Technologies and experience">
                    <section className="portfolio-detail-card technologies-card" id="technologies"
                             aria-labelledby="technologies-title">
                        <div className="detail-card-heading">
                            <div><p className="section-kicker">MY TOOLKIT <span>✳</span></p>
                                <h2 id="technologies-title">Technologies</h2>
                                <p className="detail-card-description">Languages and frameworks I've used on different
                                    teams.</p></div>
                            <span className="detail-card-index">01 / 04</span>
                        </div>
                        <ul className="technology-list">
                            {technologies.map((technology) => (
                                <li key={technology.name}>
                                    <div><strong>{technology.name}</strong><span>{technology.type}</span></div>
                                    <span className="technology-experience">{technology.yearsOfExperience} yrs</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="portfolio-detail-card tools-card" id="favorite-tools"
                             aria-labelledby="favorite-tools-title">
                        <div className="detail-card-heading">
                            <div><p className="section-kicker">DAILY DRIVERS <span>✳</span></p>
                                <h2 id="favorite-tools-title">Favorite tools</h2>
                                <p className="detail-card-description">A few trusted tools that are part of my everyday
                                    workflow.</p></div>
                            <span className="detail-card-index">02 / 04</span>
                        </div>
                        <ul className="tool-list">
                            {favoriteTools.map((tool) => <li key={tool.name}><span className="tool-sparkle"
                                                                                   aria-hidden="true">✳</span>{tool.name}
                            </li>)}
                        </ul>
                    </section>

                    <section className="portfolio-detail-card companies-card" id="past-companies"
                             aria-labelledby="past-companies-title">
                        <div className="detail-card-heading">
                            <div><p className="section-kicker">ON THE TEAM <span>✳</span></p>
                                <h2 id="past-companies-title">Past companies</h2>
                                <p className="detail-card-description">Some of the teams and organizations I’ve been
                                    employed at.</p></div>
                            <span className="detail-card-index">03 / 04</span>
                        </div>
                        <ul className="company-list">
                            {pastCompanies.map((company) => (
                                <li key={company.name}><strong>{company.name}</strong>
                                    <span>{company.startYear}—{company.endYear}</span></li>
                            ))}
                        </ul>
                    </section>

                    <section className="portfolio-detail-card clients-card" id="past-clients"
                             aria-labelledby="past-clients-title">
                        <div className="detail-card-heading">
                            <div><p className="section-kicker">WORKED WITH <span>✳</span></p>
                                <h2 id="past-clients-title">Past clients</h2>
                                <p className="detail-card-description">These are clients I've worked with during my
                                    roles at other employers.</p></div>
                            <span className="detail-card-index">04 / 04</span>
                        </div>
                        <ul className="client-list">
                            {pastClients.map((client) => <li key={client.name}>{client.name}</li>)}
                        </ul>
                    </section>
                </div>

                <section className="projects-section" id="projects" aria-labelledby="projects-title">
                    <div className="section-heading">
                        <div><p className="section-kicker">THE PROJECT ARCADE <span>✳</span></p>
                            <h2 id="projects-title">A few of my<em> pet projects</em></h2></div>
                        <p className="section-note">Personal projects &amp; prototypes</p>
                    </div>
                    <div className="project-grid">
                        {projects.map((project, index) => (
                            <article className={`project-card project-card-${project.slug}`} key={project.slug}>
                                <div className="project-card-top">
                                    <span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>✳</span></div>
                                <div className="project-media">
                                    {project.images.map((image, imageIndex) => (
                                        <img key={imageIndex} src={image} alt={`${project.name} gameplay preview`}
                                             loading="lazy"/>
                                    ))}
                                    {project.videos.map((video, videoIndex) => (
                                        <video key={videoIndex} src={video} controls muted loop playsInline
                                               preload="metadata"
                                               aria-label={`${project.name} demo ${videoIndex + 1}`}/>
                                    ))}
                                </div>
                                <div className="project-info">
                                    <p className="project-slug">/{project.slug}</p>
                                    <h3>{project.name}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <p className="project-subdescription">{project.subDescription}</p>
                                    <ul className="tag-list" aria-label={`${project.name} technology stack`}>
                                        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="contact-section" id="contact" aria-labelledby="contact-title">
                    <div className="contact-pixel" aria-hidden="true"><PixelSprite src={playerIdleSheet} frames={4}
                                                                                   label="Animated player character"/>
                    </div>
                    <div><p className="section-kicker">YOUR TURN <span>✳</span></p>
                        <h2 id="contact-title">Still here?</h2>
                        <p>Say hi, peek at my code, or take a look at my résumé.</p></div>
                    <div className="contact-links">
                        <a href="https://github.com/asharron" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                        <a href="https://linkedin.com/in/alexandrith" target="_blank" rel="noopener noreferrer">LinkedIn
                            ↗</a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
                    </div>
                </section>

                <footer className="site-footer"><a className="footer-brand" href="#top">alexandrith<span>.com</span></a>
                    <a href="#top">BACK TO TOP ↑</a></footer>
            </div>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Alexandrith — Game &amp; Software Developer</title>;
