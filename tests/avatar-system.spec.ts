import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
test("one canvas has twelve automatically animated characters and exports their animation", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Originals 12", exact: true }).click();
  await expect(page.locator(".canvas-character")).toHaveCount(12);
  await expect(
    page.getByRole("button", { name: "thinking", exact: true }),
  ).toHaveCount(0);
  for (const el of await page.locator(".pal-pupils").all())
    expect(await el.evaluate((e) => getComputedStyle(e).animationName)).toBe(
      "pal-look",
    );
  await page.getByRole("button", { name: "Select Petal", exact: true }).click();
  await expect(page.locator(".selected-caption h2")).toContainText("Petal");
  await page
    .getByRole("button", { name: "Set color #29B8ED", exact: true })
    .click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save SVG", exact: true }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe("flower-animated.svg");
  const svg = await readFile((await file.path())!, "utf8");
  expect(svg).toContain('fill="#29B8ED"');
  expect(svg).toContain("@keyframes pal-look");
  expect(svg).toContain("@keyframes pal-blink");
  expect(svg).toContain("@keyframes pal-grin");
  expect(svg).toContain("prefers-reduced-motion");
  expect(svg).not.toContain("<script");
  await page.getByRole("button", { name: "Copy SVG", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(svg);
  expect(errors).toEqual([]);
});
test("gaze visits every direction and smiling changes the face", async ({
  page,
}) => {
  await page.goto("/");
  const directions = await page
    .locator(".canvas-character")
    .first()
    .evaluate((el) => {
      const pupils = el.querySelector(".pal-pupils")!;
      const motion = pupils.getAnimations()[0];
      motion.pause();
      return [0, 2000, 4200, 6500, 9000].map((t) => {
        motion.currentTime = t;
        const transform = getComputedStyle(pupils).transform;
        const matrix = new DOMMatrix(transform);
        return { x: matrix.m41, y: matrix.m42 };
      });
    });
  expect(directions[1].x).toBeGreaterThan(2);
  expect(directions[2].x).toBeLessThan(-2);
  expect(directions[3].y).toBeLessThan(-2);
  expect(directions[4].y).toBeGreaterThan(2);
  const smile = await page
    .locator(".pal-grin")
    .first()
    .evaluate((el) => {
      const motion = el.getAnimations()[0];
      motion.pause();
      motion.currentTime = 11500;
      return getComputedStyle(el).opacity;
    });
  expect(Number(smile)).toBeGreaterThan(0.9);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of [".pal-body", ".pal-eyes", ".pal-pupils", ".pal-grin"])
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
});
test("every standalone export includes motion; mobile stays on the canvas", async ({
  page,
  request,
}) => {
  for (const id of [
    "bubble",
    "spark",
    "heart",
    "flower",
    "squish",
    "star",
    "hand",
    "cloud",
    "burst",
    "chat",
    "arrow",
    "bolt",
    "grok-cloud",
    "grok-orb",
    "grok-amber",
    "grok-violet",
    "grok-sun",
    "grok-cube",
    "grok-hex",
    "grok-teal",
    "dot-beret",
    "dot-frog",
    "dot-scholar",
    "dot-heart",
    "muse-punk",
    "muse-pigeon",
    "muse-cowboy",
    "muse-yeti",
    "muse-scientist",
  ]) {
    const response = await request.get(`/avatars/${id}.svg`);
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("@keyframes pal-look");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Originals 12", exact: true }).click();
  await expect(page.locator(".canvas-character")).toHaveCount(12);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Select Flash" }).click();
  await expect(page.locator(".selected-caption h2")).toContainText("Flash");
  await page.screenshot({
    path: "/workspace/scratch/canvas-mobile.png",
    fullPage: true,
  });
});

test("all four families render their artwork, animate and export valid SVGs", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  for (const [family, count, last] of [
    ["Dots", 4, "Velvet"],
    ["Muse", 5, "Professor"],
    ["Grok Bots", 8, "Tide"],
    ["Originals", 12, "Flash"],
  ] as const) {
    await page
      .getByRole("button", { name: `${family} ${count}`, exact: true })
      .click();
    await expect(page.locator(".canvas-character")).toHaveCount(count);
    const ids = await page
      .locator(".canvas-characters [id]")
      .evaluateAll((elements) => elements.map((e) => e.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const el of await page.locator(".pal-pupils").all())
      expect(await el.evaluate((e) => getComputedStyle(e).animationName)).toBe(
        "pal-look",
      );
    await page
      .getByRole("button", { name: `Select ${last}`, exact: true })
      .click();
    await page.getByRole("button", { name: "Copy SVG", exact: true }).click();
    const markup = await page.evaluate(() => navigator.clipboard.readText());
    expect(
      await page.evaluate(
        (s) =>
          new DOMParser()
            .parseFromString(s, "image/svg+xml")
            .querySelector("parsererror") === null,
        markup,
      ),
    ).toBe(true);
    expect(markup).toContain("pal-grin");
  }
  await page.getByRole("button", { name: "Muse 5", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".pal-body")
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [family, count] of [
    ["Dots", 4],
    ["Muse", 5],
    ["Grok Bots", 8],
    ["Originals", 12],
  ] as const) {
    await page
      .getByRole("button", { name: `${family} ${count}`, exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".canvas-character")).toHaveCount(count);
  }
  expect(errors).toEqual([]);
});
