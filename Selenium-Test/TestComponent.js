// exemple de test Selenium pour un composant React

import { Builder, By } from 'selenium-webdriver';

async function test() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:5173/');
        const titleElement = await driver.findElement(By.id('title'));
        const text = await titleElement.getText();

        if (text === 'Component') {
            console.log('Test passed');
        } else {
            console.log('Test failed');
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

// Lancer le test
test().catch(console.error);
