const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Interface pour lire les entrées utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

(async function amazonScraper() {
    let driver;

    // Demander la recherche à l'utilisateur
    rl.question('Entrez votre recherche : ', async (userQuery) => {
        try {
            // Configurer le navigateur
            driver = await new Builder()
                .forBrowser('chrome')
                //.setChromeOptions(new chrome.Options().headless()) // Désactiver pour déboguer visuellement
                .build();

            // Aller sur la page d'accueil d'Amazon
            await driver.get('https://www.amazon.fr');

            // Refuser les cookies
            await driver.wait(until.elementLocated(By.id('sp-cc-accept')), 10000);

            // Attendre et entrer la recherche
            await driver.wait(until.elementLocated(By.id('twotabsearchtextbox')), 10000);
            await driver.findElement(By.id('twotabsearchtextbox')).sendKeys(userQuery);
            await driver.findElement(By.id('nav-search-submit-button')).click();

            // Attendre les résultats
            await driver.wait(until.elementLocated(By.css('.s-search-results')), 10000);

            // Récupérer les produits
            let products = await driver.findElements(By.css('.s-card-container'));

            let productData = []; // Tableau pour stocker les données

            for (let product of products) {
                try {
                    // Récupérer le nom du produit
                    let name = await product.findElement(By.css('h2 a span')).getText();

                    // Récupérer le prix du produit
                    let price = 'Non disponible'; // Valeur par défaut
                    try {
                        // Premier sélecteur : Prix principal
                        let priceElement = await product.findElements(By.css('.a-price'));
                        if (priceElement.length > 0) {
                            price = await priceElement[0].getText();
                        } else {
                            // Deuxième sélecteur : Prix alternatif
                            let altPriceElement = await product.findElements(By.css('.s-price-instructions'));
                            if (altPriceElement.length > 0) {
                                console.log('Prix principal non trouvé pour', name);
                                price = await altPriceElement[0].getText();
                            }
                        }
                    } catch (priceError) {
                        console.error(`Erreur lors de la récupération du prix pour "${name}" :`, priceError.message);
                    }

                    // Ajouter le produit avec son prix dans le tableau
                    if (name) {
                        price = price.replace(/[\n]+/g, ',').trim(); // Nettoyer le prix
                        productData.push({ name, price });
                    }
                } catch (err) {
                    console.error('Erreur lors de la récupération du produit :', err.message);
                }
            }

            // Générer un fichier JSON
            const folderName = 'data-Products';
            const fileName = `products-${userQuery.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
            const filePath = path.join(folderName, fileName);

            // Créer le dossier si nécessaire
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }

            // Enregistrer les données dans un fichier JSON
            fs.writeFileSync(filePath, JSON.stringify(productData, null, 2), 'utf-8');
            console.log(`Les données ont été sauvegardées dans ${filePath}`);

        } catch (error) {
            console.error('Une erreur est survenue :', error.message);
        } finally {
            if (driver) {
                await driver.quit();
            }
            rl.close();
        }
    });
})();
