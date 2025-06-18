import { getProjects, getProjectById } from "../services/projectsAPI.js";
import { loadInformation } from "../services/informationAPI.js";
import { Card } from "../components/cards.js";
import { NoContent } from "../components/nocontent.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = parseInt(localStorage.getItem("userId"));

    if (!userId) {
        alert("Debés iniciar sesión primero");
        window.location.href = "login.html";
    }

    const { users } = await loadInformation();
    const user = users.find(u => u.id === userId);
    document.getElementById("user-name").textContent = user?.name || "Invitado";
    
    await loadFilters();
    await renderFilteredProjects();

    const logoutIcon = document.getElementById("logoutIcon");
    if (logoutIcon) {
        logoutIcon.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    }

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
        container.innerHTML = `
            <div class="loader">
                <span>Cargando proyectos...</span>
            </div>
        `;
        const userId = parseInt(localStorage.getItem("userId"));
        const projectsShort = await getProjects(filters); 
        const allDetails = await Promise.all(projectsShort.map(p => getProjectById(p.id)));

        const visibleProjects = allDetails.filter(p =>
            p.user?.id === userId || p.steps?.some(s => s.approverUser?.id === userId)
        );

        container.innerHTML = "";

        if (visibleProjects.length === 0) {            
            document.getElementById("listado").innerHTML = NoContent("No se encontraron proyectos con los filtros aplicados");
        } else {
            visibleProjects.forEach((project) => {
                container.innerHTML += Card(project);
            });
        }
    } catch (error) {
        container.innerHTML = NoContent("Error al cargar los proyectos".toUpperCase());
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
