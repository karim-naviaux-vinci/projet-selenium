import { Builder, By, until } from "selenium-webdriver";

async function testCounter() {
  console.log("Démarrage du test Counter...");

  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Accès à l'application
    console.log("Accès à l'application à l'adresse http://localhost:5173/");
    await driver.get("http://localhost:5173/");

    // Vérification de la valeur initiale
    console.log("Vérification de la valeur initiale du compteur...");
    const counterValueElement = await driver.wait(
      until.elementLocated(By.id("counter-value")),
      5000 // Temps d'attente max : 5 secondes
    );
    const counterValue = await counterValueElement.getText();
    console.log("Valeur initiale trouvée :", counterValue);
    if (counterValue !== "0") {
      console.error("Erreur : Le compteur initial n'est pas correct");
    } else {
      console.log("Test réussi : La valeur initiale est correcte.");
    }

    // Test de l'incrémentation
    console.log("Test de l'incrémentation...");
    const incrementButton = await driver.findElement(By.id("increment-btn"));
    await incrementButton.click();
    const incrementedValue = await counterValueElement.getText();
    console.log("Valeur après incrémentation :", incrementedValue);
    if (incrementedValue !== "1") {
      console.error("Erreur : L'incrémentation n'a pas fonctionné");
    } else {
      console.log("Test réussi : L'incrémentation a fonctionné.");
    }

    // Test de la décrémentation
    console.log("Test de la décrémentation...");
    const decrementButton = await driver.findElement(By.id("decrement-btn"));
    await decrementButton.click();
    const decrementedValue = await counterValueElement.getText();
    console.log("Valeur après décrémentation :", decrementedValue);
    if (decrementedValue !== "0") {
      console.error("Erreur : La décrémentation n'a pas fonctionné");
    } else {
      console.log("Test réussi : La décrémentation a fonctionné.");
    }

    // Test de la réinitialisation
    console.log("Test de la réinitialisation...");
    await incrementButton.click(); // Incrémente à 1
    const resetButton = await driver.findElement(By.id("reset-btn"));
    await resetButton.click();
    const resetValue = await counterValueElement.getText();
    console.log("Valeur après réinitialisation :", resetValue);
    if (resetValue !== "0") {
      console.error("Erreur : La réinitialisation n'a pas fonctionné");
    } else {
      console.log("Test réussi : La réinitialisation a fonctionné.");
    }
  } catch (error) {
    console.error("Erreur pendant le test :", error);
  } finally {
    console.log("Fin du test. Fermeture du navigateur.");
    await driver.quit();
  }
}

// Exécution du test
testCounter().catch(console.error);
