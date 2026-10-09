import { getAvatar, type AvatarId, type AvatarState } from "@/lib/avatars";
export interface AgentAvatarProps {
  avatarId?: AvatarId;
  name?: string;
  color?: string;
  size?: number;
  state?: AvatarState;
  className?: string;
  decorative?: boolean;
}
export default function AgentAvatar({
  avatarId = "bubble",
  name,
  color,
  size = 48,
  state = "idle",
  className = "",
  decorative = false,
}: AgentAvatarProps) {
  const a = getAvatar(avatarId);
  const fill = /^#[0-9a-f]{6}$/i.test(color ?? "") ? color : a.color;
  return (
    <span
      className={`agent-avatar avatar-${state} ${className}`}
      style={{ width: size, height: size }}
      data-state={state}
    >
      <svg
        viewBox="0 0 120 120"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : `${name || a.name}, ${state}`}
      >
        <g className="avatar-body">
          <path d={a.path} fill="#20221f" transform="translate(1 3)" />
          <path d={a.path} fill={fill} />
          <g className="avatar-eyes">
            <ellipse cx="47" cy="53" rx="11" ry="15" fill="white" />
            <ellipse cx="76" cy="52" rx="11" ry="15" fill="white" />
            <ellipse
              cx="49"
              cy="55"
              rx="7"
              ry={state === "success" ? 5 : 11}
              fill="#171916"
            />
            <ellipse
              cx="78"
              cy="54"
              rx="7"
              ry={state === "success" ? 5 : 11}
              fill="#171916"
            />
          </g>
          {state === "error" ? (
            <>
              <path
                d="M48 80Q62 68 77 80M39 32L52 37M70 37L82 31"
                fill="none"
                stroke="#171916"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          ) : state === "thinking" ? (
            <ellipse cx="62" cy="78" rx="4" ry="5" fill="#171916" />
          ) : (
            <path
              d="M48 77Q62 87 77 74"
              fill="none"
              stroke="#171916"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
    </span>
  );
}
