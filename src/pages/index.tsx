import * as React from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import type {HeadFC, PageProps} from "gatsby";
import {useEffect, useMemo, useRef, useState} from "react";
import {ShaderMaterial, Vector2} from "three";
import "./app.scss";
// @ts-ignore
import lispPocketMonsterGif from '../images/lisp-pocket-monsters.gif';
// @ts-ignore
import gogameEditorMp4 from '../images/gogame_editor.mp4';
// @ts-ignore
import gogameDemoMp4 from '../images/gogame_demo.mp4';
// @ts-ignore
import mechDemoMp4 from '../images/mech_demo_reduced.mp4';

type PortfolioProject = {
    name: string;
    slug: string;
    description: string;
    images: string[];
    videos: string[];
    stack: string[];
    linesOfCode: string;
};

type TerminalEntry = {
    id: number;
    command: string;
    output: string[];
    listProjects?: boolean;
    project?: PortfolioProject;
    openedResume?: boolean;
    openedGithub?: boolean;
    openedLinkedin?: boolean;
};

const projects: PortfolioProject[] = [
    {
        name: "Lisp Pocket Monsters",
        slug: "lisp-pocket-monsters",
        description: "A prototype game of pocket monsters written in Common Lisp utilizing Raylib",
        stack: ["Common Lisp", "Raylib", "LDtk"],
        images: [lispPocketMonsterGif],
        videos: [],
        linesOfCode: "2,000",
    },
    {
        name: "Gogame",
        slug: "gogame",
        description: "A prototype of a game editor and game based on farming and combat written in Go",
        stack: ["Golang", "Ebiten"],
        images: [],
        videos: [gogameEditorMp4, gogameDemoMp4],
        linesOfCode: "9,000+",
    },
    {
        name: "Mech Game",
        slug: "mech-game",
        description: "A first person mech game built in Godot Mono with C#",
        stack: ["Godot", "Blender", "C#"],
        images: [],
        videos: [mechDemoMp4],
        linesOfCode: "2,000+",
    },
];

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

        vec3 color = vec3(0.018, 0.027, 0.039);
        color += vec3(0.02, 0.24, 0.22) * grid * 0.16;
        color += vec3(0.10, 0.88, 0.68) * (firstGlow * 0.18 + firstLine * 0.48);
        color += vec3(0.40, 0.23, 0.82) * (secondGlow * 0.13 + secondLine * 0.22);
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

const runHelpCommand = () => {
    return {
        output: [
            "Available commands:",
            "  help                  Show this command reference",
            "  resume                Open the resume in a new tab",
            "  github                Open github.com/asharron in a new tab",
            "  linkedin              Open linkedin.com/in/alexandrith in a new tab",
            "  projects              List personal projects worked on",
            "  project <name>        View a project by its name",
            "Try: project gogame",
        ],
    };
}

const runResumeCommand = () => {
    return {
        output: ["Opening the resume in a new tab…"],
        openedResume: true,
    };
}

const runGithubCommand = () => {
    return {
        output: ["Opening github.com/asharron in a new tab"],
        openedGithub: true,
    };
}

const runLinkedinCommand = () => {
    return {
        output: ["Opening linkedin.com/alexandrith in a new tab…"],
        openedLinkedin: true,
    };
}

const runProjectsCommand = () => {
    return {
        output: ["Example projects — run `project <name>` to inspect one:"],
        listProjects: true,
    };
}

const runProjectCommand = (projectName: string, ...args: any[]) => {
    const project = projects.find((item) => item.slug === projectName);

    if (project) {
        return {output: [], project};
    }

    return {
        output: [`No project found for "${args.join(" ")}". Run projects to see the available names.`],
    };
}

const getCommandResult = (command: string): Omit<TerminalEntry, "id" | "command"> => {
    const [action, ...args] = command.trim().split(/\s+/);
    const normalizedAction = action.toLowerCase();
    const projectName = args.join("-").toLowerCase();

    if (normalizedAction === "help") {
        return runHelpCommand();
    }

    if (normalizedAction === "resume") {
        return runResumeCommand();
    }

    if (normalizedAction === "github") {
        return runGithubCommand();
    }

    if (normalizedAction === "linkedin") {
        return runLinkedinCommand();
    }

    if (normalizedAction === "projects" && args.length === 0) {
        return runProjectsCommand();
    }

    if (normalizedAction === "project") {
        return runProjectCommand(projectName, args);
    }

    return {
        output: [`Command not found: "${command}". Type help to see available commands.`],
    };
};

