export function PopDecision(stepId, projectId, statuses) {
    return `
      <div class="modal-content">
        <h4>Decidir Paso</h4>

        <label>Estado:</label>
        <select id="statusSelect">
          ${statuses
            .filter(s => s.id !== 1)
            .map(s =>`<option value="${s.id}">${s.name}</option>`).join('')}
        </select>

        <label>Observaciones:</label>
        <textarea id="obsInput" class="form-control" rows="3"></textarea>

        <div class="modal-buttons">
          <button class="decision" onclick="window.submitDecision(${stepId}, '${projectId}')">Confirmar</button>
          <button class="decision-no" onclick="this.closest('.modal-decision').remove()">Cancelar</button>
        </div>
      </div>
    `;
}

export function PopEditar(projectId, title, description, duration) {
    return `
      <div class="modal-content">
        <h4>Editar Proyecto</h4>
        <label for="editTitle">Título</label>
        <input type="text" id="editTitle" class="form-control" value="${title}" />

        <label for="editDesc">Descripción</label>
        <textarea id="editDesc" class="form-control">${description}</textarea>

        <label for="editDuration">Duración (días)</label>
        <input type="number" id="editDuration" class="form-control" value="${duration}" min="1" />

        <div class="modal-buttons">
          <button class="decision" onclick="window.submitEditProject('${projectId}')">Guardar</button>
          <button class="decision-no" onclick="this.closest('.modal-decision').remove()">Cancelar</button>
        </div>
      </div>
    `;
}