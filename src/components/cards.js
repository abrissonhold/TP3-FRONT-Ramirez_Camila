export function Card(project) {
  return `
    <div class="project-card">
      <h2 class="text-center">${project.title}</h2>
      <div>
        <div><strong>Área:</strong> ${project.area.name}</div>
        <div><strong>Tipo:</strong> ${project.type.name}</div>
        <div><strong>Monto:</strong> $${project.amount}</div>
        <div><strong>Duración:</strong> ${project.duration} días</div>
        <div class="status-box status-${project.status.name.toLowerCase()}"><strong>Estado:</strong> ${project.status.name.toUpperCase()}</div>
      </div>
      <div class="card-footer text-center mt-2">
        <button class="detalles" onclick="window.location.href='detail.html?id=${project.id}'">
          Ver detalles
        </button>
      </div>
    </div>
  `;
}

export function DetailCard(project, currentUser) {
  return `
    <section class="project-detail">
      <h2 class="project-title text-center">${project.title}</h2>
      <div class="description-box">
        <p><strong>Descripción:</strong> ${project.description}</p>
      </div>
      <div class="project-info-grid">
        <div class="info-box"><strong>Área:</strong> ${project.area.name}</div>
        <div class="info-box"><strong>Tipo:</strong> ${project.type.name}</div>
        <div class="info-box"><strong>Monto estimado:</strong> $${project.amount}</div>
        <div class="info-box"><strong>Duración:</strong> ${project.duration} días</div>
      </div>
      <div class="status-box status-${project.status.name.toLowerCase()}">${project.status.name.toUpperCase()}</div>
    </section>

    <hr />

    <section class="approval-steps mt-4">
      <h4>Pasos de aprobación</h4>
      <div class="steps-grid">
        ${project.steps.map(step => {
          const canDecide = step.approverUser?.id === currentUser.id ||
                            (!step.approverUser && step.approverRole?.id === currentUser.approverRole?.id);

          return `
            <div class="step-card">
              <div><strong>Paso ${step.stepOrder}</strong>
                <div class="status-box status-${step.status.name.toLowerCase()}">${step.status.name.toUpperCase()}</div>
              </div>
              <div class="info-box"><strong>Rol:</strong> ${step.approverRole.name}</div>
              <div class="info-box"><strong>Usuario:</strong> ${step.approverUser?.name || "No asignado"}</div>
              <div class="info-box"><strong>Observaciones:</strong> ${step.observations || "-"}</div>
              <div class="info-box"><strong>Fecha:</strong> ${step.decisionDate ? new Date(step.decisionDate).toLocaleDateString() : "-"}</div>

              ${step.status.name === "Pending" && canDecide ? `
                <button class="decision" onclick="openDecisionModal(${step.id}, '${project.id}', '${step.approverRole.name}')">
                  Tomar decisión
                </button>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    </section>

    ${(project.status.name === "Observed" && project.user.id === currentUser.id) ? `
      <div class="edit-project-container text-center mt-4">
        <button class="decision" onclick="window.openEditModal('${project.id}', '${project.title}', \`${project.description}\`, ${project.duration})">
          Editar proyecto
        </button>
      </div>
    ` : ""}
  `;
}
