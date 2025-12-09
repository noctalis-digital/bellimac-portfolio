### Contenu statique

Méta / header / contact : `src/config/siteContent.js`.
Le portfolio est désormais chargé via l'API backend (plus de `src/content_option.js`).

### Backend admin (Node/Express, CommonJS)

- Dossier : `/backend`, point d'entrée `server.cjs` (compatible Plesk).
- Dépendances : `cd backend && npm install`.
- Variables d'env (voir `/backend/.env.example`) :
  - `AWS_REGION` (eu-west-3), `AWS_S3_BUCKET` (bellimac.com), `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
  - `ADMIN_API_KEY` (jeton obligatoire pour POST/PUT/DELETE)
  - `ALLOWED_ORIGINS` (front/public autorisés), `AWS_PUBLIC_BASE_URL` (optionnel), `PORT` (par défaut 4000)
- Démarrage local : `cd backend && npm start`, interface admin sur `http://localhost:4000`.
- L'API `/api/portfolio` gère création, mise à jour, suppression et lecture des projets, en stockant JSON + médias sur S3.

### Deployment (GitHub Pages)

1. Go to this [page](https://github.com/noctalis-digital/bellimac-portfolio/actions/workflows/deploy.yml)
2. Click on "Run workflow" button
3. Select the branch to deploy (`main`)
4. Click on the green button "Run workflow"
5. Wait for the workflow to finish (1 minute)

### Local dev setup (front)

Install required dependencies

<pre>yarn install</pre>

Start the server

<pre>yarn start</pre>
