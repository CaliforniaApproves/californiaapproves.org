FROM mcr.microsoft.com/devcontainers/typescript-node:24

USER node

# Install Chromium's system dependencies so Playwright can render screenshots.
# `playwright install-deps chromium` is the official, self-maintaining apt list
# (libnspr4, libnss3, libatk*, libgbm1, libcups2, libdrm2, ...). These libraries
# are stable across Playwright versions; the browser binary itself is installed
# by the devcontainer postCreateCommand (`playwright install chromium`) so it
# always matches the @playwright/test version in package.json. Running the same
# install-deps here as in CI keeps font/render parity identical between the
# devcontainer and the GitHub Actions run.
# apt needs root; the base image grants the node user passwordless sudo.
RUN sudo npx --yes playwright@1.61.0 install-deps chromium

# This installs the latest chromium-headless-shell binary. If you get
# errors about the missing executable, try an `npm update` to get the
# latest @playwright/test version, then rebuild the devcontainer.
RUN npx playwright install chromium-headless-shell
