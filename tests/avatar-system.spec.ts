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
  ]) {
    const response = await request.get(`/avatars/${id}.svg`);
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("@keyframes pal-look");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
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
