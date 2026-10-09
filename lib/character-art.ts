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
  const cream = "#e6d7c4",
    skin = "#efdcc9";
  let body = "",
    defs = "";
  const shell =
    "M38 139C23 131 25 115 27 89C18 64 29 37 52 31C73 21 102 24 120 40C135 53 137 76 131 91C141 112 139 132 124 141L124 162Q109 177 91 168L88 160L74 162Q64 177 43 168L39 151Z";
  if (id === "muse-punk") {
    defs = plushDefs(prefix, color, shell);
    body =
      plushBody(prefix, color, shell) +
      ellipse(80, 68, 31, 28, skin) +
      path(
        "M68 29L62 19L67 22L66 7L72 13L75 1L79 12L85 3L87 16L95 10L89 28Z",
        "#14648c",
      ) +
      path("M69 27L74 6L77 26L84 10L83 29Z", "#258ab6") +
      face(80, 66, 14, 2.8, true) +
      path("M40 95L61 85L68 136L42 151L24 113Z", "#26242a") +
      path("M101 86L122 94L139 119L123 151L94 137Z", "#26242a") +
      path("M56 89L65 95L56 112L72 139L49 127Z", "#38353e") +
      path("M102 88L93 96L103 111L88 141L112 126Z", "#38353e") +
      line("M51 96L42 140M111 99L119 139", "#a5a2a8", 1.5) +
      line(
        "M112 118L116 119L111 129L115 131L110 140L115 142L111 153L117 155L116 166",
        "#b3b3b8",
        1.5,
      ) +
      ellipse(28, 122, 10, 13, cream) +
      ellipse(133, 127, 9, 13, cream) +
      path("M42 157Q55 160 70 156L72 168Q61 180 42 171Z", "#cbb69e") +
      path("M94 159L124 156L123 172Q106 179 92 169Z", "#cbb69e");
    for (const [x, y] of [
      [37, 103],
      [34, 111],
      [41, 122],
      [120, 102],
      [127, 113],
      [118, 122],
      [56, 97],
      [103, 96],
    ])
      body += ellipse(x, y, 1.7, 1.7, "#d0cfd5");
  }
  if (id === "muse-pigeon") {
    const shape =
      "M35 134C22 110 24 81 39 62C31 33 47 19 76 21C105 18 126 44 117 72C133 97 132 121 119 140C97 154 54 156 35 134Z";
    defs = plushDefs(prefix, color, shape);
    body =
      path(
        "M53 143L50 164L39 168Q32 172 42 174L63 173L68 166L66 144Z",
        "#bf6523",
      ) +
      path(
        "M93 143L94 163L106 166Q119 174 108 176L86 175L81 166L81 145Z",
        "#bf6523",
      ) +
      plushBody(prefix, color, shape) +
      path(
        "M47 38Q40 13 54 14L64 24Q61 8 72 7L80 24Q94 9 102 20L91 32Z",
        "#8b8991",
      ) +
      path("M36 77Q18 95 30 126Q34 137 45 131L54 104Z", "#7c7d83") +
      path("M114 79Q140 101 124 133L110 126L101 102Z", "#797a81") +
      line("M29 98Q41 110 44 121M28 109L39 129M124 103L114 121", "#b1b0b4", 2) +
      `<g class="pal-eyes"><g class="pal-pupils">${ellipse(59, 58, 7, 8, "#28262b")}${ellipse(97, 54, 7, 8, "#28262b")}</g>${path("M51 52q8-9 16 2L67 57L51 55Z", "#a4a1a7")}${path("M88 48q8-8 17 1L105 54L88 52Z", "#a4a1a7")}</g>` +
      ellipse(77, 78, 14, 11, "#e79838") +
      path("M65 80Q77 94 90 77Q79 86 65 80Z", "#943c1f") +
      `<g class="pal-grin">${path("M66 78Q77 86 89 77Q84 92 76 91Q69 89 66 78Z", "#6d3624")}</g>`;
    for (let i = 0; i < 24; i++) {
      const x = 49 + ((i * 17) % 56),
        y = 98 + Math.floor(i / 6) * 10;
      body += line(`M${x} ${y}q-2 6 2 9`, "#ddd9da", 0.8);
    }
  }
  if (id === "muse-cowboy") {
    defs = plushDefs(prefix, color, shell);
    body =
      plushBody(prefix, color, shell) +
      ellipse(80, 64, 31, 28, skin) +
      face(80, 62, 15, 2.7, true) +
      path(
        "M33 45Q14 35 22 23Q40 40 57 28L57 11Q64-4 78 9Q91-2 103 9L112 29Q131 30 145 22Q153 39 131 46Q84 65 33 45Z",
        "#78331c",
      ) +
      path(
        "M55 30L57 14Q66 4 79 14Q94 5 101 15L110 31Q81 45 55 30Z",
        "#94451f",
      ) +
      path("M51 30Q80 40 114 29L118 38Q87 51 48 38Z", "#402721") +
      line("M59 36Q80 44 106 36", "#c89354", 1.5) +
      path("M43 96L63 85L71 137L48 145L39 130Z", "#5a3529") +
      path("M98 85L119 93L129 133L109 145L91 138Z", "#694131") +
      path("M48 84Q79 101 113 82L110 104L81 129L56 108Z", "#b52d29") +
      line(
        "M60 96L70 98M76 105L87 108M91 96L99 95M74 117L81 119",
        "#f4c3a3",
        1,
      ) +
      ellipse(39, 104, 11, 17, cream) +
      ellipse(126, 114, 10, 17, cream) +
      path("M48 143L111 141L116 152L44 153Z", "#482b20") +
      `<rect x="72" y="141" width="19" height="15" rx="4" fill="#c7923a"/>` +
      `<rect x="78" y="145" width="7" height="7" rx="2" fill="#926026"/>` +
      path("M43 154L70 155L71 169L61 186L37 185L37 176Z", "#3a2624") +
      path("M94 155L121 152L124 181L113 186L91 184L91 175Z", "#3a2624") +
      path("M43 165L65 166L60 179L38 179Z", "#62372b") +
      path("M99 164L117 163L118 178L96 179Z", "#62372b");
  }
  if (id === "muse-yeti") {
    const shape =
      "M34 145Q12 139 19 113L26 84Q15 65 31 47L41 39Q33 16 48 27Q61 5 71 22Q82 7 91 24Q105 8 111 34Q136 35 135 63L138 87Q153 113 134 136L128 147L124 166Q109 180 91 170L84 164L70 167Q56 181 38 169Z";
    defs = plushDefs(prefix, color, shape);
    body =
      plushBody(prefix, color, shape) +
      ellipse(81, 58, 26, 22, "#e9eeec") +
      face(81, 58, 13, 2.6, true) +
      path("M41 32L28 12Q20 4 18 18L22 34Q29 40 41 32Z", "#bf6881") +
      path("M41 32L52 10Q66 3 67 15L58 36Q50 41 41 32Z", "#d98da4") +
      ellipse(42, 31, 6, 6, "#ae526d") +
      line("M24 17L37 29M58 15L47 28", "#f5c6c9", 1.5);
    for (let i = 0; i < 55; i++) {
      const x = 31 + ((i * 23) % 96),
        y = 84 + Math.floor(i / 11) * 14;
      body += line(
        `M${x} ${y}q-5 9 -1 14q4-3 6-9`,
        i % 2 ? "#b9d8df" : "#edf3f2",
        2.2,
      );
    }
    body +=
      path("M41 157Q56 155 68 159L69 173L43 174Z", "#b7d6dc") +
      path("M95 157Q108 153 122 158L122 173L95 175Z", "#b7d6dc");
  }
  if (id === "muse-scientist") {
    const shape =
      "M39 140C22 116 27 86 34 76C24 63 36 31 52 29L52 14Q43-8 62 3L78 32L94 28L109 7Q126-4 125 15L117 50Q132 67 124 89L132 131Q128 151 115 154L118 170L97 175L91 162L68 162L62 174L42 172Z";
    defs = plushDefs(prefix, color, shape);
    body =
      plushBody(prefix, color, shape) +
      path("M55 31L55 12Q56 5 60 13L72 35Z", "#7c398f") +
      path("M100 34L114 14Q120 7 118 20L109 44Z", "#7c398f") +
      ellipse(80, 75, 25, 18, "#b679cc") +
      face(80, 74, 12, 2.2, true) +
      path("M34 95L57 90L70 117L68 157L40 158L23 127Z", "#f2f0eb") +
      path(
        "M101 88L120 97L140 125L126 139L114 124L121 157L90 159L89 119Z",
        "#e4e4e5",
      ) +
      path("M55 91L65 111L54 113L69 137L72 113Z", "#d8d8dd") +
      path("M99 91L89 114L97 137L110 109L101 108Z", "#c9cbd2") +
      line("M72 128L72 155", "#b5b7be", 1) +
      ellipse(75, 135, 1.6, 1.6, "#b0b2ba") +
      ellipse(75, 149, 1.6, 1.6, "#b0b2ba") +
      path("M100 126L114 125L115 141L101 142Z", "#cdced4") +
      line("M104 127L103 113M111 125L110 115", "#548472", 2) +
      ellipse(29, 122, 9, 11, color) +
      ellipse(133, 133, 8, 10, color) +
      path("M44 158L65 158L62 174L42 174Z", "#46264f") +
      path("M93 159L116 159L118 174L95 175Z", "#46264f") +
      `<g class="pal-accessory"><path d="M38 53Q77 40 121 53" fill="none" stroke="#34313a" stroke-width="7"/><ellipse cx="59" cy="48" rx="14" ry="10" fill="#322c3b" stroke="#99939f" stroke-width="3"/><ellipse cx="101" cy="46" rx="14" ry="10" fill="#322c3b" stroke="#99939f" stroke-width="3"/>${line("M54 44L62 41M96 42L103 40", "#a397b3", 2)}</g>` +
      `<g class="pal-prop"><path d="M22 97L19 70L16 70L16 65L30 64L30 69L27 70L30 96Q28 104 22 97Z" fill="#d0dfdf" stroke="#839496" stroke-width="1.2"/><path d="M21 83L27 82L29 95Q26 101 23 96Z" fill="#80c959"/>${ellipse(24, 89, 1, 1, "#cfecb4")}</g>`;
  }
  return { defs, body, viewBox: "0 0 160 190", family: "muse" };
}
