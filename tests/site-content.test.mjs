import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
const srcDirectory = fileURLToPath(new URL("../src", import.meta.url));

before(async () => {
  vite = await createServer({
    appType: "custom",
    configFile: false,
    plugins: [react()],
    resolve: { alias: { "@": srcDirectory } },
    server: { hmr: false, middlewareMode: true },
  });
});

after(async () => {
  await vite.close();
});

test("removed residents are excluded from published participant data", async () => {
  const residency = await vite.ssrLoadModule("/src/lib/residency.ts");
  const selectPublishedResidents = residency.selectPublishedResidents;

  assert.equal(
    typeof selectPublishedResidents,
    "function",
    "resident data must expose its publication selector",
  );

  const residents = [
    { participant_code: "RES-001", full_name: "Scofield" },
    { participant_code: "RES-002", full_name: "Mustapha QAUNT" },
    { participant_code: "res-004", full_name: "IKE" },
    { participant_code: "RES-006", full_name: "Gwill" },
    { participant_code: "RES-009", full_name: "Dark Blanche" },
  ];

  assert.deepEqual(
    selectPublishedResidents(residents).map((resident) => resident.participant_code),
    ["RES-002"],
  );
});

test("the YouTube section links to the channel without rendering a player", async () => {
  const { Livestream } = await vite.ssrLoadModule("/src/components/site/Livestream.tsx");
  const html = renderToStaticMarkup(React.createElement(Livestream));

  assert.match(html, /href="https:\/\/www\.youtube\.com\/@ZOERDHubTV"/);
  assert.doesNotMatch(html, /<iframe/);
});

test("the hero uses the canonical YouTube channel instead of a configured live URL", async () => {
  const { Hero } = await vite.ssrLoadModule("/src/components/site/Hero.tsx");
  const html = renderToStaticMarkup(
    React.createElement(Hero, {
      config: { livestream_url: "https://www.youtube.com/watch?v=old-stream" },
    }),
  );

  assert.match(html, /href="https:\/\/www\.youtube\.com\/@ZOERDHubTV"/);
  assert.doesNotMatch(html, /old-stream/);
});
