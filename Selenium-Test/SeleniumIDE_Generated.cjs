const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('testdl', function() {
  this.timeout(30000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('testdl', async function() {
    await driver.get("http://localhost:5173/");
    await driver.manage().window().setRect({ width: 870, height: 1028 });
    await driver.findElement(By.id("dl")).click();
    
    // Attendez que le titre de la page soit "Vite + React" (ou tout autre titre réel)
    await driver.wait(until.titleIs('Vite + React'), 10000); // Attente du titre pendant 10 secondes
    
    // Vérifiez le titre de la page
    const pageTitle = await driver.getTitle();
    console.log('Le titre de la page est :', pageTitle); // Affiche le titre pour vérification
    assert.strictEqual(pageTitle, 'Vite + React');  // Remplacez par le titre réel de la page
  });
});
