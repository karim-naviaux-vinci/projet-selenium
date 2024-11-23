const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

(async function testDownload() {
    const nameDirectory = './dlSound';
    // Créer le dossier de téléchargement si nécessaire
    if (!fs.existsSync(nameDirectory)) {
        fs.mkdirSync(nameDirectory);
    }
    const downloadDir = path.resolve(nameDirectory);

    const chromeOptions = new chrome.Options();
    chromeOptions.setUserPreferences({
        'download.default_directory': downloadDir, // Spécifie le répertoire de téléchargement
        'download.prompt_for_download': false, // Désactive le prompt de téléchargement
        'profile.default_content_settings.popups': 0, // Empêche les popups
        'directory_upgrade': true // Permet d'écraser les fichiers existants
    });
    
    // Créer le driver avec les options par défaut de Chrome
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions) // Configuration des préférences de téléchargement
        .build();

    try {
        // Étape 1 : Naviguer vers la page contenant le lien
        await driver.get('http://localhost:5173/'); // Exemple de lien de téléchargement

        // Étape 2 : Attendre que le lien soit cliquable et cliquer sur le bouton
        const downloadButton = await driver.findElement(By.xpath("(//button[contains(text(), 'Download')])[1]"));
        await downloadButton.click();

        // Étape 3 : Vérifier que le bouton a été cliqué
        console.log('Le bouton de téléchargement a été cliqué avec succès.');

        // Étape 4 : Attendre que le fichier soit téléchargé
        const fileName = '_src_assets_sound.wav';
        const filePath = path.join(downloadDir, fileName);

        const waitForDownload = async () => {
            return new Promise((resolve, reject) => {
                const check = () => {
                    if (fs.existsSync(filePath) && !filePath.endsWith('.tmp')) {
                        resolve('Fichier téléchargé avec succès!');
                    } else {
                        setTimeout(check, 1000); // Vérification toutes les secondes
                    }
                };
                check();
            });
        };

        // Exécuter la vérification
        const result = await waitForDownload();
        console.log(result);

    } catch (error) {
        console.error('Erreur pendant le test :', error);
    } finally {
        await driver.quit();
    }
})();
