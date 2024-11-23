import { Builder, By, until } from 'selenium-webdriver';

// Fonction pour ajouter des délais d'attente
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testTodoList() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:5173");
    await sleep(2000);

    const inputField = await driver.findElement(By.css("[data-testid='task-input']"));
    const addButton = await driver.findElement(By.css("[data-testid='add-button']"));

    await inputField.sendKeys("Acheter du lait");
    await addButton.click();
    await sleep(2000); // Temps pour observer

    const taskItems = await driver.findElements(By.css("ul[data-testid='task-list'] li"));
    const lastTaskIndex = taskItems.length - 1;

    console.log(`Tâches trouvées après ajout : ${taskItems.length}`);
    const lastTask = await taskItems[lastTaskIndex].getText();

    if (!lastTask.includes("Acheter du lait")) {
      throw new Error("La tâche n'a pas été ajoutée !");
    }

    // Attendre que le bouton de suppression soit présent
    const deleteButtonSelector = `[data-testid='delete-button-${lastTaskIndex}']`;
    console.log(`Suppression avec sélecteur : ${deleteButtonSelector}`);
    const deleteButton = await driver.findElement(By.css(deleteButtonSelector));

    await deleteButton.click();

    // Attendre que le DOM soit mis à jour
    await driver.wait(until.stalenessOf(deleteButton), 5000);

    const updatedTaskItems = await driver.findElements(By.css("ul[data-testid='task-list'] li"));
    console.log(`Nombre de tâches après suppression : ${updatedTaskItems.length}`);
    if (updatedTaskItems.length !== taskItems.length - 1) {
      throw new Error("La tâche n'a pas été supprimée !");
    }

    console.log("Test réussi !");
  } catch (error) {
    console.error("Erreur durant les tests :", error);
  } finally {
    await sleep(2000);
    await driver.quit();
  }
})();
