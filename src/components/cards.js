export function Card(project) {
  return `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p><strong>Área:</strong> ${project.area.name}</p>
            <p><strong>Tipo:</strong> ${project.type.name}</p>
            <p class="status-${project.status.name.toLowerCase()}"><strong>Estado: ${project.status.name}</strong></p>
            <p><strong>Monto estimado:</strong> $${project.amount}</p>
            <p><strong>Duración:</strong> ${project.duration} días</p>
            <div class="card-footer mt-2 d-flex flex-column justify-content-between">
            <button class="detalles " onclick=
            "window.location.href='detail.html?id=${project.id}'">
            Ver detalles</button>
            </div>
        </div>
    `;
}

export function DetailCard(project, currentUser) {
  return `
      <h2><strong>${project.title}</strong></h2>
      <p><strong>Descripción:</strong> ${project.description}</p>
      <p><strong>Área:</strong> ${project.area.name}</p>
      <p><strong>Tipo:</strong> ${project.type.name}</p>
      <p><strong>Monto estimado:</strong> $${project.amount}</p>
      <p><strong>Duración estimada:</strong> ${project.duration} días</p>
      <p><strong>Estado: <span class="status-${project.status.name.toLowerCase()}">${project.status.name}</span></strong></p>
      <hr />
      <h4>Pasos de aprobación</h4>
      ${project.steps
      .map(
        (step) => {
          const canDecide =
          (step.approverUser?.id === currentUser.id) ||
          (!step.approverUser && step.approverRole?.id === currentUser.approverRole?.id);
          return `
            <div class="list-card">
              <p><strong>Orden:             </strong> ${step.stepOrder}</p>
              <p><strong>Rol revisor:       </strong> ${step.approverRole.name}</p>
              <p><strong>Usuario:           </strong> ${step.approverUser?.name || "No asignado"}</p>
              <p><strong>Estado:            <span class="status-${step.status.name.toLowerCase()}"> ${step.status.name}</span></strong></p>
              <p><strong>Observaciones:     </strong> ${step.observations || "-"}</p>
              <p><strong>Fecha de decisión: </strong> ${step.decisionDate ? new Date(step.decisionDate).toLocaleDateString() : "-"}</p>
              ${step.status.name === "Pending" && canDecide? `
                <button class="decision d-flex flex-column justify-content-between" onclick="openDecisionModal(${step.id}, '${project.id}', '${step.approverRole.name}')">
                  Tomar decisión
                </button>` : ""
              }
            </div>
          `;
        }
      )
      .join("")}

      ${project.status.name === "Observed" && project.user.id === currentUser.id ?  `
          <button class="decision" onclick="window.openEditModal('${project.id}', '${project.title}', \`${project.description}\`, ${project.duration})">
            Editar proyecto
          </button>
      ` : ''}
  `;
}
