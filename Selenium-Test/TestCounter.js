import { Builder, By, until } from "selenium-webdriver";



async function testCounter() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Accéder à l'application
    await driver.get("http://localhost:5173/");

    // Vérification de la valeur initiale
    const counterValue = await driver.findElement(By.id("counter-value")).getText();
    if (counterValue !== "0") {
      console.error("Erreur : Le compteur initial n'est pas correct");
    }

    // Test de l'incrémentation
    const incrementButton = await driver.findElement(By.id("increment-btn"));
    await incrementButton.click();
    const incrementedValue = await driver.findElement(By.id("counter-value")).getText();
    if (incrementedValue !== "1") {
      console.error("Erreur : L'incrémentation n'a pas fonctionné");
    }

    // Test de la décrémentation
    const decrementButton = await driver.findElement(By.id("decrement-btn"));
    await decrementButton.click();
    const decrementedValue = await driver.findElement(By.id("counter-value")).getText();
    if (decrementedValue !== "0") {
      console.error("Erreur : La décrémentation n'a pas fonctionné");
    }

    // Test de la réinitialisation
    await incrementButton.click(); // Incrémente à 1
    const resetButton = await driver.findElement(By.id("reset-btn"));
    await resetButton.click();
    const resetValue = await driver.findElement(By.id("counter-value")).getText();
    if (resetValue !== "0") {
      console.error("Erreur : La réinitialisation n'a pas fonctionné");
    }
  } catch (error) {
    console.error("Erreur pendant le test :", error);
  } finally {
    await driver.quit();
  }
}

testCounter().catch(console.error);

