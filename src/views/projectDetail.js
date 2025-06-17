import { getProjectById } from "../services/projectsAPI.js";
import { DetailCard } from "../components/cards.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("detailcard").innerHTML =
            "<p>Proyecto no encontrado</p>";
        return;
    }

    const project = await getProjectById(id);
    renderDetail(project);
});

function renderDetail(project) {
    const container = document.getElementById("detailcard");
    container.innerHTML += DetailCard(project);
}

const loadTasks = (tasks) => {
    const tasksContainer = document.getElementById("tasks");
    if (tasks.length === 0) {
        tasklist.innerHTML = "<h3>No hay tareas para mostrar.</h3>";
    }
    tasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.innerText = task.Name;
        tasksContainer.appendChild(taskElement);
    });
};

const loadInteractions = (interactions) => {
    const interactionsContainer = document.getElementById("interactions");
    if (interactions.length === 0) {
        interactionlist.innerHTML = "<h3>No hay interacciones para mostrar.</h3>";
    }
    interactions.forEach((interaction) => {
        const interactionElement = document.createElement("li");
        interactionElement.innerText = interaction.Notes;
        interactionsContainer.appendChild(interactionElement);
    });
};

window.onload = loadProjectDetails;
