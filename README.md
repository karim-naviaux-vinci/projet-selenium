# Project Documentation

Ce projet contient trois dossiers principaux : `Selenium-Scraper`, `Selenium-Test`, et `WebApp`. Chaque dossier a des dépendances spécifiques qui doivent être installées pour fonctionner correctement. Voici les instructions pour installer les dépendances et configurer le projet.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version recommandée : LTS)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)
- Un navigateur compatible (exemple : Google Chrome)

---

## Installation des dépendances

### 1. Selenium-Scraper

1. Naviguez vers le dossier `Selenium-Scraper` :
   ```bash
   cd Selenium-Scraper
   ```
2. Installez les dépendances :
   ```bash
   npm install selenium-webdriver
   ```

### 2. Selenium-Test

1. Naviguez vers le dossier `Selenium-Test` :
   ```bash
   cd Selenium-Test
   ```
2. Installez les dépendances :
   ```bash
   npm install selenium-webdriver
   ```

### 3. WebApp

1. Naviguez vers le dossier `WebApp` :
   ```bash
   cd WebApp
   ```
2. Installez les dépendances de base :
   ```bash
   npm install
   ```

---

## Configuration du WebDriver

Pour utiliser Selenium, vous devez installer un WebDriver correspondant au navigateur que vous utilisez. Voici les étapes pour installer ChromeDriver (compatible avec Google Chrome) :

### 1. Téléchargez ChromeDriver

1. Accédez à la page de téléchargement de ChromeDriver :
   [https://chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)
2. Choisissez la version qui correspond à la version de Google Chrome installée sur votre machine.
3. Téléchargez et extrayez le fichier dans un répertoire accessible (par exemple : `C:\webdriver` sur Windows ou `/usr/local/bin` sur Linux/Mac).

### 2. Ajoutez ChromeDriver à votre PATH

#### Sous Windows :

1. Ouvrez le Panneau de configuration.
2. Accédez à **Système > Paramètres avancés du système**.
3. Cliquez sur **Variables d'environnement**.
4. Dans la section **Variables système**, recherchez la variable `Path` et cliquez sur **Modifier**.
5. Ajoutez le chemin vers le dossier contenant `chromedriver.exe`.
6. Cliquez sur **OK** pour valider.

#### Sous Linux/Mac :

Ajoutez le chemin de ChromeDriver à votre variable `PATH` dans le fichier `~/.bashrc` (ou `~/.zshrc` si vous utilisez Zsh) :

```bash
export PATH=$PATH:/chemin/vers/chromedriver
```

Appliquez les modifications :

```bash
source ~/.bashrc
```

### 3. Vérifiez l'installation

Pour confirmer que ChromeDriver est correctement installé, exécutez la commande suivante dans un terminal :

```bash
chromedriver --version
```

Vous devriez voir une sortie indiquant la version de ChromeDriver.

---

## Exécution du projet

Une fois toutes les dépendances installées et le WebDriver configuré, vous pouvez exécuter les différents scripts et tests Selenium ou démarrer l'application Web selon vos besoins.

