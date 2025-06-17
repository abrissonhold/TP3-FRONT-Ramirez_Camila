export function PopUp(stepId, projectId, requiredRoleName, filteredUsers, statuses) {
    return `
      <div class="modal-content">
        <h4>Decidir Paso ${stepId}</h4>

        <label>Usuario (${requiredRoleName}):</label>
        <select id="userSelect">${filteredUsers.map(u =>
        `<option value="${u.id}">${u.name}</option>`).join('')}
        </select>

        <label>Estado:</label>
        <select id="statusSelect">
          ${statuses.map(s =>
            `<option value="${s.id}">${s.name}</option>`).join('')}
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