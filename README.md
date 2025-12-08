### Description

A simple portfolio template for developer/designers built with React. 

### [live preview](https://ubaimutl.github.io/react-portfolio/)

[![react portfoiio](src/assets/images/react%20portfolio%20gif.gif)](https://ubaimutl.github.io/react-portfolio/)

### Features

- Fully Responsive
- Multi-Page Layout
- Contact Form With EmailJs
- React-Bootstrap
- Edit Content From One Place

### Setup

Get the code

<pre>git clone https://github.com/ubaimutl/react-portfolio.git</pre>
 
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

### Thanks

If you like this portfolio template don't forget give it a ⭐ 
