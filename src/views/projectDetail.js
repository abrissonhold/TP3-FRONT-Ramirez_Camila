import { loadInformation } from "../services/informationAPI.js";
import { getProjectById, sendDecision,updateProject } from "../services/projectsAPI.js";
import { DetailCard } from "../components/cards.js";
import { PopUp, PopEditar } from "../components/pops.js";

const userId = parseInt(localStorage.getItem("userId"));
if (!userId) {
  alert("Debés iniciar sesión primero");
  window.location.href = "login.html";
}

const { users } = await loadInformation();
const currentUser = users.find(u => u.id === userId);

document.getElementById("logoutIcon").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userId");
  window.location.href = "login.html";
});


document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("detailcard").innerHTML =
            "<p class='error'>Proyecto no encontrado</p> <img src='images/no-content.png' alt='No hay datos' style='max-width: 150px;'/>";
        return;
    }

    try {
        const project = await getProjectById(id);
        renderDetail(project);
        updateHeader(project.user.name);
    } catch (error) {
        document.getElementById("detailcard").innerHTML =
            "<p class='error'>Error al cargar el proyecto.</p><img src='images/no-content.png' alt='No hay datos' style='max-width: 150px;'/>";
        console.error(error);
    }
});

function renderDetail(project) {
    const container = document.getElementById("detailcard");
    container.innerHTML = DetailCard(project, currentUser);
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
        document.getElementById("detailcard").innerHTML =
            "<p class='mt-3'>Error al enviar la decisión.</p><img src='images/no-content.png' alt='No hay datos' style='max-width: 150px;'/>";
        console.error(e.message);
    }
};

window.openEditModal = (projectId, title, description, duration) => {
    const modal = document.createElement("div");
    modal.classList.add("modal-decision");

    modal.innerHTML = PopEditar(projectId, title, description, duration);

    document.body.appendChild(modal);
};

window.submitEditProject = async (projectId) => {
    const updatedData = {
        title: document.getElementById("editTitle").value.trim(),
        description: document.getElementById("editDesc").value.trim(),
        duration: parseInt(document.getElementById("editDuration").value)
    };

    try {
        await updateProject(projectId, updatedData);
        alert("Proyecto actualizado correctamente");
        location.reload();
    } catch (error) {
        alert("Error al actualizar: " + error.message);
        console.error(error);
    }
}
