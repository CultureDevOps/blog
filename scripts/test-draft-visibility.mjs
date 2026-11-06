import assert from "node:assert/strict"
import { isPostVisible } from "../lib/postVisibility.ts"

for (const environment of ["production", "development", "", "custom"]) {
  assert.equal(isPostVisible({ draft: true }, environment), false)
  assert.equal(isPostVisible({ draft: false }, environment), true)
  assert.equal(isPostVisible({}, environment), true)
}
assert.equal(isPostVisible({ draft: true }, "preview"), true)
console.log("Draft visibility: Preview allowed; other environments denied")
