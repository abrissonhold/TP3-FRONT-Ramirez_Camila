import { createProject } from "../services/projectsAPI.js";
import { ProjectForm } from "../components/createform.js";
import { loadInformation } from "../services/informationAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = parseInt(localStorage.getItem("userId"));

    if (!userId) {
        alert("Debés iniciar sesión primero");
        window.location.href = "login.html";
    }

    const logoutIcon = document.getElementById("logoutIcon");
    if (logoutIcon) {
        logoutIcon.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    }

    const form = document.getElementById("projectForm");
    const { areas, projectTypes, users } = await loadInformation();

    form.innerHTML = ProjectForm(areas, projectTypes, users, userId);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const project = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            amount: parseFloat(document.getElementById("amount").value),
            duration: parseInt(document.getElementById("duration").value),
            area: parseInt(document.getElementById("area").value),
            type: parseInt(document.getElementById("type").value),
            user: userId,
        };

        try {
            const result = await createProject(project);
            if (result) {
                showSuccessModal(result.id);
            } 
            else {
                alert("Error al crear proyecto.");
            }
        } catch (err) {
            alert("Ocurrió un error: " + err.message);
        }
    });
});

function showSuccessModal(projectId) {
    const modal = document.createElement("div");
    modal.classList.add("modal-decision");
    
    modal.innerHTML = `
        <div class="modal-content text-center">
            <h4>¡Proyecto creado con éxito!</h4>
            <div class="modal-buttons mt-3">
                <button class="decision" onclick="window.location.href='detail.html?id=${projectId}'">Ver Detalles</button>
                <button class="decision-no" onclick="window.location.href='create.html'">Crear Otro</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}
