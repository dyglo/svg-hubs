"use client";
import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  PanelLeft,
  Plus,
  Search,
  Command,
  ChevronDown,
  Sparkles,
  Code2,
  Play,
  Activity,
  Inbox,
  Gamepad2,
  Bot,
  Send,
  Sun,
  ShieldCheck,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import AgentAvatar from "./AgentAvatar";
import type { AvatarId, AvatarState } from "@/lib/avatars";
import type { Agent } from "./Hub";

export default function Workspace({
  agents,
  setAgents,
  agentId,
  setAgentId,
  onCustomize,
}: {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  agentId: string;
  setAgentId: (id: string) => void;
  onCustomize: (id?: string) => void;
}) {
  const [nav, setNav] = useState("New");
  const [collapsed, setCollapsed] = useState(false);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Chat");
  const [rows, setRows] = useState<
    { text: string; state: AvatarState; user?: boolean }[]
  >([]);
  const [step, setStep] = useState(0);
  const [runState, setRunState] = useState<AvatarState>("idle");
  const [running, setRunning] = useState(false);
  const [failed, setFailed] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = conversationRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows]);
  const agent = agents.find((v) => v.id === agentId) || agents[0];
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (step === 0) {
        setRunState("working");
        setRows((p) => [
          ...p,
          {
            text: "Gathering context and preparing the next steps…",
            state: "working",
          },
        ]);
        setStep(1);
      } else if (step === 1) {
        setRows((p) => [
          ...p,
          {
            text: "Read project context → prepared configuration → validated sample input.",
            state: "working",
          },
        ]);
        setStep(2);
      } else {
        setRunState(failed ? "error" : "success");
        setRows((p) => [
          ...p,
          {
            text: failed
              ? "Demo error: the sample connection timed out. Retry to run the sequence again."
              : "Demo complete. Your sample plan is ready: collect input, extract records, store results, and send a summary.",
            state: failed ? "error" : "success",
          },
        ]);
        setRunning(false);
        setStep(failed ? 2 : 4);
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, [running, step, failed]);
  function send(message = text, simulateError = false) {
    if (!message.trim() || running) return;
    setRows((p) => [
      ...p,
      { text: message.trim(), state: "idle", user: true },
      { text: "Thinking through your request…", state: "thinking" },
    ]);
    setText("");
    setRunState("thinking");
    setStep(0);
    setFailed(simulateError);
    setRunning(true);
  }
  const reset = () => {
    setRunning(false);
    setRows([]);
    setRunState("idle");
    setStep(0);
    setNav("New");
  };
  return (
    <main className="workspace-bg">
      <div className="workspace-window">
        <aside className={`workspace-sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="window-controls">
            <div>
              <i />
              <i />
              <i />
            </div>
            <button
              aria-label="Toggle sidebar"
              onClick={() => setCollapsed(!collapsed)}
            >
              <PanelLeft size={17} />
            </button>
          </div>
          <div className="workspace-brand">
            Deplyze <ChevronDown size={14} />
            <Search size={18} />
          </div>
          <nav aria-label="Workspace navigation">
            {[
              { name: "New", icon: Plus },
              { name: "Agents", icon: Bot },
              { name: "Cockpit", icon: Gamepad2 },
              { name: "Inbox", icon: Inbox },
              { name: "Activity", icon: Activity },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={nav === name ? "on" : ""}
                onClick={() => (name === "New" ? reset() : setNav(name))}
                title={name}
              >
                <Icon size={18} />
                <span>{name}</span>
                {name === "Inbox" && <small>1</small>}
              </button>
            ))}
          </nav>
          <div className="sidebar-section">
            <span>Projects</span>
            {agents.map((a) => (
              <button
                key={a.id}
                className={agentId === a.id ? "selected-agent" : ""}
                onClick={() => {
                  setAgentId(a.id);
                  setNav("New");
                  setRunning(false);
                  setRows([]);
                  setRunState("idle");
                }}
                title={a.name}
              >
                <AgentAvatar
                  avatarId={a.avatarId}
                  name={a.name}
                  color={a.color}
                  size={24}
                  state={a.id === agentId ? runState : "idle"}
                />
                <span>
                  {a.name} <em>· {a.role}</em>
                </span>
              </button>
            ))}
          </div>
          <div className="sidebar-section recents">
            <span>Recents</span>
            {[
              "Invoice tracking",
              "Build an email assistant",
              "Plan my next project",
            ].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setNav("New");
                  send(t);
                }}
              >
                <span className="recent-circle" />
                <span>{t}</span>
              </button>
            ))}
          </div>
          <button className="sidebar-user" onClick={() => onCustomize()}>
            <AgentAvatar
              avatarId={agent.avatarId}
              color={agent.color}
              size={29}
            />
            <span>{agent.name}</span>
            <ChevronDown size={14} />
          </button>
        </aside>
        <section className="workspace-content">
          <div className="workspace-top">
            <span>
              <Command size={17} />
              {nav === "New" ? "Invoice Tracking Agent Planning" : nav}
              <ChevronDown size={14} />
            </span>
            <span className="demo-badge">Interactive demo</span>
          </div>
          {nav === "New" ? (
            <>
              <div className="conversation" ref={conversationRef}>
                {rows.length === 0 ? (
                  <div className="workspace-welcome">
                    <div className="welcome-avatars">
                      {agents.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => {
                            setAgentId(a.id);
                          }}
                          aria-label={`Select ${a.name}`}
                        >
                          <AgentAvatar
                            avatarId={a.avatarId}
                            color={a.color}
                            size={45}
                          />
                        </button>
                      ))}
                      {["star", "heart", "arrow", "bolt"].map((id) => (
                        <AgentAvatar
                          key={id}
                          avatarId={id as AvatarId}
                          size={45}
                        />
                      ))}
                    </div>
                    <h2>What are we working on today, {agent.name}?</h2>
                    <div className="prompt-cards">
                      {[
                        {
                          icon: Sparkles,
                          text: "Plan an agent from an idea",
                          color: "#d79d38",
                        },
                        {
                          icon: Code2,
                          text: "Build and modify your agent",
                          color: "#a17bd7",
                        },
                        {
                          icon: Search,
                          text: "Explain what your agent is doing",
                          color: "#4aaf7a",
                        },
                        {
                          icon: Activity,
                          text: "Trace an agent execution",
                          color: "#ef6a61",
                        },
                      ].map(({ icon: Icon, text, color }) => (
                        <button key={text} onClick={() => setText(text + ": ")}>
                          <Icon size={17} style={{ color }} />
                          <span>{text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="chat-rows" aria-live="polite">
                    {rows.map((r, i) => (
                      <div
                        key={i}
                        className={r.user ? "chat-row user-row" : "chat-row"}
                      >
                        {!r.user && (
                          <AgentAvatar
                            avatarId={agent.avatarId}
                            color={agent.color}
                            name={agent.name}
                            state={r.state}
                            size={34}
                          />
                        )}
                        <div>
                          {!r.user && (
                            <strong>
                              {agent.name} <span>{r.state}</span>
                            </strong>
                          )}
                          <p>{r.text}</p>
                        </div>
                      </div>
                    ))}
                    {runState === "error" && (
                      <button
                        className="outline-button"
                        onClick={() => send("Retry the previous request")}
                      >
                        <RotateCcw size={14} /> Retry
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="composer-wrap">
                <div className="composer-project">
                  <span>
                    <AgentAvatar
                      avatarId={agent.avatarId}
                      color={agent.color}
                      size={22}
                      state={runState}
                    />{" "}
                    {agent.name}
                  </span>
                  <button onClick={() => onCustomize()}>
                    <SlidersHorizontal size={15} /> Customize
                  </button>
                </div>
                <form
                  className="composer"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                >
                  <textarea
                    aria-label="Message your agent"
                    placeholder={
                      mode === "Test"
                        ? `Paste a sample input to test ${agent.name}.`
                        : `Describe what ${agent.name} should do.`
                    }
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                  />
                  <div className="composer-tools">
                    <span>
                      <Sun size={17} />
                      <ShieldCheck size={15} /> Fast
                    </span>
                    <span className="composer-right">
                      <span className="model-label">
                        ✳ Opus 5.5 <ChevronDown size={12} />
                      </span>
                      <span className="mode-toggle">
                        {["Chat", "Test"].map((m) => (
                          <button
                            type="button"
                            key={m}
                            className={mode === m ? "on" : ""}
                            onClick={() => setMode(m)}
                          >
                            {m}
                          </button>
                        ))}
                      </span>
                      <button
                        type="submit"
                        className="send-button"
                        aria-label="Send message"
                        disabled={!text.trim() || running}
                      >
                        <Send size={18} />
                      </button>
                    </span>
                  </div>
                </form>
                <div className="demo-disclaimer">
                  Scripted preview · no live AI calls or external integrations
                </div>
              </div>
            </>
          ) : (
            <div className="workspace-view">
              <div className="view-heading">
                <div>
                  <span className="eyebrow">YOUR WORKSPACE</span>
                  <h2>
                    {nav === "Agents"
                      ? "A team with personality"
                      : nav === "Cockpit"
                        ? "Everything in motion"
                        : nav === "Activity"
                          ? "Execution, step by step"
                          : "Your inbox"}
                  </h2>
                </div>
                {nav === "Agents" && (
                  <button
                    className="dark-button"
                    onClick={() => {
                      const id = `agent-${Date.now()}`;
                      setAgents((p) => [
                        ...p,
                        {
                          id,
                          name: "New agent",
                          avatarId: "star",
                          color: "#ffcd48",
                          role: "Assistant",
                        },
                      ]);
                      setAgentId(id);
                    }}
                  >
                    <Plus size={15} /> Add agent
                  </button>
                )}
              </div>
              {nav === "Agents" || nav === "Cockpit" ? (
                <div className="agent-cards">
                  {agents.map((a) => (
                    <article key={a.id}>
                      <AgentAvatar
                        avatarId={a.avatarId}
                        color={a.color}
                        name={a.name}
                        size={70}
                        state={a.id === agentId ? runState : "idle"}
                      />
                      <h3>{a.name}</h3>
                      <p>{a.role}</p>
                      <span className="mini-pill">
                        {a.id === agentId ? runState : "idle"}
                      </span>
                      <button
                        className="outline-button"
                        onClick={() => {
                          setAgentId(a.id);
                          if (nav === "Agents") onCustomizeFor(a);
                          else setNav("Activity");
                        }}
                      >
                        {nav === "Agents"
                          ? "Customize agent"
                          : "View execution"}{" "}
                        <ArrowUpRight size={14} />
                      </button>
                    </article>
                  ))}
                </div>
              ) : nav === "Activity" ? (
                <>
                  <div className="execution-agent">
                    <AgentAvatar
                      avatarId={agent.avatarId}
                      color={agent.color}
                      state={runState}
                      size={53}
                    />
                    <div>
                      <strong>{agent.name}</strong>
                      <p>Sample invoice tracking run</p>
                    </div>
                    <span className="mini-pill">{runState}</span>
                  </div>
                  <div className="execution-steps">
                    {[
                      "Review project context",
                      "Extract invoice records",
                      "Store and validate results",
                      "Send summary",
                    ].map((s, i) => (
                      <div key={s}>
                        <span>{step > i ? <Check size={16} /> : i + 1}</span>
                        <div>
                          <strong>{s}</strong>
                          <p>
                            {step > i
                              ? "Complete"
                              : running && step === i
                                ? "In progress"
                                : "Waiting"}
                          </p>
                        </div>
                        <AgentAvatar
                          avatarId={agent.avatarId}
                          color={agent.color}
                          size={30}
                          state={
                            step > i
                              ? "success"
                              : running && step === i
                                ? "working"
                                : "idle"
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="run-actions">
                    <button
                      className="dark-button"
                      disabled={running}
                      onClick={() => send("Run sample invoice tracking")}
                    >
                      <Play size={14} /> Run demo
                    </button>
                    <button
                      className="outline-button"
                      disabled={running}
                      onClick={() => send("Test a connection timeout", true)}
                    >
                      Preview error state
                    </button>
                  </div>
                </>
              ) : (
                <div className="inbox-item">
                  <AgentAvatar
                    avatarId={agent.avatarId}
                    color={agent.color}
                    state="success"
                    size={45}
                  />
                  <div>
                    <strong>Your avatars are ready</strong>
                    <p>
                      Pick a character, customize your team, and try a sample
                      execution.
                    </p>
                    <button
                      className="text-button"
                      onClick={() => setNav("Agents")}
                    >
                      Meet your agents <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
        <aside className="workspace-rail">
          {[
            { icon: Sun, label: "Home", nav: "New" },
            { icon: Bot, label: "Agents", nav: "Agents" },
            { icon: Gamepad2, label: "Cockpit", nav: "Cockpit" },
            { icon: Activity, label: "Execution", nav: "Activity" },
            { icon: Inbox, label: "Inbox", nav: "Inbox" },
          ].map(({ icon: Icon, label, nav: n }) => (
            <button key={label} aria-label={label} onClick={() => setNav(n)}>
              <Icon size={19} />
            </button>
          ))}
        </aside>
      </div>
    </main>
  );
  function onCustomizeFor(a: Agent) {
    setAgentId(a.id);
    onCustomize(a.id);
  }
}
