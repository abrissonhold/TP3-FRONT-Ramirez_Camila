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

    const userId = parseInt(localStorage.getItem("userId"));
    const { users } = await loadInformation();
    const currentUser = users.find(u => u.id === userId);

    const filters = {
        title,
        status: status || null,
        applicant: applicant || null,
    };

    const myProjectsContainer = document.getElementById("my-projects");
    const otherProjectsContainer = document.getElementById("participating-projects");

    myProjectsContainer.innerHTML = `<div class="loader"><span>Cargando tus proyectos...</span></div>`;
    otherProjectsContainer.innerHTML = `<div class="loader"><span>Cargando proyectos para aprobar...</span></div>`;

    try {
        const projectsShort = await getProjects(filters); 
        const allDetails = await Promise.all(projectsShort.map(p => getProjectById(p.id)));
        
        const myProjects = allDetails.filter(p => p.user?.id === userId);
        const approvalProjects = allDetails.filter(p =>
            p.steps?.some(step =>
                step.approverUser?.id === userId ||
                (!step.approverUser && step.approverRole?.id === currentUser.approverRole?.id)
            )
        );
        myProjectsContainer.innerHTML = myProjects.length
            ? myProjects.map(Card).join("")
            : NoContent("No creaste ningún proyecto aún");

        otherProjectsContainer.innerHTML = approvalProjects.length
            ? approvalProjects.map(Card).join("")
            : NoContent("No hay proyectos en los que participes");

    } catch (error) {
        myProjectsContainer.innerHTML = NoContent("Error al cargar tus proyectos");
        otherProjectsContainer.innerHTML = NoContent("Error al cargar aprobaciones");
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
