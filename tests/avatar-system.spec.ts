import { test, expect } from "@playwright/test";
test("gallery customization, exports and reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".character-card")).toHaveCount(12);
  await page.getByRole("button", { name: /Petal/ }).click();
  await page
    .getByRole("textbox", { name: "Agent name", exact: true })
    .fill("Planner");
  await page.getByRole("button", { name: "thinking", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "Planner, thinking" }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download SVG" }).click();
  expect((await download).suggestedFilename()).toBe("flower.svg");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".preview-stage .avatar-body")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page
    .getByRole("textbox", { name: "Search characters" })
    .fill("no-such-character");
  await expect(
    page.getByText("No characters found. Try another name."),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("agent customization persists and execution supports success and retry", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Workspace demo/ }).click();
  await page.getByRole("button", { name: "Customize", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Agent name", exact: true })
    .fill("Invoice Buddy");
  await page.getByRole("button", { name: "Flash", exact: true }).click();
  await page.getByRole("button", { name: "Save agent" }).click();
  await expect(
    page.getByRole("heading", { name: /Invoice Buddy/ }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /Workspace demo/ }).click();
  await expect(
    page.getByRole("heading", { name: /Invoice Buddy/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Activity", exact: true }).click();
  await page.getByRole("button", { name: "Run demo" }).click();
  await expect(page.locator(".execution-agent .mini-pill")).toHaveText(
    "success",
    { timeout: 10000 },
  );
  await expect(
    page.locator(".execution-steps p").filter({ hasText: "Complete" }),
  ).toHaveCount(4);
  await page.getByRole("button", { name: "Preview error state" }).click();
  await expect(page.locator(".execution-agent .mini-pill")).toHaveText(
    "error",
    { timeout: 10000 },
  );
  await page.getByRole("button", { name: "New", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Message your agent" })
    .fill("Plan an invoice agent");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/Demo complete/)).toBeVisible({ timeout: 10000 });
});
test("mobile layout stays inside viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "/workspace/scratch/svg-hubs-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Workspace demo/ }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
