import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { setTimeout as sleep } from "node:timers/promises"

const base = "http://127.0.0.1:31981"
const site = "https://culturedevops.com"
const fr = "/blog/gitlab-ci-python-sans-deploiement"
const en = "/en/blog/gitlab-ci-python-tests-without-deployment"
const child = spawn("yarn", ["serve", "-p", "31981"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: "31981", VERCEL_ENV: "production" },
})
let output = ""
child.stdout.on("data", (chunk) => (output += chunk.toString()))
child.stderr.on("data", (chunk) => (output += chunk.toString()))

async function request(path, follow = true) {
  const response = await fetch(base + path, { redirect: follow ? "follow" : "manual" })
  return { response, body: await response.text() }
}
try {
  let ready = false
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) break
    try {
      const check = await fetch(base + "/robots.txt")
      if (check.ok) { ready = true; break }
    } catch {}
    await sleep(500)
  }
  assert.ok(ready, `Next.js server did not start: ${output}`)

  for (const [path, locale, titleMarker] of [
    [fr, "fr", "GitLab CI/CD"],
    [en, "en", "GitLab CI/CD"],
  ]) {
    const { response, body } = await request(path)
    assert.equal(response.status, 200, `GET ${path}`)
    assert.match(body, new RegExp(`<html[^>]+lang="${locale}"`))
    assert.ok(body.includes(titleMarker))
    assert.ok(body.includes(`rel="canonical" href="${site}${path}"`), `canonical ${path}`)
    assert.ok(body.includes(`hrefLang="fr" href="${site}${fr}"`), `FR hreflang ${path}`)
    assert.ok(body.includes(`hrefLang="en" href="${site}${en}"`), `EN hreflang ${path}`)
    assert.ok(body.includes(`property="og:url" content="${site}${path}"`), `OG URL ${path}`)
    assert.ok(body.includes('name="twitter:card" content="summary_large_image"'))
    assert.ok(body.includes('"@type":"BlogPosting"'))
    assert.ok(body.includes(`"url":"${site}${path}"`))
    assert.ok(!body.includes("/fr/fr/"), `Broken share link on ${path}`)
    assert.ok(body.includes(encodeURIComponent(`${site}${path}`)), `Share link ${path}`)
  }

  const redirected = await request("/fr" + fr, false)
  assert.ok([301, 302, 307, 308].includes(redirected.response.status), "French locale should redirect")
  assert.equal(new URL(redirected.response.headers.get("location"), base).pathname, fr)
  assert.equal((await request("/en/blog/gitlab-ci-python-sans-deploiement")).response.status, 404)
  assert.equal((await request("/en/blog")).response.status, 200)

  const xml = await request("/sitemap.xml")
  assert.equal(xml.response.status, 200, "root sitemap")
  assert.match(xml.body, /<urlset/)
  assert.ok(xml.body.includes(site + fr))
  assert.ok(xml.body.includes(site + en))
  assert.ok(!xml.body.includes("/fr/fr/"))
  assert.ok(!xml.body.includes(site + "/fr/blog/"))
  const urls = [...xml.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, new Set(urls).size, "unique canonical loc values")

  const robots = await request("/robots.txt")
  assert.equal(robots.response.status, 200)
  assert.ok(robots.body.includes(site + "/sitemap.xml"))

  for (const [locale, slug] of [["fr", "gitlab-ci-python-sans-deploiement"], ["en", "gitlab-ci-python-tests-without-deployment"]]) {
    const feed = await request(`/${locale}/feed.xml`)
    assert.equal(feed.response.status, 200, `${locale} RSS`)
    assert.ok(feed.body.includes(slug))
    const tag = await request(`/${locale}/tags/gitlab/feed.xml`)
    assert.equal(tag.response.status, 200, `${locale} tag RSS`)
    assert.ok(tag.body.includes(slug))
    const index = await request("/search.json")
    assert.equal(index.response.status, 200)
    assert.ok(index.body.includes(slug), `Search index includes ${locale}`)
  }
  console.log("OPS-011 built site SEO, redirections, metadata, sitemap, sharing, feeds, and search: OK")
} finally {
  child.kill("SIGTERM")
}
