FROM node:24-bookworm-slim
WORKDIR /app

# Cache dependencies independently of application sources.
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases/ .yarn/releases/
RUN node .yarn/releases/yarn-4.0.2.cjs install --immutable

COPY . .
EXPOSE 3000
CMD ["node", ".yarn/releases/yarn-4.0.2.cjs", "dev", "--hostname", "0.0.0.0"]