const IndexPage: React.FC<PageProps> = () => {
    const [input, setInput] = useState("");
    const [entries, setEntries] = useState<TerminalEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputEndRef = useRef<HTMLDivElement>(null);
    const commandHistory = useRef<string[]>([]);
    const historyIndex = useRef(-1);
    const nextEntryId = useRef(0);

    useEffect(() => {
        outputEndRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [entries]);

    const runCommand = (rawCommand: string) => {
        const command = rawCommand.trim();
        if (!command) {
            return;
        }

        const result = getCommandResult(command);
        if (result.openedResume) {
            window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        }

        if (result.openedGithub) {
            window.open("https://github.com/asharron", "_blank", "noopener,noreferrer");
        }

        if (result.openedLinkedin) {
            window.open("https://linkedin.com/in/alexandrith", "_blank", "noopener,noreferrer");
        }

        commandHistory.current.push(command);
        historyIndex.current = commandHistory.current.length;
        setEntries((current) => [...current, {id: nextEntryId.current++, command, ...result}]);
        setInput("");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        runCommand(input);
    };

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            historyIndex.current = Math.max(0, historyIndex.current - 1);
            setInput(commandHistory.current[historyIndex.current] ?? "");
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            historyIndex.current = Math.min(commandHistory.current.length, historyIndex.current + 1);
            setInput(commandHistory.current[historyIndex.current] ?? "");
        }
    };

    return (
        <main className="portfolio-shell">
            <div className="shader-canvas" aria-hidden="true">
                <Canvas orthographic camera={{position: [0, 0, 1], zoom: 1}} dpr={[1, 1.5]}>
                    <ShaderBackground/>
                </Canvas>
            </div>

            <section className="terminal-window" aria-labelledby="portfolio-title">
                <header className="terminal-topbar">
                    <div className="window-controls" aria-hidden="true">
                        <span className="window-control window-control-red"/>
                        <span className="window-control window-control-yellow"/>
                        <span className="window-control window-control-green"/>
                    </div>
                    <span className="terminal-title">alexandrith.com — portfolio</span>
                </header>

                <div className="terminal-content">
                    <section className="welcome-block">
                        <div className="eyebrow"><span>//</span> INTERACTIVE PORTFOLIO
                        </div>
                        <h1 id="portfolio-title">alexandrith<span>.com</span></h1>
                        <p className="welcome-copy">Personal portfolio for Alexandrith Sharron</p>
                        <div className="system-meta">
                            <span>TYPE <strong>help</strong> TO BEGIN</span>
                        </div>
                    </section>

                    <section className="terminal-log" aria-label="Command output" aria-live="polite">
                        <div className="welcome-output">
                            <p className="output-line">Welcome to my portfolio site. Enter a command below, or type <code>help</code> to see
                                what is available.</p>
                        </div>
                        {entries.map((entry) => (
                            <div className="command-entry" key={entry.id}>
                                <div className="prompt-line"><span className="prompt-user">guest@alexandrith</span><span
                                    className="prompt-colon">:</span><span className="prompt-path">~</span><span
                                    className="prompt-dollar">$</span><span>{entry.command}</span></div>
                                <div className="command-output">
                                    {entry.output.map((line, index) => <p className="output-line"
                                                                          key={index}>{line}</p>)}
                                    {entry.openedResume && (
                                        <a className="resume-link" href="/resume.pdf" target="_blank"
                                           rel="noopener noreferrer">
                                            Open resume.pdf <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                    {entry.openedGithub && (
                                        <a className="resume-link" href="github.com/asharron" target="_blank"
                                           rel="noopener noreferrer">
                                            Open github.com/asharron <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                    {entry.openedLinkedin && (
                                        <a className="resume-link" href="github.com/asharron" target="_blank"
                                           rel="noopener noreferrer">
                                            Open linkedin.com/in/alexandrith <span aria-hidden="true">↗</span>
                                        </a>
                                    )}


                                    {entry.listProjects && (
                                        <div className="project-list">
                                            {projects.map((project) => (
                                                <div className="project-row" key={project.slug}>
                                                    <code>{project.slug}</code><span>{project.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {entry.project && (
                                        <div className="project-detail">
                                            <div className="project-detail-heading">
                                                <span>PROJECT</span><code>{entry.project.slug}</code></div>
                                            <h2>{entry.project.name}</h2>
                                            <p>{entry.project.description}</p>
                                            <p>Lines of code: {entry.project.linesOfCode}</p>

                                            {entry.project.images.map((image, index) => (
                                                <img className={'project-image'} key={index} src={image} alt="image" />
                                            ))}

                                            {entry.project.videos.map((video, index) => (
                                                <video className={'project-video'} key={index} src={video} controls={true} />
                                            ))}

                                            <div className="project-stack">
                                                <span>STACK</span>{entry.project.stack.map((technology) => <code
                                                key={technology}>{technology}</code>)}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={outputEndRef}/>
                    </section>

                    <form className="command-form" onSubmit={onSubmit}>
                        <label className="prompt-line" htmlFor="command-input"><span
                            className="prompt-user">guest@alexandrith</span><span className="prompt-colon">:</span><span
                            className="prompt-path">~</span><span className="prompt-dollar">$</span></label>
                        <input
                            ref={inputRef}
                            id="command-input"
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={onInputKeyDown}
                            placeholder="enter a command..."
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            aria-label="Enter a portfolio command"
                        />
                        <button type="submit" aria-label="Run command">↵</button>
                    </form>

                    <footer className="terminal-footer">
                        <span><i/> READY FOR INPUT</span>
                        <span>↑ / ↓ COMMAND HISTORY</span>
                    </footer>
                </div>
            </section>
            <div className="ambient-label" aria-hidden="true">WEBGL / FRAGMENT_SHADER / 60 FPS</div>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>alexandrith.com — Interactive Portfolio</title>;
