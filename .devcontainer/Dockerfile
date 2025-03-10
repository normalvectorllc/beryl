FROM mcr.microsoft.com/devcontainers/javascript-node:16

# Install additional OS packages and global tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git-core curl build-essential \
    && npm install -g npm@8.19.4 \
    && npm install -g yarn \
    && npm install -g pnpm

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
