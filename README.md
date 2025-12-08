### Setup

Install required dependencies

<pre>yarn install</pre>


Start the server

<pre>yarn start</pre>

### Deployment (GitHub Pages)

1. Ensure GitHub Pages is enabled in the repository settings with **GitHub Actions** as the source.
2. The workflow in `.github/workflows/deploy.yml` builds the React app with Yarn, adds a `404.html` fallback, and deploys the `build` directory to Pages on every push to the `work` branch (or via a manual run).
3. If you use a different default branch, update the `branches` list in the workflow accordingly.

### More

Modify pages content in  `src/content_option.js`.
