/** Bold, animated stickers and symbols inspired by the supplied mood boards. */
const sPath = (d: string, fill: string, extra = "") =>
  `<path d="${d}" fill="${fill}" ${extra}/>`;
const sLine = (d: string, width = 4) =>
  sPath(
    d,
    "none",
    `stroke="#191b18" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`,
  );
const sCircle = (x: number, y: number, r: number, fill: string) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
function stickerFace(x = 60, y = 56) {
  return `<g class="pal-eyes"><g class="pal-pupils">${sCircle(x - 14, y, 4, "#191b18")}${sCircle(x + 14, y, 4, "#191b18")}</g></g><g class="pal-smile">${sLine(`M${x - 12} ${y + 17}q12 15 24-2`, 3)}</g><g class="pal-grin">${sPath(`M${x - 13} ${y + 14}q13 7 26-2q-1 23-13 22q-12 0-13-20Z`, "#191b18")}${sPath(`M${x - 7} ${y + 29}q7-5 15 0q-7 8-15 0Z`, "#f78191")}</g>`;
}
function burst(points = 12, inner = 43, outer = 54) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const a = (i * Math.PI) / points - Math.PI / 2,
      r = i % 2 ? inner : outer;
    d += `${i ? "L" : "M"}${(60 + Math.cos(a) * r).toFixed(1)} ${(60 + Math.sin(a) * r).toFixed(1)}`;
  }
  return d + "Z";
}
export function stickerArtwork(id: string, color: string) {
  let body = "";
  const key = id.slice(8);
  if (key === "smiley")
    body =
      sCircle(60, 60, 49, color) +
      sCircle(60, 60, 38, "#191b18") +
      sCircle(60, 60, 33, color) +
      stickerFace(60, 54);
  if (key === "sunburst")
    body =
      sPath(burst(14, 32, 56), color) +
      `<g class="pal-eyes"><g class="pal-pupils">${sLine("M40 60q6-12 12 0M68 60q6-12 12 0", 3)}</g></g><g class="pal-smile">${sLine("M47 75q13 13 27-2", 3)}</g><g class="pal-grin">${sPath("M47 73q13 7 27 0q-2 20-13 19q-11 0-14-19Z", "#191b18")}</g>`;
  if (key === "half-moon")
    body =
      sPath("M8 38Q60 25 112 38Q111 103 60 107Q12 103 8 38Z", color) +
      `<g class="pal-eyes">${sPath("M33 51Q50 48 49 63Q45 76 35 69Q29 65 33 51Z", "white")}${sPath("M70 50Q87 46 88 61Q86 75 75 70Q68 65 70 50Z", "white")}<g class="pal-pupils">${sPath("M34 52Q43 47 44 61Q42 74 35 67Z", "#191b18")}${sPath("M71 51Q80 46 82 61Q79 73 74 67Z", "#191b18")}</g></g><g class="pal-smile">${sPath("M42 84q18 13 38-1", "none", 'stroke="white" stroke-width="3" stroke-linecap="round"')}</g><g class="pal-grin">${sPath("M44 82q17 6 34-1q-4 19-18 17q-12-1-16-16Z", "white")}</g>`;
  if (key === "thumbs-up")
    body =
      sPath(burst(10, 47, 52), color) +
      `<g class="pal-prop">${sPath("M33 58L45 54L53 41L58 26Q64 19 67 27Q70 36 64 50L83 49Q92 49 92 56Q92 63 87 64Q95 71 87 77Q93 85 84 90L58 93L43 86L33 85Z", color, 'stroke="#191b18" stroke-width="3" stroke-linejoin="round"')}${sLine("M64 64L85 64M63 77L84 77M60 87L80 87M43 59L43 85", 2.5)}</g>`;
  if (key === "applause")
    body =
      sCircle(60, 60, 50, color) +
      `<g class="pal-prop">${sLine("M26 81L24 61Q23 49 28 52L30 65L29 41Q29 34 33 40L36 60L35 35Q36 27 39 35L42 61L42 43Q43 35 47 44L51 64L58 59Q65 58 59 69L52 83L53 98M95 80L97 59Q98 48 93 51L90 64L92 40Q90 32 87 39L84 60L86 35Q84 27 81 34L78 60L78 42Q75 33 72 43L69 65L63 60Q54 57 61 69L68 83L67 98", 2.3)}${sLine("M44 15L51 31M60 12L60 29M77 15L69 31", 2.8)}</g>`;
  if (key === "globe")
    body =
      sPath("M18 12L102 12L102 64Q100 108 60 110Q20 106 18 64Z", color) +
      `<g class="pal-symbol">${sCircle(60, 57, 34, "none")}<circle cx="60" cy="57" r="34" fill="none" stroke="#191b18" stroke-width="3.8"/>${sLine("M26 57L94 57M31 42L90 42M31 73L89 73M60 23L60 91", 3)}<ellipse cx="60" cy="57" rx="16" ry="34" fill="none" stroke="#191b18" stroke-width="3"/></g>`;
  if (key === "question")
    body =
      sCircle(60, 60, 49, color) +
      `<g class="pal-symbol">${sPath("M43 42Q44 25 61 24Q82 24 82 43Q82 54 68 59L67 68L55 68L55 57Q55 53 63 50Q72 47 70 41Q69 35 62 36Q56 36 55 44Z", "#191b18")}${sCircle(61, 84, 7, "#191b18")}</g>`;
  if (key === "exclaim")
    body =
      sCircle(60, 60, 49, color) +
      `<g class="pal-symbol">${sPath("M51 25L70 25L66 72L55 72Z", "#191b18")}${sCircle(61, 88, 8, "#191b18")}</g>`;
  if (key === "clock")
    body =
      sCircle(60, 60, 50, color) +
      `<circle cx="60" cy="60" r="35" fill="none" stroke="#191b18" stroke-width="5"/><g class="pal-clock">${sLine("M60 37L60 60L78 70", 5)}</g>`;
  if (key === "heart")
    body =
      sPath(
        "M61 107Q7 82 9 49Q11 17 37 18Q55 18 61 36Q75 9 101 23Q128 43 104 75Q86 96 61 107Z",
        color,
      ) + stickerFace(61, 56);
  if (key === "star")
    body =
      sPath(
        "M60 7L76 41L113 44L85 69L94 109L60 89L25 109L33 69L7 43L45 40Z",
        color,
      ) + stickerFace(60, 56);
  if (key === "good-job")
    body =
      sPath(
        "M11 40Q11 7 60 9Q110 9 110 39Q108 54 84 60Q111 64 110 84Q106 111 60 111Q9 111 10 84Q11 66 35 60Q10 54 11 40Z",
        color,
      ) +
      `<g class="pal-symbol"><text x="60" y="47" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="900" fill="#191b18">GOOD</text><text x="60" y="88" text-anchor="middle" font-family="Arial,sans-serif" font-size="27" font-weight="900" fill="#191b18">JOB</text></g>`;
  if (key === "do-good")
    body =
      sCircle(60, 60, 49, color) +
      `<g class="pal-symbol" transform="rotate(-12 60 60)"><text x="60" y="51" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#191b18">DO</text><text x="60" y="77" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#191b18">GOOD</text></g>`;
  if (key === "squiggle")
    body = `<g class="pal-symbol"><path d="M19 101Q10 67 32 43Q51 28 45 49Q38 65 29 53Q21 40 45 27Q67 20 67 42Q64 64 53 52Q42 41 65 22Q87 2 104 23" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/></g>`;
  if (key === "confetti")
    body = `<g class="pal-symbol">${sPath("M16 78Q21 51 33 57Q45 66 35 73Q22 84 42 91", "none", `stroke="${color}" stroke-width="7" stroke-linecap="round"`)}${sPath("M60 18Q53 39 74 37Q92 37 88 58", "none", 'stroke="#9287f0" stroke-width="7" stroke-linecap="round"')}${sCircle(26, 26, 6, "#ff7745")}${sCircle(84, 91, 6, "#cf4cf0")}${sPath("M53 57L59 68L72 69L62 78L65 91L53 84L42 90L45 77L36 68L49 67Z", "#ffd34b")}${sPath("M103 48L105 58", "none", 'stroke="#ffd34b" stroke-width="5" stroke-linecap="round"')}</g>`;
  if (key === "paperclips")
    body = `<g class="pal-symbol"><path d="M34 77L56 27Q67 3 78 13Q88 20 81 36L59 87Q50 106 36 96Q26 88 34 70L53 29Q58 17 63 21Q68 24 63 36L46 74" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/><path d="M79 86L88 63Q93 51 101 57Q109 62 104 73L95 97Q89 111 80 103Q74 98 79 86L88 68" fill="none" stroke="#ff7845" stroke-width="4" stroke-linecap="round"/></g>`;
  return { defs: "", body, viewBox: "0 0 120 120", family: "stickers" };
}
