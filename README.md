# Welcome to my blog dedicated to IT technologies and the DevOps culture!

Passionate about IT since I began my career in 2007 as a Cobol developer, I’ve had the opportunity to work on a wide variety of projects, exploring technologies such as Java, Oracle, Python, JavaScript, PHP, Docker, and many more. My journey as a self-taught professional has allowed me to develop a diverse expertise, ranging from full-stack development to system maintenance, including monitoring and performance optimization.

Since 2018, I have been particularly focused on the DevOps culture, an approach that aims to unify software development, deployment, and system monitoring. This blog is the result of my curiosity and passion for IT technologies.

My goal is to share with you practical tips, insights into best practices, and technical discoveries that I hope will enrich your own journey in this exciting field. Whether you are a developer, a systems engineer, or simply a curious mind, you will find resources and ideas here to fuel your thirst for knowledge.

Feel free to explore, comment, and contribute to this dialogue around IT technologies and DevOps culture!

## Tech Stack

This blog is hosted on [Vercel](https://vercel.com/), built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) using **Tailwind Nextjs Starter Blog**.

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url][![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

## Local development

Requirements: Node.js 22 or later (Node.js 24 recommended). Yarn 4.0.2 is included in the repository; no global Yarn installation is required.

```sh
node .yarn/releases/yarn-4.0.2.cjs install --immutable
node .yarn/releases/yarn-4.0.2.cjs dev
```

Open http://localhost:3000 for French or http://localhost:3000/en for English.

Copy `.env.example` to `.env.local` to configure external services. Without a CloudFront URL, images are loaded from `public/`. Article images excluded from Git must be synced separately if needed.

```sh
node .yarn/releases/yarn-4.0.2.cjs lint
node .yarn/releases/yarn-4.0.2.cjs typecheck
node .yarn/releases/yarn-4.0.2.cjs build
node .yarn/releases/yarn-4.0.2.cjs serve
```

The build generates Contentlayer articles, the search index, and RSS feeds. On a fresh clone, run an initial build before `typecheck`. Webpack remains enabled for Contentlayer and SVG loading. `start` is a development alias; `serve` runs the production build.

Lint still reports warnings for existing hydration effects; these can be refactored separately.

## Docker Compose (development)

With Docker Desktop running in Linux container mode:

```sh
docker compose up -d --build
docker compose logs -f blog
```

Open http://localhost:3000 (French) or http://localhost:3000/en (English). Source changes reload automatically. Next.js reads `.env.local`, if present, through the source bind mount. Restart the service after changing this file.

Dependencies, the Yarn cache, `.next`, and `.contentlayer` use separate Docker volumes to avoid reusing Windows native modules or caches. Dependencies are checked at each startup with `install --immutable`.

```sh
docker compose stop
docker compose down
```

These commands preserve dependency and cache volumes. If port 3000 is already in use, set `BLOG_PORT=3001` in `.env` before starting Compose.

To check a production build without interfering with the development server, stop it while running the checks:

```sh
docker compose stop blog
docker compose run --rm --no-deps blog sh -c "node .yarn/releases/yarn-4.0.2.cjs build && node .yarn/releases/yarn-4.0.2.cjs typecheck && node .yarn/releases/yarn-4.0.2.cjs lint"
docker compose up -d blog
```

### Using WSL2

Enable your distribution in Docker Desktop > Settings > Resources > WSL Integration. For better performance, keep the source files in the Linux filesystem, such as `~/projects/blog`, rather than under `/mnt/c`. See [Docker's WSL best practices](https://docs.docker.com/desktop/features/wsl/best-practices/).

You can extract the source archive into this Linux directory and use the same `docker compose` commands. No global Node.js or Yarn installation is required on the host. The project can also remain on the Windows drive and be accessed from WSL2 through `/mnt/c/Users/<username>/Documents/Codex/...`; enable Docker Desktop integration for the distribution you use.
