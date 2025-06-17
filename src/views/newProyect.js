import { createProject } from "../services/projectsAPI.js";
import { ProjectForm } from "../components/createform.js";
import { loadInformation } from "../services/informationAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("projectForm");

    const { areas, projectTypes, users } = await loadInformation();

    form.innerHTML = ProjectForm(areas, projectTypes, users);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const project = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            amount: parseFloat(document.getElementById("amount").value),
            duration: parseInt(document.getElementById("duration").value),
            area: parseInt(document.getElementById("area").value),
            type: parseInt(document.getElementById("type").value),
            user: parseInt(document.getElementById("user").value)
        };

        try {
            const result = await createProject(project);
            if (result) {
                window.location.href = "index.html";
            } else {
                alert("Error al crear proyecto.");
            }
        } catch (err) {
            alert("Ocurrió un error: " + err.message);
        }
    });
});
