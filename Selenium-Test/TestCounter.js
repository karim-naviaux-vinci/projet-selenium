import { Builder, By, until } from "selenium-webdriver";

async function testCounterComponent() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    // Charger l'application
    await driver.get("http://localhost:5173/");

    // Attendre que le composant Counter soit visible
    await driver.wait(until.elementLocated(By.tagName("h2")), 5000);

    // Vérifier le texte initial du compteur
    const counterElement = await driver.findElement(By.tagName("h2"));
    const initialText = await counterElement.getText();
    if (initialText === "Compteur : 0") {
      console.log("Compteur initialisé à 0 - Test OK");
    } else {
      console.error("Erreur : Le compteur initial n'est pas correct");
    }

    // Cliquer sur le bouton "Incrémenter"
    const incrementButton = await driver.findElement(By.xpath("//button[text()='Incrémenter']"));
    await incrementButton.click();

    // Vérifier si le compteur a été incrémenté
    const incrementedText = await counterElement.getText();
    if (incrementedText === "Compteur : 1") {
      console.log("Incrémentation réussie - Test OK");
    } else {
      console.error("Erreur : L'incrémentation n'a pas fonctionné");
    }

    // Cliquer sur le bouton "Décrémenter"
    const decrementButton = await driver.findElement(By.xpath("//button[text()='Décrémenter']"));
    await decrementButton.click();

    // Vérifier si le compteur a été décrémenté
    const decrementedText = await counterElement.getText();
    if (decrementedText === "Compteur : 0") {
      console.log("Décrémentation réussie - Test OK");
    } else {
      console.error("Erreur : La décrémentation n'a pas fonctionné");
    }

    // Cliquer sur le bouton "Réinitialiser"
    const resetButton = await driver.findElement(By.xpath("//button[text()='Réinitialiser']"));
    await resetButton.click();

    // Vérifier si le compteur a été réinitialisé
    const resetText = await counterElement.getText();
    if (resetText === "Compteur : 0") {
      console.log("Réinitialisation réussie - Test OK");
    } else {
      console.error("Erreur : La réinitialisation n'a pas fonctionné");
    }

  } catch (error) {
    console.error("Erreur pendant le test :", error);
  } finally {
    await driver.quit();
  }
}

// Lancer le test
testCounterComponent().catch(console.error);
