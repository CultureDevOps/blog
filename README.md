# Welcome to my blog dedicated to IT technologies and the DevOps culture!

Passionate about IT since I began my career in 2007 as a Cobol developer, I’ve had the opportunity to work on a wide variety of projects, exploring technologies such as Java, Oracle, Python, JavaScript, PHP, Docker, and many more. My journey as a self-taught professional has allowed me to develop a diverse expertise, ranging from full-stack development to system maintenance, including monitoring and performance optimization.

Since 2018, I have been particularly focused on the DevOps culture, an approach that aims to unify software development, deployment, and system monitoring. This blog is the result of my curiosity and passion for IT technologies.

My goal is to share with you practical tips, insights into best practices, and technical discoveries that I hope will enrich your own journey in this exciting field. Whether you are a developer, a systems engineer, or simply a curious mind, you will find resources and ideas here to fuel your thirst for knowledge.

Feel free to explore, comment, and contribute to this dialogue around IT technologies and DevOps culture!

## Tech Stack

This blog is hosted on [Vercel](https://vercel.com/), built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) using **Tailwind Nextjs Starter Blog**.

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url][![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

## Développement local

Prérequis : Node.js 22 ou plus récent (Node.js 24 recommandé). Yarn 4.0.2 est fourni dans le dépôt ; aucune installation globale de Yarn n'est nécessaire.

```sh
node .yarn/releases/yarn-4.0.2.cjs install --immutable
node .yarn/releases/yarn-4.0.2.cjs dev
```

Ouvrir http://localhost:3000 pour le français et http://localhost:3000/en pour l'anglais.

Copier `.env.example` vers `.env.local` pour configurer les services externes. Sans URL CloudFront, les images sont chargées depuis `public/`. Les images d'articles exclues de Git doivent être synchronisées séparément si nécessaire.

```sh
node .yarn/releases/yarn-4.0.2.cjs lint
node .yarn/releases/yarn-4.0.2.cjs typecheck
node .yarn/releases/yarn-4.0.2.cjs build
node .yarn/releases/yarn-4.0.2.cjs serve
```

La compilation génère les articles Contentlayer, l'index de recherche et les flux RSS. Lancer une première compilation avant `typecheck` sur un clone neuf. Webpack reste activé pour Contentlayer et le chargement des SVG. `start` reste un alias de développement ; `serve` lance la version compilée.

Le lint conserve les avertissements sur les effets d'hydratation existants ; leur refonte peut être traitée séparément.

## Docker Compose (développement)

Avec Docker Desktop démarré en mode conteneurs Linux :

```sh
docker compose up -d --build
docker compose logs -f blog
```

Ouvrir http://localhost:3000 (français) ou http://localhost:3000/en (anglais). Les modifications des sources sont prises en compte automatiquement. `.env.local`, s'il existe, est lu par Next.js à travers le montage des sources. Redémarrer le service après avoir modifié ce fichier.

Les dépendances, le cache Yarn, `.next` et `.contentlayer` utilisent des volumes Docker distincts pour éviter de réutiliser les modules natifs ou les caches Windows. Les dépendances sont vérifiées à chaque démarrage avec `install --immutable`.

```sh
docker compose stop
docker compose down
```

Ces commandes conservent les volumes de dépendances et de caches. Si le port 3000 est occupé, définir `BLOG_PORT=3001` dans `.env` avant de lancer Compose.

Pour vérifier une compilation de production sans perturber le serveur de développement, l'arrêter pendant les contrôles :

```sh
docker compose stop blog
docker compose run --rm --no-deps blog sh -c "node .yarn/releases/yarn-4.0.2.cjs build && node .yarn/releases/yarn-4.0.2.cjs typecheck && node .yarn/releases/yarn-4.0.2.cjs lint"
docker compose up -d blog
```

### Utilisation depuis WSL2

Activer l'intégration de sa distribution dans Docker Desktop > Settings > Resources > WSL Integration. Pour de meilleures performances, conserver les sources dans le système de fichiers Linux, par exemple `~/projects/blog`, plutôt que sous `/mnt/c`. Référence : https://docs.docker.com/desktop/features/wsl/best-practices/

L'archive des sources mise à jour peut être extraite directement dans ce dossier Linux, puis les mêmes commandes `docker compose` s'appliquent. Aucun Node.js ni Yarn global n'est nécessaire sur l'hôte. Le projet peut aussi rester sur le disque Windows et être utilisé depuis WSL2 via `/mnt/c/Users/<utilisateur>/Documents/Codex/...` ; activer l'intégration Docker Desktop pour la distribution utilisée.
