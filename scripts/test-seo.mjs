import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import {
  SITE_URL,
  localePath,
  blogPath,
  blogUrl,
  correspondingSlug,
  blogAlternates,
  pageAlternates,
} from "../lib/blogUrls.ts"

const frSlug = "gitlab-ci-python-sans-deploiement"
const enSlug = "gitlab-ci-python-tests-without-deployment"
const frPost = { slug: frSlug, language: "fr", draft: false }
const enPost = { slug: enSlug, language: "en", draft: false }
const posts = [frPost, enPost]
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")

assert.equal(localePath("fr"), "/")
assert.equal(localePath("en"), "/en")
assert.equal(localePath("fr", "blog"), "/blog")
assert.equal(localePath("en", "blog"), "/en/blog")
assert.equal(blogPath("fr", frSlug), `/blog/${frSlug}`)
assert.equal(blogPath("en", enSlug), `/en/blog/${enSlug}`)
assert.equal(blogUrl("fr", frSlug), `${SITE_URL}/blog/${frSlug}`)
assert.equal(correspondingSlug(frSlug, "en"), enSlug)
assert.equal(correspondingSlug(enSlug, "fr"), frSlug)
assert.equal(correspondingSlug("aws-s3-cloudfront-image-optimization", "en"), "aws-s3-cloudfront-image-optimization")
assert.deepEqual(blogAlternates(frPost, posts), blogAlternates(enPost, posts))
assert.equal(blogAlternates(frPost, posts).en, blogUrl("en", enSlug))
assert.deepEqual(blogAlternates(frPost, [frPost]), {})
assert.deepEqual(blogAlternates(frPost, [frPost, { ...enPost, draft: true }]), {})
assert.equal(pageAlternates("blog").fr, `${SITE_URL}/blog`)
assert.equal(pageAlternates("blog").en, `${SITE_URL}/en/blog`)

// The two articles are editorial equivalents, not duplicated English routes.
const fr = read(`data/blog/fr/${frSlug}.mdx`)
const en = read(`data/blog/en/${enSlug}.mdx`)
for (const [source, locale] of [[fr, "fr"], [en, "en"]]) {
  assert.match(source, new RegExp(`^language: ${locale}$`, "m"))
  assert.match(source, /^draft: false$/m)
  assert.match(source, /^date: "2026-11-01"$/m)
  assert.match(source, /^summary: ".{70,}"$/m)
  for (const filename of ["app.py", "test_app.py", ".gitlab-ci.yml"]) {
    assert.ok(source.includes(filename), `Missing ${filename} in ${locale}`)
  }
  assert.match(source, /https:\/\/docs.gitlab.com\/ci\/yaml\/workflow\//)
}
assert.notEqual(fr, en)

// The middleware must leave XML assets untouched; the site has one root sitemap.
assert.match(read("app/sitemap.ts"), /export default function sitemap/)
assert.match(read("app/robots.ts"), /\/sitemap.xml/)
assert.doesNotMatch(read("proxy.ts"), /\|sitemap\.xml/)
assert.match(read("scripts/rss.mjs"), /Object\.keys\(tagData\[locale\] \|\| \{\}\)/)
assert.doesNotMatch(read("components/share/index.tsx"), /targetSegment/)
console.log("OPS-011 bilingual routes, canonical links, translation and SEO source checks: OK")
