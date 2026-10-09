import { stickerArtwork } from "./sticker-art";
import { headArtwork } from "./head-art";
/** Hand-drawn vector artwork. Shared by previews and self-contained exports. */
const path = (d: string, fill: string, extra = "") =>
  `<path d="${d}" fill="${fill}" ${extra}/>`;
const ellipse = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  fill: string,
  extra = "",
) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const line = (d: string, color = "#242125", width = 2) =>
  path(
    d,
    "none",
    `stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`,
  );
function face(x: number, y: number, spacing = 12, eye = 2.4, light = false) {
  return `<g class="pal-eyes"><g class="pal-pupils">${ellipse(x - spacing, y, eye, eye * 1.25, "#231f25")}${ellipse(x + spacing, y, eye, eye * 1.25, "#231f25")}</g></g><g class="pal-cheeks">${ellipse(x - spacing - 4, y + 8, 5, 3, "#ef8496")}${ellipse(x + spacing + 4, y + 8, 5, 3, "#ef8496")}</g><g class="pal-smile">${line(`M${x - 4} ${y + 9}q4 4 8 0`, light ? "#57404a" : "#29232a", 1.6)}</g><g class="pal-grin">${path(`M${x - 5} ${y + 8}q5 3 10 0q-1 8-5 8q-4 0-5-8Z`, "#29232a")}${ellipse(x, y + 14, 2.5, 1.5, "#ee8a9b")}</g>`;
}
function plushDefs(prefix: string, color: string, shape: string) {
  let speckles = "";
  for (let i = 0; i < 360; i++) {
    const x = (i * 47) % 120,
      y = (i * 31) % 120;
    speckles += ellipse(
      x,
      y,
      0.22 + (i % 3) * 0.1,
      0.45,
      "#fff",
      `opacity="${0.07 + (i % 4) * 0.015}"`,
    );
  }
  return `<defs><radialGradient id="${prefix}-fur" cx="34%" cy="25%" r="80%"><stop offset="0" stop-color="white" stop-opacity=".42"/><stop offset=".38" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="#202137" stop-opacity=".25"/></radialGradient><linearGradient id="${prefix}-shade" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="white" stop-opacity=".12"/><stop offset=".55" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="#1c2040" stop-opacity=".35"/></linearGradient><pattern id="${prefix}-fleece" width="120" height="120" patternUnits="userSpaceOnUse">${speckles}</pattern><clipPath id="${prefix}-clip">${path(shape, "white")}</clipPath></defs>`;
}
function plushBody(prefix: string, color: string, shape: string) {
  return (
    path(shape, color) +
    path(shape, `url(#${prefix}-fur)`) +
    path(shape, `url(#${prefix}-shade)`) +
    `<g clip-path="url(#${prefix}-clip)">${path(shape, `url(#${prefix}-fleece)`)}</g>`
  );
}
export function characterArt(
  id: string,
  color: string,
  prefix: string,
): { defs: string; body: string; viewBox: string; family: string } {
  if (id.startsWith("sticker-")) return stickerArtwork(id, color);
  if (id.startsWith("head-")) return headArtwork(id, color, prefix);
  if (id.startsWith("grok-")) {
    const shapes: Record<string, string> = {
      cloud:
        "M28 31C22 8 49 3 61 19C82 1 107 20 98 42C120 57 108 88 91 88C81 106 54 106 43 96C16 110 1 83 14 65C4 48 12 34 28 31Z",
      orb: "M105 59A46 46 0 1 1 13 59A46 46 0 1 1 105 59Z",
      amber: "M107 59A46 46 0 1 1 15 59A46 46 0 1 1 107 59Z",
      violet:
        "M62 7C85 7 107 44 104 68C101 102 76 115 49 109C10 101 14 70 24 47C32 28 42 7 62 7Z",
      sun: "M109 61A50 50 0 1 1 9 61A50 50 0 1 1 109 61Z",
      cube: "M19 17Q58 8 97 19Q110 24 106 94Q101 110 27 105Q9 102 13 34Q13 22 19 17Z",
      hex: "M56 7Q60 4 66 9L105 31Q110 35 110 42L109 85Q109 91 103 95L65 116Q60 119 54 116L17 94Q11 91 12 83L13 40Q12 33 19 29Z",
      teal: "M108 60A47 47 0 1 1 14 60A47 47 0 1 1 108 60Z",
    };
    const key = id.slice(5);
    return {
      defs: "",
      viewBox: "0 0 120 120",
      family: "grok",
      body:
        path(shapes[key] || shapes.orb, color) +
        `<g class="pal-eyes"><g class="pal-pupils">${path("M46 45Q51 44 50 50L46 67Q45 72 40 71Q36 70 37 65L41 49Q42 45 46 45Z", "#141917")}${path("M68 45Q73 44 72 50L68 67Q67 72 62 71Q58 70 59 65L63 49Q64 45 68 45Z", "#141917")}</g></g><g class="pal-grin">${line("M44 82Q57 91 71 79", "#141917", 3)}</g>`,
    };
  }
  if (id.startsWith("dot-")) {
    const shapes: Record<string, string> = {
      beret:
        "M18 104C3 99 7 76 18 66C15 44 29 35 43 36C47 18 71 21 81 37C99 34 108 51 104 66C115 80 121 101 106 106Q60 115 18 104Z",
      frog: "M17 105C2 96 14 75 24 64L25 44C26 29 43 24 53 38C66 26 84 32 88 46L89 63C107 70 121 96 106 106Q62 117 17 105Z",
      scholar:
        "M14 106C2 101 9 83 22 58C39 18 54 8 69 20C89 34 111 79 113 96C117 117 72 116 51 115Q23 115 14 106Z",
      heart:
        "M61 110C44 105 10 86 8 59C4 23 39 15 60 38C78 11 115 23 115 57C115 82 83 105 61 110Z",
    };
    const key = id.slice(4),
      shape = shapes[key],
      defs = plushDefs(prefix, color, shape);
    let accessory = "";
    let eyes = "";
    if (key === "beret") {
      accessory =
        path(
          "M18 43C3 35 17 22 39 16C57 9 91 12 98 25C101 39 77 43 57 42L23 46Z",
          "#242628",
        ) +
        path("M19 32Q52 9 88 23", "#353838", 'opacity=".6"') +
        ellipse(57, 12, 6, 5, "#1d2021") +
        line("M24 39Q51 29 85 32", "#121518", 2);
      eyes = `<g class="pal-eyes"><g class="pal-pupils">${ellipse(49, 76, 3.3, 6, "#161d28")}${ellipse(72, 74, 3.3, 6, "#161d28")}</g></g><g class="pal-grin">${line("M51 91Q62 98 73 89", "#162131", 2.5)}</g>`;
    }
    if (key === "frog") {
      eyes = `<g class="pal-eyes">${ellipse(39, 47, 12, 13, "#daef9b")}${ellipse(75, 47, 12, 13, "#daef9b")}${ellipse(39, 47, 9, 10, "white")}${ellipse(75, 47, 9, 10, "white")}<g class="pal-pupils">${ellipse(39, 47, 6, 7, "#151c12")}${ellipse(75, 47, 6, 7, "#151c12")}</g></g><g class="pal-smile">${line("M49 82Q59 88 69 82", "#45621f", 2)}</g><g class="pal-grin">${path("M48 80Q60 86 73 79Q72 94 60 94Q49 94 48 80Z", "#29441b")}${ellipse(60, 91, 5, 2, "#ef98a0")}</g>`;
    }
    if (key === "scholar") {
      eyes = `<g class="pal-eyes"><g class="pal-pupils">${line("M33 66q7 10 14 0", "#322912", 2.5)}${line("M76 66q7 10 14 0", "#322912", 2.5)}</g></g><g class="pal-smile">${line("M55 87q6 4 12-1", "#46321a", 2)}</g><g class="pal-grin">${line("M52 86q9 10 20-2", "#46321a", 3)}</g>`;
      accessory = `<g fill="none" stroke="#2d2920" stroke-width="2.7"><circle cx="40" cy="65" r="19"/><circle cx="83" cy="65" r="19"/><path d="M59 64Q61 61 64 64M21 60L14 61M102 59L109 60"/></g>`;
    }
    if (key === "heart") {
      eyes = `<g class="pal-eyes"><g class="pal-pupils">${ellipse(41, 63, 10, 11, "#191723")}${ellipse(82, 63, 10, 11, "#191723")}</g></g><g class="pal-grin">${line("M50 85q11 9 22-2", "#582239", 2.5)}</g>`;
      accessory =
        `<g fill="#1b1823" stroke="#191723" stroke-width="2"><circle cx="41" cy="63" r="13"/><circle cx="82" cy="63" r="13"/><path d="M53 62Q61 57 69 62M28 60L21 55M95 60L102 54" fill="none"/></g>` +
        line("M34 56L42 52M76 55L81 52", "#3e3748", 1.6);
    }
    return {
      defs,
      viewBox: "0 0 120 120",
      family: "dots",
      body: plushBody(prefix, color, shape) + eyes + accessory,
    };
  }
  throw new Error("Unknown character artwork: " + id);
}
