import fs from "fs";
import path from "path";
import colors from "css-color-names";
import { ElementHandle } from "playwright-chromium";

export function slash(p: string): string {
  return p.replace(/\\/g, "/");
}

export const isBuild = !!process.env.VITE_TEST_BUILD;

export const testPath = path.resolve(__dirname + "/..");

const hexToNameMap: Record<string, string> = {};
Object.keys(colors).forEach((color) => {
  hexToNameMap[colors[color]] = color;
});

const timeout = (n: number) => new Promise((r) => setTimeout(r, n));

async function toEl(el: string | ElementHandle): Promise<ElementHandle> {
  if (typeof el === "string") {
    return await page.$(el);
  }
  return el;
}

export async function getBg(el: string | ElementHandle) {
  el = await toEl(el);
  return el.evaluate((el) => getComputedStyle(el as Element).backgroundImage);
}

export function readFile(filename: string) {
  return fs.readFileSync(path.resolve(testPath, filename), "utf-8");
}

export function editFile(
  filename: string,
  replacer: (str: string) => string,
  runInBuild: boolean = false
): void {
  if (isBuild && !runInBuild) return;
  filename = path.resolve(testPath, filename);
  const content = fs.readFileSync(filename, "utf-8");
  const modified = replacer(content);
  fs.writeFileSync(filename, modified);
}

export function addFile(filename: string, content: string) {
  fs.writeFileSync(path.resolve(testPath, filename), content);
}

export function removeFile(filename: string) {
  fs.unlinkSync(path.resolve(testPath, filename));
}

export function listAssets(base = "") {
  const assetsDir = path.join(testPath, "dist", base, "assets");
  return fs.readdirSync(assetsDir);
}

export function findAssetFile(match: string | RegExp, base = "") {
  const assetsDir = path.join(testPath, "dist", base, "assets");
  const files = fs.readdirSync(assetsDir);
  const file = files.find((file) => {
    return file.match(match);
  });
  return file ? fs.readFileSync(path.resolve(assetsDir, file), "utf-8") : "";
}

export function readManifest(base = "") {
  return JSON.parse(
    fs.readFileSync(path.join(testPath, "dist", base, "manifest.json"), "utf-8")
  );
}

/**
 * Poll a getter until the value it returns includes the expected value.
 */
export async function untilUpdated(
  poll: () => string | Promise<string>,
  expected: string,
  runInBuild = false
) {
  if (isBuild && !runInBuild) return;
  const maxTries = process.env.CI ? 100 : 50;
  for (let tries = 0; tries < maxTries; tries++) {
    let actual = (await poll()) || "";
    if (actual.indexOf(expected) > -1 || tries === maxTries - 1) {
      expect(actual).toMatch(expected);
      break;
    } else {
      await timeout(50);
    }
  }
}

/**
 * Send the rebuild complete message in build watch
 */
export { notifyRebuildComplete } from "./test-setup";
