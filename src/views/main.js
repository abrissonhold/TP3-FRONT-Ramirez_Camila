import { getProjects } from "../services/projectsAPI.js";
import { loadInformation } from "../services/informationAPI.js";
import { Card } from "../components/cards.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadFilters();
    await renderFilteredProjects();

    document.querySelector(".buscar").addEventListener("click", async () => {
        await renderFilteredProjects();
    });
});

async function renderFilteredProjects() {
    const title = document.getElementById("search-projects").value.trim();
    const status = document.getElementById("filter-status").value;
    const applicant = document.getElementById("filter-user").value;
    const container = document.getElementById("cards");

    const filters = {
        title,
        status: status || null,
        applicant: applicant || null,
    };

    try {
        const projects = await getProjects(filters);
        container.innerHTML = "";

        projects.forEach((project) => {
            container.innerHTML += Card(project);
        });
    } catch (error) {
        container.innerHTML = "<p>Error al cargar los proyectos</p>";
        console.error(error);
    }

}

async function loadFilters() {
    const { users, statuses } = await loadInformation();

    const userSelect = document.getElementById("filter-user");
    users.forEach((user) => {
        const opt = document.createElement("option");
        opt.value = user.id;
        opt.textContent = user.name;
        userSelect.appendChild(opt);
    });

    const statusSelect = document.getElementById("filter-status");
    statuses.forEach((status) => {
        const opt = document.createElement("option");
        opt.value = status.id;
        opt.textContent = status.name;
        statusSelect.appendChild(opt);
    });
}
