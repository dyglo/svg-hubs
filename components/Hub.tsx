"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  Download,
  Search,
  Sparkles,
  Code2,
  Play,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import AgentAvatar from "./AgentAvatar";
import Workspace from "./Workspace";
import {
  avatars,
  states,
  avatarSvg,
  type AvatarId,
  type AvatarState,
  getAvatar,
} from "@/lib/avatars";
export type Agent = {
  id: string;
  name: string;
  avatarId: AvatarId;
  color: string;
  role: string;
};
const initial: Agent[] = [
  {
    id: "tafar",
    name: "Tafar",
    avatarId: "bubble",
    color: "#29b8ed",
    role: "Billing",
  },
  {
    id: "rowan",
    name: "Rowan",
    avatarId: "flower",
    color: "#b768ef",
    role: "Email Triage",
  },
];
export default function Hub() {
  const [view, setView] = useState<"gallery" | "workspace">("gallery");
  const [selected, setSelected] = useState<AvatarId>("bubble");
  const [state, setState] = useState<AvatarState>("idle");
  const [color, setColor] = useState<string>(avatars[0].color);
  const [name, setName] = useState<string>(avatars[0].name);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [agents, setAgents] = useState<Agent[]>(initial);
  const [ready, setReady] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [agentId, setAgentId] = useState("tafar");
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("svg-hubs-agents") || "null",
      );
      if (
        Array.isArray(saved) &&
        saved.length &&
        saved.every(
          (a) =>
            typeof a.id === "string" &&
            typeof a.name === "string" &&
            avatars.some((v) => v.id === a.avatarId) &&
            /^#[0-9a-f]{6}$/i.test(a.color) &&
            typeof a.role === "string",
        )
      )
        setAgents(saved);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("svg-hubs-agents", JSON.stringify(agents));
      } catch {}
    }
  }, [agents, ready]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!customize) return;
    const previous = document.activeElement as HTMLElement;
    const dialog = document.querySelector<HTMLElement>(".avatar-modal");
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCustomize(false);
      if (e.key === "Tab" && dialog) {
        const items = Array.from(
          dialog.querySelectorAll<HTMLElement>("button:not(:disabled), input"),
        );
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [customize]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setView("gallery");
        setTimeout(
          () =>
            document.querySelector<HTMLInputElement>(".search input")?.focus(),
          0,
        );
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  const a = getAvatar(selected);
  const choose = (id: AvatarId) => {
    const v = getAvatar(id);
    setSelected(id);
    setColor(v.color);
    setName(v.name);
  };
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      setToast("Clipboard unavailable. Use Download SVG instead.");
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([avatarSvg(selected, color)], { type: "image/svg+xml" }),
    );
    const el = document.createElement("a");
    el.href = url;
    el.download = `${selected}.svg`;
    el.click();
    URL.revokeObjectURL(url);
    setToast("Your SVG is ready");
  }
  const snippet = `import AgentAvatar from './AgentAvatar';\n\n<AgentAvatar\n  avatarId="${selected}"\n  name=${JSON.stringify(name)}\n  color="${color}"\n  state="${state}"\n  size={64}\n/>`;
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="SVG Hubs home">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          svg hubs<span className="brand-dot">®</span>
        </a>
        <nav aria-label="Main navigation">
          <button
            className={view === "gallery" ? "active" : ""}
            onClick={() => setView("gallery")}
          >
            Characters <span className="tiny-count">12</span>
          </button>
          <button
            className={view === "workspace" ? "active" : ""}
            onClick={() => setView("workspace")}
          >
            Workspace demo <ArrowUpRight size={14} />
          </button>
        </nav>
        <a
          className="github-link"
          href="https://github.com/dyglo/svg-hubs"
          target="_blank"
          rel="noreferrer"
        >
          Get the source <ArrowUpRight size={16} />
        </a>
      </header>
      {view === "gallery" ? (
        <main className="gallery-main">
          <section className="hero">
            <div>
              <div className="eyebrow">
                <span /> A LITTLE PERSONALITY. A LOT OF POSSIBILITY.
              </div>
              <h1>
                Meet your next
                <br />
                little <span>collaborator.</span>
                <svg viewBox="0 0 330 15" aria-hidden="true">
                  <path d="M4 10Q150 -2 325 8" />
                </svg>
              </h1>
              <p>
                Friendly faces for the agents doing big things.
                <br />
                Twelve expressive SVG characters, ready to make your app feel
                alive.
              </p>
              <div className="hero-actions">
                <a className="dark-button" href="#collection">
                  Find your character <ArrowRight size={16} />
                </a>
                <button
                  className="text-button"
                  onClick={() => setView("workspace")}
                >
                  <Play size={14} /> See them at work
                </button>
              </div>
              <div className="hero-meta">
                <span>
                  <Check size={13} /> Pure SVG
                </span>
                <span>
                  <Check size={13} /> 5 animated states
                </span>
                <span>
                  <Check size={13} /> React ready
                </span>
              </div>
            </div>
            <div className="hero-art">
              <span className="art-caption top">
                GOOD COMPANY FOR GREAT IDEAS
              </span>
              <div className="art-grid">
                {["flower", "star", "heart", "cloud", "arrow", "hand"].map(
                  (id, i) => (
                    <div key={id} className={`art-cell art-${i}`}>
                      <AgentAvatar
                        avatarId={id as AvatarId}
                        size={110}
                        state={i === 1 ? "thinking" : "idle"}
                      />
                    </div>
                  ),
                )}
              </div>
              <span className="art-caption bottom">
                a team with character <span>↗</span>
              </span>
              <span className="orbit-tag">
                <span /> Available for your next big idea
              </span>
            </div>
          </section>
          <section id="collection" className="collection">
            <div className="collection-heading">
              <div className="collection-title">
                <h2>The character collection</h2>
                <span>12 little originals</span>
              </div>
              <label className="search">
                <Search size={16} />
                <input
                  aria-label="Search characters"
                  placeholder="Find a friendly face…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span>⌘ K</span>
              </label>
            </div>
            <div className="collection-layout">
              <div className="avatar-grid">
                {avatars
                  .filter((v) =>
                    (v.name + " " + v.description)
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  )
                  .map((v) => (
                    <button
                      key={v.id}
                      className={`character-card ${selected === v.id ? "selected" : ""}`}
                      onClick={() => choose(v.id)}
                      aria-pressed={selected === v.id}
                    >
                      <span className="card-number">
                        {String(avatars.indexOf(v) + 1).padStart(2, "0")}
                      </span>
                      {selected === v.id && (
                        <span className="selected-check">
                          <Check size={12} />
                        </span>
                      )}
                      <div
                        className="character-stage"
                        style={{ background: `${v.color}0c` }}
                      >
                        <AgentAvatar avatarId={v.id} size={83} />
                      </div>
                      <div className="character-info">
                        <span>{v.name}</span>
                        <span
                          className="color-dot"
                          style={{ background: v.color }}
                        />
                      </div>
                    </button>
                  ))}
                {!avatars.some((v) =>
                  (v.name + " " + v.description)
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                ) && (
                  <p className="empty-results">
                    No characters found. Try another name.
                  </p>
                )}
              </div>
              <aside className="custom-panel">
                <div className="panel-heading">
                  <span>MAKE IT YOURS</span>
                  <SlidersHorizontal size={15} />
                </div>
                <div className="preview-stage">
                  <div className="preview-orbit" />
                  <AgentAvatar
                    avatarId={selected}
                    color={color}
                    name={name}
                    state={state}
                    size={145}
                  />
                  <span className={`state-label state-${state}`}>
                    <i />
                    {state}
                  </span>
                </div>
                <div className="preview-title">
                  <h3>{a.name}</h3>
                  <span>
                    #{String(avatars.indexOf(a) + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="preview-description">{a.description}</p>
                <label className="field-label">
                  Agent name
                  <input
                    value={name}
                    maxLength={40}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your agent's name"
                  />
                </label>
                <div className="color-field">
                  <span>Character color</span>
                  <label className="color-control">
                    <input
                      type="color"
                      aria-label="Character color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    <span>{color.toUpperCase()}</span>
                  </label>
                </div>
                <span className="field-caption">PREVIEW A STATE</span>
                <div className="state-controls">
                  {states.map((s) => (
                    <button
                      key={s}
                      className={state === s ? "on" : ""}
                      onClick={() => setState(s)}
                      aria-pressed={state === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="export-buttons">
                  <button className="dark-button" onClick={download}>
                    <Download size={15} /> Download SVG
                  </button>
                  <button
                    className="outline-button"
                    onClick={() => copy(avatarSvg(selected, color))}
                  >
                    <Copy size={14} /> Copy SVG
                  </button>
                </div>
                <button className="copy-react" onClick={() => copy(snippet)}>
                  <Code2 size={15} /> Copy React usage <Copy size={13} />
                </button>
                <span className="panel-note">
                  Small files. Big personality. No dependencies.
                </span>
              </aside>
            </div>
          </section>
          <section className="integration-section">
            <div>
              <span className="eyebrow">BUILT TO BELONG</span>
              <h2>
                From a friendly face
                <br />
                to a familiar teammate.
              </h2>
              <p>
                One component, wherever your agents show up.
                <br />
                Sidebar, conversation, cockpit, and execution.
              </p>
              <button
                className="text-button"
                onClick={() => setView("workspace")}
              >
                Explore the Deplyze demo <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="integration-demo">
              <div className="demo-top">
                <span className="live-dot" /> AGENT ACTIVITY{" "}
                <span>just now</span>
              </div>
              <div className="demo-agent">
                <AgentAvatar
                  avatarId={selected}
                  color={color}
                  size={57}
                  state="working"
                />
                <div>
                  <strong>{name || a.name}</strong>
                  <p>Bringing your next idea to life</p>
                </div>
                <span className="mini-pill">Working</span>
              </div>
              <div className="demo-progress">
                <span />
              </div>
              <div className="demo-bottom">
                <Check size={14} /> Context gathered <span>03 / 05 steps</span>
              </div>
            </div>
          </section>
          <section className="developer-section">
            <div>
              <Code2 size={22} />
              <h3>Your app. Their personality.</h3>
              <p>
                Use the SVG anywhere, or bring all five states into React.
                <br />
                The reusable component and CSS are in the repository.
              </p>
              <a
                href="https://github.com/dyglo/svg-hubs"
                target="_blank"
                rel="noreferrer"
              >
                Browse the integration guide <ArrowUpRight size={14} />
              </a>
            </div>
            <pre>
              <code>{snippet}</code>
            </pre>
          </section>
          <footer>
            <a className="brand" href="/">
              svg hubs<span className="brand-dot">®</span>
            </a>
            <span>Made for agents. Loved by humans.</span>
            <span>12 characters · endlessly yours</span>
          </footer>
        </main>
      ) : (
        <Workspace
          agents={agents}
          setAgents={setAgents}
          agentId={agentId}
          setAgentId={setAgentId}
          onCustomize={(id) => {
            const ag = agents.find((v) => v.id === (id || agentId))!;
            setSelected(ag.avatarId);
            setName(ag.name);
            setColor(ag.color);
            setCustomize(true);
          }}
        />
      )}
      {customize && (
        <div className="modal-backdrop" onClick={() => setCustomize(false)}>
          <section
            className="avatar-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Customize agent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <h2>Meet your agent</h2>
              <button
                aria-label="Close customization"
                onClick={() => setCustomize(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-preview">
              <AgentAvatar
                avatarId={selected}
                name={name}
                color={color}
                size={95}
              />
            </div>
            <label className="field-label">
              Agent name
              <input
                autoFocus
                value={name}
                maxLength={40}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="modal-grid">
              {avatars.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelected(v.id);
                    setColor(v.color);
                  }}
                  aria-label={v.name}
                  aria-pressed={selected === v.id}
                  className={selected === v.id ? "chosen" : ""}
                >
                  <AgentAvatar avatarId={v.id} size={50} />
                </button>
              ))}
            </div>
            <label className="color-field">
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
            <button
              className="dark-button"
              disabled={!name.trim()}
              onClick={() => {
                setAgents((prev) =>
                  prev.map((v) =>
                    v.id === agentId
                      ? { ...v, name: name.trim(), avatarId: selected, color }
                      : v,
                  ),
                );
                setCustomize(false);
                setToast("Agent updated");
              }}
            >
              Save agent <Check size={16} />
            </button>
          </section>
        </div>
      )}
      {toast && (
        <div role="status" className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </>
  );
}
