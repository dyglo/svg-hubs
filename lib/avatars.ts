import { avatarAnimationCss } from "./avatar-animation";
import { characterArt } from "./character-art";
export type AvatarState = "idle" | "thinking" | "working" | "success" | "error";
export const states: AvatarState[] = [
  "idle",
  "thinking",
  "working",
  "success",
  "error",
];
export const avatars = [
  {
    id: "bubble",
    name: "Bubbles",
    color: "#29B8ED",
    description: "A bright idea, always ready to talk.",
    path: "M29 25C32 9 57 7 67 22C88 16 104 36 96 53C111 76 87 99 64 87L37 101L39 86C17 90 9 69 19 55C7 41 13 28 29 25Z",
  },
  {
    id: "spark",
    name: "Spark",
    color: "#FFC342",
    description: "Curiosity with a surprising twist.",
    path: "M29 91Q10 90 19 72L48 35Q58 22 51 12Q48 1 58 4Q69 6 65 23Q80 11 83 22Q87 30 74 39L99 80Q107 98 88 96Z",
  },
  {
    id: "heart",
    name: "Amore",
    color: "#FF315D",
    description: "A little heart goes a long way.",
    path: "M60 101C42 94 7 67 12 39C16 13 44 13 58 29C76 6 106 18 106 43C106 66 85 91 60 101Z",
  },
  {
    id: "flower",
    name: "Petal",
    color: "#B768EF",
    description: "Patient, thoughtful, and in full bloom.",
    path: "M48 29C39 4 66 1 69 28C87 5 105 26 86 43C115 38 116 65 89 66C111 84 89 104 74 84C78 115 49 115 49 86C32 112 9 91 30 73C1 77 0 49 28 48C3 33 22 13 41 31Z",
  },
  {
    id: "squish",
    name: "Squish",
    color: "#FF784C",
    description: "Flexible thinking. Friendly energy.",
    path: "M19 36C10 13 38 14 55 25C85 5 104 12 99 36C116 44 106 58 101 63C118 91 92 97 67 85C36 109 17 96 22 76C3 64 13 43 19 36Z",
  },
  {
    id: "star",
    name: "Stella",
    color: "#FFCD48",
    description: "Your north star for the next step.",
    path: "M60 10L78 36L109 44L89 69L89 103L60 92L30 103L30 71L10 45L42 36Z",
  },
  {
    id: "hand",
    name: "Howdy",
    color: "#43CC46",
    description: "A helping hand when you need one.",
    path: "M29 52C6 45 8 26 23 30L40 43L49 12Q59 0 65 13L63 27Q76 10 79 25L76 43Q88 26 91 41L91 64C91 94 72 111 43 106C18 102 9 87 12 68Q17 56 27 62L32 76Q44 67 29 52Z",
  },
  {
    id: "cloud",
    name: "Nimbus",
    color: "#2CBCEF",
    description: "Clear thinking, whatever the weather.",
    path: "M30 30C30 10 56 5 69 24C89 13 107 30 99 49C111 66 101 91 82 91C74 103 56 100 49 94C25 109 13 91 19 77C1 63 8 37 30 30Z",
  },
  {
    id: "burst",
    name: "Ziggy",
    color: "#B86AF2",
    description: "Unexpected angles. Excellent ideas.",
    path: "M49 8L73 28L106 21L101 49L118 61L99 77L112 99L84 95L76 116L57 96L32 112L35 85L13 90L23 66L4 56L29 44L13 23L44 28Z",
  },
  {
    id: "chat",
    name: "Chatter",
    color: "#FF3159",
    description: "Turns conversations into connections.",
    path: "M20 83C1 55 18 17 49 11C81 5 107 29 108 60C110 87 87 108 59 105L19 108L26 91Z",
  },
  {
    id: "arrow",
    name: "Scout",
    color: "#FF7446",
    description: "Forward is a pretty good direction.",
    path: "M23 25L81 33L85 18L114 64L80 105L79 87C50 91 27 83 8 72Z",
  },
  {
    id: "bolt",
    name: "Flash",
    color: "#FFC13C",
    description: "Small spark. Big momentum.",
    path: "M32 13L106 13L87 70L103 70L65 111L70 86L12 86Z",
  },
  {
    id: "grok-cloud",
    name: "Clover",
    color: "#00CA79",
    description: "A little green cloud.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-orb",
    name: "Orbit",
    color: "#FB249C",
    description: "Pink and perfectly round.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-amber",
    name: "Cocoa",
    color: "#A56C37",
    description: "Quietly curious.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-violet",
    name: "Violet",
    color: "#A44DFF",
    description: "A purple little daydream.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-sun",
    name: "Sunny",
    color: "#FFAD00",
    description: "Always on the bright side.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-cube",
    name: "Pixel",
    color: "#1686FF",
    description: "A blue square with a point of view.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-hex",
    name: "Hex",
    color: "#FF7407",
    description: "Six sides. Plenty of personality.",
    path: "",
    family: "grok",
  },
  {
    id: "grok-teal",
    name: "Tide",
    color: "#00BDA5",
    description: "Easygoing in turquoise.",
    path: "",
    family: "grok",
  },
  {
    id: "dot-beret",
    name: "Bleu",
    color: "#2D96E5",
    description: "A blue cloud in a black beret.",
    path: "",
    family: "dots",
  },
  {
    id: "dot-frog",
    name: "Sprout",
    color: "#A4CE44",
    description: "Wide-eyed, lime-green company.",
    path: "",
    family: "dots",
  },
  {
    id: "dot-scholar",
    name: "Goldie",
    color: "#F4C448",
    description: "Golden, thoughtful, and bespectacled.",
    path: "",
    family: "dots",
  },
  {
    id: "dot-heart",
    name: "Velvet",
    color: "#E94BB0",
    description: "A pink heart with shades.",
    path: "",
    family: "dots",
  },
  {
    id: "head-slick",
    name: "Ace",
    color: "#FFA58E",
    description: "A bright smile and swept-back hair.",
    path: "",
    family: "heads",
  },
  {
    id: "head-fringe",
    name: "Finn",
    color: "#FFA58E",
    description: "A tousled fringe and a curious look.",
    path: "",
    family: "heads",
  },
  {
    id: "head-curly",
    name: "Curls",
    color: "#FFA58E",
    description: "Big eyes beneath little curls.",
    path: "",
    family: "heads",
  },
  {
    id: "head-wideeyes",
    name: "Scout Head",
    color: "#FFA58E",
    description: "Round eyes, ready to explore.",
    path: "",
    family: "heads",
  },
  {
    id: "head-racer-green",
    name: "Green Racer",
    color: "#FFA58E",
    description: "Green helmet. Orange side panels.",
    path: "",
    family: "heads",
  },
  {
    id: "head-racer-red",
    name: "Cherry Racer",
    color: "#FFA58E",
    description: "Red helmet with a cream racing stripe.",
    path: "",
    family: "heads",
  },
  {
    id: "head-aviator-teal",
    name: "Teal Aviator",
    color: "#FFA58E",
    description: "A snug teal flight helmet.",
    path: "",
    family: "heads",
  },
  {
    id: "head-pilot-goggles",
    name: "Goggles",
    color: "#FFA58E",
    description: "Vintage goggles and a cream flight cap.",
    path: "",
    family: "heads",
  },
  {
    id: "head-tv-red",
    name: "Red TV",
    color: "#FFA58E",
    description: "A cheerful red television helmet.",
    path: "",
    family: "heads",
  },
  {
    id: "head-tv-mint",
    name: "Mint TV",
    color: "#FFA58E",
    description: "A mint-green television helmet.",
    path: "",
    family: "heads",
  },
  {
    id: "head-cyber-lime",
    name: "Neon",
    color: "#FFA58E",
    description: "A lime visor and padded earphones.",
    path: "",
    family: "heads",
  },
  {
    id: "head-bubble-space",
    name: "Bubble Pilot",
    color: "#FFA58E",
    description: "A pale-blue bubble visor.",
    path: "",
    family: "heads",
  },
  {
    id: "head-happy",
    name: "Sunny Curls",
    color: "#FFA58E",
    description: "Curly hair and an open smile.",
    path: "",
    family: "heads",
  },
  {
    id: "head-orbit-white",
    name: "Orbit Pilot",
    color: "#FFA58E",
    description: "A white helmet with a blue stripe.",
    path: "",
    family: "heads",
  },
  {
    id: "head-explorer",
    name: "Explorer",
    color: "#FFA58E",
    description: "A mint window into a little world.",
    path: "",
    family: "heads",
  },
  {
    id: "head-cosmo",
    name: "Cosmo",
    color: "#FFA58E",
    description: "A purple space helmet with a gold rim.",
    path: "",
    family: "heads",
  },
] as const;
export type AvatarId = (typeof avatars)[number]["id"];
export function getAvatar(id: string) {
  return avatars.find((a) => a.id === id) ?? avatars[0];
}
export function avatarSvg(id: string, color?: string, prefix?: string) {
  const a = getAvatar(id);
  const fill = /^#[0-9a-f]{6}$/i.test(color ?? "") ? color : a.color;
  if ("family" in a) {
    const art = characterArt(a.id, fill!, prefix || a.id);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${art.viewBox}" class="svg-pal pal-${art.family}" role="img" aria-label="${a.name}, animated character"><style>${avatarAnimationCss}</style>${art.defs}<g class="pal-body">${art.body}</g></svg>`;
  }
  const details =
    a.id === "hand"
      ? '<path d="M61 22L55 41M78 35L74 47" fill="none" stroke="#171916" stroke-width="3" stroke-linecap="round"/>'
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="svg-pal" role="img" aria-label="${a.name}, animated character"><style>${avatarAnimationCss}</style><g class="pal-body"><path d="${a.path}" fill="#20221f" transform="translate(1 3)"/><path d="${a.path}" fill="${fill}"/>${details}<g class="pal-eyes"><ellipse cx="47" cy="53" rx="11" ry="15" fill="white"/><ellipse cx="76" cy="52" rx="11" ry="15" fill="white"/><g class="pal-pupils"><ellipse cx="47" cy="54" rx="6.5" ry="10.5" fill="#171916"/><ellipse cx="76" cy="53" rx="6.5" ry="10.5" fill="#171916"/></g></g><g class="pal-cheeks" fill="#ef5880"><ellipse cx="35" cy="72" rx="7" ry="4"/><ellipse cx="87" cy="71" rx="7" ry="4"/></g><path class="pal-smile" d="M48 77Q62 87 77 74" fill="none" stroke="#171916" stroke-width="3.5" stroke-linecap="round"/><g class="pal-grin"><path d="M47 74Q62 81 78 72Q75 94 62 91Q49 91 47 74Z" fill="#171916"/><path d="M55 87Q62 83 70 86Q62 94 55 87Z" fill="#ef7e8a"/></g></g></svg>`;
}

export type CharacterFamily = "originals" | "grok" | "dots" | "heads";
export const families = [
  { id: "originals", label: "Originals" },
  { id: "grok", label: "Grok Bots" },
  { id: "dots", label: "Dots" },
  { id: "heads", label: "Heads" },
] as const;
export function familyOf(avatar: (typeof avatars)[number]): CharacterFamily {
  return "family" in avatar ? avatar.family : "originals";
}
