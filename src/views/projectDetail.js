import { loadInformation } from "../services/informationAPI.js";
import { getProjectById, sendDecision, updateProject } from "../services/projectsAPI.js";
import { DetailCard } from "../components/cards.js";
import { PopDecision, PopEditar } from "../components/pops.js";
import { NoContent } from "../components/nocontent.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = parseInt(localStorage.getItem("userId"));

    if (!userId) {
        alert("Debés iniciar sesión primero");
        window.location.href = "login.html";
    }

    const { users } = await loadInformation();
    const currentUser = users.find(u => u.id === userId);

    const logoutIcon = document.getElementById("logoutIcon");
    if (logoutIcon) {
        logoutIcon.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        const detailCardElem = document.getElementsByClassName("project-detail-container");
        if (detailCardElem && detailCardElem.length > 0) {
            detailCardElem[0].innerHTML = NoContent("Proyecto no encontrado");
        }
        return;
    }

    try {
        const project = await getProjectById(id);
        const container = document.getElementsByClassName("project-detail-container");
        if (container && container.length > 0) {
            container[0].innerHTML = DetailCard(project, currentUser);
            updateHeader(project.user.name, project.user.email);
        }
    } catch (error) {
        const detailCardElem = document.getElementsByClassName("project-detail-container");
        if (detailCardElem) {
            if (detailCardElem && detailCardElem.length > 0) {
                detailCardElem[0].innerHTML = NoContent("Error al cargar el proyecto.");
            }
        }
    }
});

function updateHeader(name, mail) {
    const header = document.querySelector("main header h1");
    header.textContent = `Propuesta de ${name} (${mail})`;
}

window.openDecisionModal = async (stepId, projectId) => {
    const { statuses } = await loadInformation();
    const modal = document.createElement("div");
    modal.classList.add("modal-decision");
    modal.innerHTML = PopDecision(stepId, projectId, statuses);
    document.body.appendChild(modal);
};

window.submitDecision = async (stepId, projectId) => {
    const status = parseInt(document.getElementById("statusSelect").value);
    const observation = document.getElementById("obsInput").value;
    const userId = parseInt(localStorage.getItem("userId"));

    const data = {
        id: stepId,
        user: userId,
        status: status,
        observation: observation?.trim() || null
    };

    try {
        await sendDecision(projectId, data);
        location.reload();
    } catch (e) {
        document.getElementById("detailcard").innerHTML = NoContent("Error al enviar la decisión. Por favor, intente nuevamente.");
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
        location.reload();
    } catch (error) {
        alert("Error al actualizar: " + error.message);
        console.error(error);
    }
}
