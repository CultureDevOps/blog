export function isPostVisible(post: { draft?: boolean }, environment = process.env.VERCEL_ENV) {
  return post.draft !== true || environment === "preview"
}
