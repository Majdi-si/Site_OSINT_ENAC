FROM node:18-alpine

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration Node.js
COPY package.json ./

# Installer les dépendances
RUN npm install --production

# Copier le serveur backend
COPY server.js ./

# Copier tous les fichiers du site
COPY index.html ./
COPY admin.html ./
COPY admin-dashboard.html ./
COPY a-propos.html ./
COPY contact.html ./
COPY equipe.html ./
COPY services.html ./
COPY mentions-legales.html ./
COPY robots.txt ./
COPY sitemap.xml ./
COPY assets/ ./assets/

# Exposer le port du serveur Node.js
EXPOSE 3000

# Variable d'environnement pour la production
ENV NODE_ENV=production

# Démarrer le serveur Node.js
CMD ["node", "server.js"]
