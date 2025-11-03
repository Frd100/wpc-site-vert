# Guide d'Installation

## Prérequis

Vous devez avoir Node.js installé (version 18 ou supérieure recommandée).

### Installer Node.js

**Sur macOS** (avec Homebrew) :
```bash
brew install node
```

**Sur macOS** (sans Homebrew) :
- Télécharger depuis https://nodejs.org/
- Installer le fichier `.pkg`

**Sur Linux** :
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Ou avec nvm (recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Vérifier l'installation** :
```bash
node --version  # Doit afficher v18.x.x ou supérieur
npm --version   # Doit afficher 9.x.x ou supérieur
```

## Installation du projet

Une fois Node.js installé :

```bash
# Dans le dossier du projet
cd /Users/farid/Documents/wpc-site-astro

# Installer les dépendances
npm install
```

## Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Dépannage

### Erreur "command not found: npm"
- Vérifiez que Node.js est installé : `node --version`
- Si Node.js est installé mais npm non trouvé, réinstallez Node.js

### Erreur "EACCES" ou permissions
```bash
# Sur macOS/Linux, vous pouvez utiliser nvm pour éviter les problèmes de permissions
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Port déjà utilisé
```bash
# Astro utilise le port 4321 par défaut
# Vous pouvez le changer dans astro.config.mjs
```

