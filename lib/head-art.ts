/** Flat cartoon heads: sixteen hairstyles and helmets based on the supplied reference. */
const hPath = (d: string, fill: string, stroke = true) =>
  `<path d="${d}" fill="${fill}" ${stroke ? 'stroke="#202020" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"' : ""}/>`;
const hLine = (d: string, width = 1.8, color = "#202020") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const hEllipse = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  fill: string,
  stroke = false,
) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${stroke ? 'stroke="#202020" stroke-width="2.1"' : ""}/>`;
const hRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="#202020" stroke-width="2.1"/>`;
function headFace(color: string, variant = "normal") {
  const wide = variant === "wide" || variant === "spark";
  const eyes = wide
    ? `${hEllipse(43, 60, 7, 12, "#fff", true)}${hEllipse(63, 60, 7, 12, "#fff", true)}<g class="pal-pupils">${hEllipse(43, 61, 3.3, 7, "#171717")}${hEllipse(63, 61, 3.3, 7, "#171717")}${hEllipse(42, 58, 1, 2, "#fff")}${hEllipse(62, 58, 1, 2, "#fff")}</g>`
    : `<g class="pal-pupils">${hEllipse(43, 62, 2.6, 3.6, "#171717")}${hEllipse(64, 62, 2.6, 3.6, "#171717")}</g>`;
  return (
    hPath("M35 100L35 108L78 108L79 90", "" + color, false) +
    hLine("M35 98L35 108M79 90L79 108") +
    hPath(
      "M27 44Q29 32 51 33L78 36Q92 39 94 58Q110 50 108 67Q108 79 92 81Q87 96 70 100Q41 108 27 89Q23 77 25 57Z",
      color,
    ) +
    hLine("M93 67L100 63") +
    `<g class="pal-eyes">${eyes}</g>` +
    hLine("M38 49Q42 46 46 49M59 49Q63 46 67 49", 1.5) +
    `<g class="pal-smile">${variant === "happy" ? hPath("M45 77Q53 82 61 76Q59 90 51 88Q46 86 45 77Z", "#202020") : hLine("M48 79Q52 84 57 79", 1.7)}</g><g class="pal-grin">${hPath("M45 77Q53 83 62 76Q63 85 54 88Q46 88 45 77Z", "#fff")}${hLine("M49 85L59 83", 1, "#f09087")}</g><g class="pal-cheeks">${hEllipse(35, 75, 5, 2.4, "#ef6e78")}${hEllipse(74, 74, 5, 2.4, "#ef6e78")}</g>`
  );
}
const curlyHair = hPath(
  "M25 48Q17 43 24 36Q20 24 30 24Q29 14 40 18Q43 6 53 15Q62 3 68 14Q79 6 82 16Q95 10 97 23Q109 21 105 33Q119 39 107 48Q115 61 96 64L88 53Q74 59 74 43L76 30Q52 23 29 35Z",
  "#111",
  false,
);
export function headArtwork(id: string, color: string, prefix: string) {
  const key = id.slice(5);
  let back = "",
    front = "",
    hair = "",
    variant = "normal";
  if (key === "slick") {
    hair = hPath(
      "M25 49Q20 20 46 13Q75 3 93 20Q101 17 102 29Q112 28 112 41Q113 54 98 54L89 57Q77 58 75 29Q50 21 32 31Z",
      "#111",
      false,
    );
    variant = "happy";
  }
  if (key === "fringe") {
    hair = hPath(
      "M22 38Q4 40 13 22Q25 1 48 10Q68 0 78 11Q101 3 109 24Q118 43 103 43L99 56L83 56L80 36Q73 49 63 35Q58 51 45 46Q36 38 38 27Q29 44 22 38Z",
      "#111",
      false,
    );
  }
  if (["curly", "wideeyes", "happy"].includes(key)) {
    hair = curlyHair;
    variant = key === "curly" ? "spark" : key === "wideeyes" ? "wide" : "happy";
  }
  if (key === "racer-green") {
    back = hPath(
      "M27 45L106 46L104 90Q102 103 85 103L83 65L32 65L32 102Q20 103 20 92L20 52Z",
      "#f57521",
    );
    front =
      hPath("M15 44Q20 9 57 8Q95 7 107 46L104 55Q62 49 23 49Z", "#15982b") +
      hPath("M18 43L10 49L24 54L35 50Z", "#f48728") +
      hEllipse(91, 33, 11, 18, "#80b7ed", true) +
      hEllipse(91, 33, 7, 13, "#b9d1ff") +
      hEllipse(88, 27, 2, 4, "#fff") +
      hLine("M84 53L84 103");
    for (const x of [31, 50, 69])
      front += hEllipse(x, 40, 2.2, 3, "#217b31", true);
  }
  if (key === "racer-red") {
    back = hPath("M22 45Q12 74 27 99Q55 116 86 102L102 88L104 43Z", "#c92855");
    front =
      hPath(
        "M17 47Q25 7 61 9Q92 10 106 48L108 79L84 76L81 51Q47 39 17 47Z",
        "#cd2454",
      ) +
      hPath("M36 26Q52 11 67 11L80 15L63 26L49 28L31 42L24 42Z", "#f5ecdc") +
      hLine("M81 51L108 65") +
      hPath("M89 59Q103 59 95 79L84 88L83 72Z", "#f3eddf") +
      hLine("M85 81Q68 103 50 105");
  }
  if (key === "aviator-teal") {
    back = hPath(
      "M23 40Q48 12 82 25Q113 31 111 74L99 99L73 111L53 104L48 97L24 69Z",
      "#05655c",
    );
    front =
      hPath(
        "M24 40Q34 25 64 26Q77 29 80 42L82 87Q96 95 100 85L95 99L77 105L71 96L71 47Q48 35 27 48Z",
        "#997b7d",
      ) +
      hPath("M70 96L77 105L54 116L45 109L43 101Z", "#064b45") +
      hEllipse(100, 61, 11, 18, "#08695f", true) +
      hLine("M29 29L43 20L59 21", 5, "#ed574e");
  }
  if (key === "pilot-goggles") {
    back = hPath(
      "M29 39L94 32L108 91L81 103L75 62L34 60L31 103L19 99Z",
      "#512632",
    );
    front =
      hPath(
        "M20 50Q26 11 61 10Q92 9 108 44L109 58L97 67L88 50L47 45L28 60Z",
        "#e9e7de",
      ) +
      hPath("M21 44Q59 27 106 49L112 55L109 65Q63 43 22 55Z", "#502331") +
      hPath("M48 33L57 12L66 12L59 33Z", "#cad9c4") +
      hEllipse(39, 51, 13, 15, "#dbe1d4", true) +
      hEllipse(68, 53, 13, 15, "#dbe1d4", true) +
      hEllipse(39, 51, 9, 11, "#f0efe7", true) +
      hEllipse(68, 53, 9, 11, "#f0efe7", true) +
      hLine("M52 51L55 51M29 55L47 50M60 57L76 52");
  }
  if (key === "tv-red" || key === "tv-mint") {
    const red = key === "tv-red";
    back = hPath(
      "M20 15Q58 5 96 16Q106 19 106 42L105 96Q98 109 57 108L17 104Q9 95 11 66L11 33Q11 19 20 15Z",
      red ? "#ee5750" : "#8dc8bb",
    );
    front =
      hRect(15, 22, 69, 79, 12, "#f4f0e7") +
      hPath("M27 37Q45 24 65 33Q81 47 77 72Q77 94 51 94Q25 94 24 71Z", color);
    front += hLine("M92 41L92 86M99 41L99 87", 2.2);
    if (!red) front += hLine("M100 62L106 67M99 74L106 78M98 85L105 89", 2.2);
  }
  if (key === "cyber-lime") {
    back = hPath(
      "M20 37Q19 12 62 11Q96 12 109 40L106 74L88 79L78 34Z",
      "#4a2030",
    );
    front =
      hPath(
        "M21 34Q27 20 57 21L69 23Q77 27 77 40L77 55L66 56L65 37L33 36L30 55L20 55Z",
        "#b8f30a",
      ) +
      hEllipse(97, 58, 14, 21, "#4e2635", true) +
      hEllipse(97, 58, 9, 15, "#512836", true);
  }
  if (key === "bubble-space") {
    back =
      hPath("M5 12L115 12L108 58Q99 98 64 103L44 104Q12 93 9 56Z", "#e9ecf0") +
      hPath("M8 22L107 22L103 45L14 40Z", "#c9d8fc", false);
    front =
      hEllipse(53, 62, 34, 41, "#bacafb", true) +
      hEllipse(53, 62, 28, 35, color, true) +
      hEllipse(104, 58, 14, 19, "#ed5729", true) +
      hLine("M91 59L118 57");
  }
  if (key === "orbit-white") {
    back = hPath(
      "M15 61Q9 20 52 8Q96-2 112 44L110 89Q104 104 81 105L80 63L28 67L26 101Q12 98 15 61Z",
      "#f5f3ed",
    );
    front =
      hPath(
        "M48 11L63 8L80 13Q59 40 55 51L36 50Q34 28 48 11Z",
        "#4b9ae0",
        false,
      ) +
      hPath("M28 45L77 44L81 53L28 54Z", "#151515") +
      hEllipse(98, 66, 13, 23, "#fbfaf4", true) +
      hEllipse(98, 67, 4.5, 10, "#171717") +
      hLine("M27 55L27 103M81 61L81 107");
  }
  if (key === "explorer") {
    back = hPath(
      "M14 36Q38 8 72 9Q111 14 112 50L108 87Q101 104 64 108L18 101Z",
      "#f3f1e8",
    );
    front =
      hPath("M17 33Q50 18 83 30L85 98Q62 109 17 98Z", "#84c6b5") +
      hRect(25, 39, 51, 57, 8, color) +
      hPath("M19 29Q51 15 82 28L85 34Q51 24 18 38Z", "#b9ddd0") +
      hEllipse(107, 58, 13, 24, "#f5f3ed", true) +
      hLine("M80 79L100 85");
  }
  if (key === "cosmo") {
    back = hEllipse(62, 60, 49, 49, "#562474", true);
    front =
      hEllipse(52, 60, 34, 39, "#d3b444", true) +
      hEllipse(52, 60, 28, 33, color, true) +
      hPath("M91 41L108 45L108 74L92 71Z", "#e6e4da") +
      hLine("M99 44L98 73");
  }
  if (["slick", "fringe", "curly", "wideeyes", "happy"].includes(key))
    back = hEllipse(53, 38, 30, 22, "#111") + back;
  if (key === "pilot-goggles")
    front = `<g transform="translate(0 -8)">${front}</g>`;
  // Box helmets have a compact face; glass helmets keep the reference's round face.
  let face = headFace(color, variant);
  if (["tv-red", "tv-mint", "explorer"].includes(key)) {
    face = `<g transform="translate(9 13) scale(.70)">${headFace(color, variant)}</g>`;
  }
  if (["cosmo", "bubble-space"].includes(key)) {
    face = `<g transform="translate(6 10) scale(.82)">${headFace(color, variant)}</g>`;
  }
  if (key === "tv-red" || key === "tv-mint" || key === "explorer") {
    return {
      defs: "",
      viewBox: "0 0 120 120",
      family: "heads",
      body: back + front + face,
    };
  }
  if (key === "cosmo" || key === "bubble-space") {
    const clip =
      key === "cosmo"
        ? hEllipse(52, 60, 27, 32, "white")
        : hEllipse(53, 62, 27, 34, "white");
    const defs = `<defs><clipPath id="${prefix}-visor">${clip}</clipPath></defs>`;
    face = `<g clip-path="url(#${prefix}-visor)">${face}</g>`;
    const visor = front;
    return {
      defs,
      viewBox: "0 0 120 120",
      family: "heads",
      body: back + visor + face,
    };
  }
  // Hair and helmet caps sit above the face; earpieces and rims sit in front.
  return {
    defs: "",
    viewBox: "0 0 120 120",
    family: "heads",
    body: back + face + hair + front,
  };
}
