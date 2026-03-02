FROM docker.io/library/nginx:alpine

# Supprimer le contenu par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier la config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier tous les fichiers du site
COPY index.html /usr/share/nginx/html/
COPY admin.html /usr/share/nginx/html/
COPY admin-dashboard.html /usr/share/nginx/html/
COPY a-propos.html /usr/share/nginx/html/
COPY contact.html /usr/share/nginx/html/
COPY equipe.html /usr/share/nginx/html/
COPY services.html /usr/share/nginx/html/
COPY mentions-legales.html /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
