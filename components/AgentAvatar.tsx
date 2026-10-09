import { useId } from "react";
import {
  avatarSvg,
  getAvatar,
  type AvatarId,
  type AvatarState,
} from "@/lib/avatars";
import { avatarAnimationCss } from "@/lib/avatar-animation";
import type { CSSProperties } from "react";
export interface AgentAvatarProps {
  avatarId?: AvatarId;
  name?: string;
  color?: string;
  size?: number;
  state?: AvatarState;
  className?: string;
  decorative?: boolean;
  delay?: number;
}
/** Every character looks right, left, up, down, blinks and smiles automatically. */
export default function AgentAvatar({
  avatarId = "bubble",
  name,
  color,
  size = 48,
  state = "idle",
  className = "",
  decorative = false,
  delay = 0,
}: AgentAvatarProps) {
  const a = getAvatar(avatarId);
  const fill = /^#[0-9a-f]{6}$/i.test(color ?? "") ? color : a.color;
  const prefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  if ("family" in a) {
    const safeName = (name || a.name).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&apos;",
        })[c]!,
    );
    const markup = avatarSvg(a.id, fill, prefix)
      .replace(
        `${a.name}, animated character`,
        `${safeName}, animated character`,
      )
      .replace(
        'class="svg-pal ',
        `style="--pal-delay:${delay}s" data-state="${state}" class="svg-pal `,
      )
      .replace('role="img"', decorative ? 'aria-hidden="true"' : 'role="img"');
    return (
      <span
        className={`agent-avatar ${className}`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }
  return (
    <span
      className={`agent-avatar ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-pal"
        viewBox="0 0 120 120"
        data-state={state}
        style={{ "--pal-delay": `${delay}s` } as CSSProperties}
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={
          decorative ? undefined : `${name || a.name}, animated character`
        }
      >
        <style>{avatarAnimationCss}</style>
        <g className="pal-body">
          <path d={a.path} fill="#20221f" transform="translate(1 3)" />
          <path d={a.path} fill={fill} />
          {a.id === "hand" && (
            <path
              d="M61 22L55 41M78 35L74 47"
              fill="none"
              stroke="#171916"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          <g className="pal-eyes">
            <ellipse cx="47" cy="53" rx="11" ry="15" fill="white" />
            <ellipse cx="76" cy="52" rx="11" ry="15" fill="white" />
            <g className="pal-pupils">
              <ellipse cx="47" cy="54" rx="6.5" ry="10.5" fill="#171916" />
              <ellipse cx="76" cy="53" rx="6.5" ry="10.5" fill="#171916" />
            </g>
          </g>
          <g className="pal-cheeks" fill="#ef5880">
            <ellipse cx="35" cy="72" rx="7" ry="4" />
            <ellipse cx="87" cy="71" rx="7" ry="4" />
          </g>
          {state === "error" ? (
            <path
              d="M48 80Q62 68 77 80"
              fill="none"
              stroke="#171916"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path
                className="pal-smile"
                d="M48 77Q62 87 77 74"
                fill="none"
                stroke="#171916"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <g className="pal-grin">
                <path
                  d="M47 74Q62 81 78 72Q75 94 62 91Q49 91 47 74Z"
                  fill="#171916"
                />
                <path d="M55 87Q62 83 70 86Q62 94 55 87Z" fill="#ef7e8a" />
              </g>
            </>
          )}
        </g>
      </svg>
    </span>
  );
}
