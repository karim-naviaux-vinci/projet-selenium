import { Builder, By, until } from 'selenium-webdriver';

// Fonction pour ajouter des délais d'attente
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testTodoList() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Accéder à l'application React
    await driver.get("http://localhost:5173"); // Remplacez par votre URL locale

    // Attendre 2 secondes pour observer l'application
    await sleep(2000);

    // Vérifiez que le titre s'affiche correctement
    const title = await driver.findElement(By.css("[data-testid='todo-title']")).getText();
    if (title !== "Liste des tâches") {
      throw new Error("Le titre du composant n'est pas correct !");
    }

    // Ajouter une nouvelle tâche
    const inputField = await driver.findElement(By.css("[data-testid='task-input']"));
    const addButton = await driver.findElement(By.css("[data-testid='add-button']"));

    await inputField.sendKeys("Acheter du lait");
    await addButton.click();

    // Attendre 2 secondes pour observer l'ajout de la tâche
    await sleep(2000);

    // Vérifier que la tâche est ajoutée
    const taskItems = await driver.findElements(By.css("ul > li"));
    console.log(`Nombre de tâches après ajout : ${taskItems.length}`);
    const lastTaskIndex = taskItems.length - 1;
    const lastTask = await taskItems[lastTaskIndex].getText();
    console.log(`Texte de la dernière tâche : ${lastTask}`);
    if (!lastTask.includes("Acheter du lait")) {
      throw new Error("La tâche n'a pas été ajoutée !");
    }

    // Supprimer la dernière tâche ajoutée
    console.log(`Tentative de suppression de la tâche à l'index ${lastTaskIndex}`);
    const deleteButton = await driver.findElement(By.css(`[data-testid='delete-button-${lastTaskIndex}']`));
    await deleteButton.click();

    // Attendre 2 secondes pour observer la suppression de la tâche
    await sleep(2000);

    // Attendre que le bouton de suppression devienne obsolète (stale)
    await driver.wait(until.stalenessOf(deleteButton), 5000);

    // Vérifier que la tâche est supprimée
    const updatedTaskItems = await driver.findElements(By.css("[data-testid='task-list'] li"));
    console.log(`Nombre de tâches après suppression : ${updatedTaskItems.length}`);
    if (updatedTaskItems.length !== taskItems.length - 1) {
      throw new Error("La tâche n'a pas été supprimée !");
    }

    console.log("Tous les tests sont passés avec succès !");
  } catch (error) {
    console.error("Erreur durant les tests :", error);
  } finally {
    // Attendre 2 secondes avant de fermer le navigateur pour observer le résultat final
    await sleep(2000);
    // Fermer le navigateur
    await driver.quit();
  }
})();