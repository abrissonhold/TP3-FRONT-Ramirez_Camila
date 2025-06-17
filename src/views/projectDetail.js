import { loadInformation } from "../services/informationAPI.js";
import { getProjectById } from "../services/projectsAPI.js";
import { sendDecision } from "../services/projectsAPI.js";
import { DetailCard } from "../components/cards.js";
import { PopUp } from "../components/steppop.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("detailcard").innerHTML =
            "<p>Proyecto no encontrado</p>";
        return;
    }

    try {
        const project = await getProjectById(id);
        renderDetail(project);
        updateHeader(project.user.name);
    } catch (error) {
        document.getElementById("detailcard").innerHTML =
            "<p>Error al cargar el proyecto.</p>";
        console.error(error);
    }
});

function renderDetail(project) {
    const container = document.getElementById("detailcard");
    container.innerHTML = DetailCard(project);
}

function updateHeader(name) {
    const header = document.querySelector("main header h1");
    header.textContent = `Propuesta de ${name}`;
}

window.openDecisionModal = async (stepId, projectId, requiredRoleName) => {
    const { users, statuses } = await loadInformation();
    const filteredUsers = users.filter(u => u.approverRole?.name === requiredRoleName);

    const modal = document.createElement("div");
    modal.classList.add("modal-decision");
        modal.innerHTML = PopUp(stepId, projectId, requiredRoleName, filteredUsers, statuses);
    document.body.appendChild(modal);
};

window.submitDecision = async (stepId, projectId) => {
    const user = parseInt(document.getElementById("userSelect").value);
    const status = parseInt(document.getElementById("statusSelect").value);
    const observation = document.getElementById("obsInput").value;

    const data = {
        id: stepId,
        user: user,
        status: status,
        observation: observation?.trim() || null
    };

    try {
        await sendDecision(projectId, data);
        location.reload();
    } catch (e) {
        alert("Error al enviar la decisión: " + e.message);
    }
};