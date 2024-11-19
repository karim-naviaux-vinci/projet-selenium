import { Builder, By, until } from 'selenium-webdriver';

(async function testSearch () {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Ouvrir l'application
        await driver.get('http://localhost:5173'); // Remplacez par l'URL de votre application

        // Vérifier que la liste initiale contient tous les éléments
        const items = await driver.findElements(By.css('ul > li'));
        console.log('Liste initiale :');
        for (let item of items) {
            const text = await item.getText();
            console.log(text);
        }
        if (items.length !== 4) {
            throw new Error('La liste initiale ne contient pas les 4 éléments attendus.');
        }

        // Rechercher un terme valide
        const searchBar = await driver.findElement(By.css('input[type="text"]'));
        await searchBar.sendKeys('Pomme'); // entre la valeur "Pomme" dans la barre de recherche
        await driver.sleep(1000); // Attendre la mise à jour

        const filteredItems = await driver.findElements(By.css('ul > li'));
        console.log('\nRésultats après recherche pour "Pomme" :');
        for (let item of filteredItems) {
            const text = await item.getText();
            console.log(text);
        }
        if (filteredItems.length !== 1 || !(await filteredItems[0].getText()).includes('Pomme')) {
            throw new Error('La recherche pour "Pomme" ne retourne pas le bon résultat.');
        }

        // Tester une recherche sans résultat
        await searchBar.clear();
        await searchBar.sendKeys('Banane'); // Un élément qui n'existe pas
        await driver.sleep(1000);

        const noResults = await driver.findElements(By.css('ul > li'));
        console.log('\nRésultats après recherche pour "Banane" :', noResults.length);
        if (noResults.length !== 0) {
            throw new Error('La recherche pour "Banane" aurait dû retourner aucun résultat.');
        }

        console.log('\nTous les tests sont passés avec succès.');
    } catch (error) {
        console.error('Erreur lors des tests :', error);
    } finally {
        // Fermer le navigateur
        await driver.quit();
    }
})();
