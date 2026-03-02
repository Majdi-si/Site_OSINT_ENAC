const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(__dirname));

// ==========================================
// ENDPOINT DE LOGIN (identifiants cachés côté serveur)
// ==========================================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Identifiants stockés côté serveur (invisibles depuis le navigateur)
  const validUsername = 'M-berthelot';
  const validPassword = 'maverick';
  
  if (username === validUsername && password === validPassword) {
    res.json({ 
      success: true, 
      message: 'Authentification réussie',
      user: username 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Identifiants incorrects' 
    });
  }
});

// Route pour vérifier que le serveur fonctionne
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur OSINT ENAC actif' });
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur http://0.0.0.0:${PORT}`);
  console.log(`📂 Fichiers statiques servis depuis: ${__dirname}`);
});
