"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, RotateCcw } from "lucide-react";
import AgentAvatar from "./AgentAvatar";
import {
  avatars,
  avatarSvg,
  type AvatarId,
  getAvatar,
  families,
  familyOf,
  type CharacterFamily,
} from "@/lib/avatars";
const positions = [
  { x: 14, y: 20, size: 112, r: -10 },
  { x: 28, y: 18, size: 105, r: 7 },
  { x: 76, y: 20, size: 109, r: 8 },
  { x: 89, y: 39, size: 115, r: -8 },
  { x: 23, y: 49, size: 122, r: 5 },
  { x: 49, y: 51, size: 128, r: -6 },
  { x: 76, y: 53, size: 119, r: 9 },
  { x: 12, y: 78, size: 108, r: -3 },
  { x: 39, y: 78, size: 117, r: 9 },
  { x: 59, y: 76, size: 108, r: -8 },
  { x: 87, y: 79, size: 113, r: 6 },
  { x: 92, y: 8, size: 87, r: 8 },
];
const palette = [
  "#29B8ED",
  "#FFC342",
  "#FF315D",
  "#B768EF",
  "#FF784C",
  "#43CC46",
];
export default function Canvas() {
  const [family, setFamily] = useState<CharacterFamily>("dots");
  const [selected, setSelected] = useState<AvatarId>("dot-beret");
  const visible = avatars.filter((v) => familyOf(v) === family);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [info, setInfo] = useState(false);
  const a = getAvatar(selected);
  const color = colors[selected] || a.color;
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2400);
    return () => clearTimeout(timer);
  }, [notice]);
  function save() {
    const url = URL.createObjectURL(
      new Blob([avatarSvg(selected, color)], { type: "image/svg+xml" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selected}-animated.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("A little friend, ready to go.");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(avatarSvg(selected, color));
      setNotice("Animated SVG copied. Make yourself at home.");
    } catch {
      setNotice("Clipboard unavailable. Save the SVG instead.");
    }
  }
  return (
    <main className="canvas-page">
      <div className="paper">
        <header className="canvas-header">
          <span className="header-note">
            Little characters.
            <br />
            Big personalities.
          </span>
          <a className="wordmark" href="/">
            svg hubs<span>®</span>
          </a>
          <button
            className="info-button"
            onClick={() => setInfo(!info)}
            aria-expanded={info}
          >
            {info ? "Close" : "Information"} <ArrowUpRight size={12} />
          </button>
        </header>
        <nav className="family-nav" aria-label="Character families">
          {families.map((f) => (
            <button
              key={f.id}
              aria-pressed={family === f.id}
              onClick={() => {
                setFamily(f.id);
                setSelected(avatars.find((v) => familyOf(v) === f.id)!.id);
              }}
            >
              {f.label}
              <span>{avatars.filter((v) => familyOf(v) === f.id).length}</span>
            </button>
          ))}
        </nav>
        <section
          className={`playground family-${family}`}
          aria-label="Animated character canvas"
        >
          <div className="canvas-title">
            <span>
              {family === "originals"
                ? "A FEW FRIENDLY FACES"
                : family === "dots"
                  ? "SOFT SHAPES. SERIOUS PERSONALITY."
                  : family === "muse"
                    ? "A LITTLE MORE CHARACTER"
                    : "SMALL BOTS. BIG ENERGY."}
            </span>
            <h1>
              {family === "dots" ? (
                "The Dots."
              ) : family === "muse" ? (
                "Meet your Muse."
              ) : family === "grok" ? (
                "Small bots. Big spirit."
              ) : (
                <>
                  Make room for
                  <br />
                  <em>a little character.</em>
                </>
              )}
            </h1>
            <p>Pick a friend. Take them with you.</p>
          </div>
          <svg
            className="doodle doodle-arrow"
            viewBox="0 0 110 65"
            aria-hidden="true"
          >
            <path d="M9 8Q-1 53 84 40M66 27L85 41L70 53" />
          </svg>
          <svg
            className="doodle doodle-spark"
            viewBox="0 0 45 45"
            aria-hidden="true"
          >
            <path d="M22 3L22 12M22 32L22 42M3 22L12 22M32 22L42 22M8 8L14 14M31 31L37 37M8 37L14 31M31 14L37 8" />
          </svg>
          <div className="canvas-characters">
            {visible.map((v, i) => {
              const p =
                family === "dots"
                  ? {
                      x: [17, 39, 61, 83][i],
                      y: 57,
                      size: 232,
                      r: [-6, 2, -2, 6][i],
                    }
                  : family === "muse"
                    ? {
                        x: [12, 31, 50, 69, 88][i],
                        y: 58,
                        size: 248,
                        r: [-3, 2, 0, -2, 3][i],
                      }
                    : positions[i];
              return (
                <button
                  key={v.id}
                  className={`canvas-character ${selected === v.id ? "is-selected" : ""}`}
                  aria-label={`Select ${v.name}`}
                  aria-pressed={selected === v.id}
                  onClick={() => setSelected(v.id)}
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      "--character-size": `${p.size}px`,
                      "--character-rotation": `${p.r}deg`,
                    } as React.CSSProperties
                  }
                >
                  <AgentAvatar
                    avatarId={v.id}
                    color={colors[v.id] || v.color}
                    name={v.name}
                    size={p.size}
                    delay={-i * 1.17}
                    decorative
                  />
                  <span className="character-name">
                    {v.name}
                    <ArrowUpRight size={11} />
                  </span>
                </button>
              );
            })}
          </div>
          <span className="canvas-caption">
            Looking around. Finding their people.
          </span>
        </section>
        <footer className="canvas-footer">
          <div className="selected-caption">
            <span className="small-label">YOUR LITTLE FRIEND</span>
            <h2>
              {a.name}
              <ArrowUpRight size={11} />
            </h2>
            <p>{a.description}</p>
          </div>
          <div className="canvas-actions">
            <button onClick={save}>
              <ArrowDown size={14} /> Save SVG
            </button>
            <button onClick={copy}>
              <Copy size={13} /> Copy SVG
            </button>
            <button
              className="reset-button"
              onClick={() => {
                setColors({});
                setSelected(visible[0].id);
                setNotice("Back to their colorful selves.");
              }}
              aria-label="Reset characters"
            >
              <RotateCcw size={13} />
            </button>
          </div>
          <div
            className="palette"
            role="group"
            aria-label="Selected character color"
          >
            {palette.map((c) => (
              <button
                key={c}
                style={{ background: c }}
                aria-label={`Set color ${c}`}
                aria-pressed={color === c}
                onClick={() =>
                  setColors((prev) => ({ ...prev, [selected]: c }))
                }
              >
                {color === c && <Check size={10} />}
              </button>
            ))}
          </div>
        </footer>
        {info && (
          <div className="canvas-info" role="status">
            <span>
              29 SVG characters across four families. Every one looks left,
              right, up and down, blinks, and breaks into a smile. Save or copy
              any character with its animation built in. Reduced motion is
              respected. Dots, Grok Bots and Muse are reference-inspired vector
              recreations, not official assets.
            </span>
            <a
              href="https://github.com/dyglo/svg-hubs"
              target="_blank"
              rel="noreferrer"
            >
              React component & source <ArrowUpRight size={13} />
            </a>
          </div>
        )}
        <div className="paper-bottom">
          <span>Always animated. Always a little themselves.</span>
          <span>SVG · No animation libraries</span>
        </div>
      </div>
      {notice && (
        <div className="canvas-toast" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}
