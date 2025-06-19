export function ProjectForm(areasRes, typesRes, users, userId) {
    return `
        <div class="form-group">
            <label for="title"><h4>Título</h4></label>  
            <small>Ingresá un nombre claro para tu propuesta</small>
            <input type="text" class="form-control" id="title" placeholder="Ej: Sistema de inventario" required>
        </div>

        <div class="form-group">
            <label for="description"><h4>Descripción</h4></label>
            <small>Proporcioná una descripción detallada de tu propuesta</small>
            <textarea type="text" class="form-control" id="description" rows="3" placeholder="Ej: Aplicación para registrar productos en stock..." required></textarea>
        </div>

        <div class="form-group">
            <label for="amount"><h4>Monto estimado</h4></label>
            <small>Ingresá el monto total estimado para el proyecto</small>
            <input type="number" class="form-control" id="amount" min="0" placeholder="Ej: 10000" required>
        </div>

        <div class="form-group">
            <label for="duration"><h4>Duración estimada (días)</h4></label>
            <small>Ingresá la duración total estimada para el proyecto</small>
            <input type="number" class="form-control" id="duration" min="1" placeholder="Ej: 30" required>
        </div>

        <div class="form-group">
            <label for="area"><h4>Área</h4></label>
            <select class="form-control" id="area" required>
            ${areasRes
            .map((area) => `<option value="${area.id}">${area.name}</option>`)
            .join("")}
            </select>
        </div>

        <div class="form-group">
            <label for="type"><h4>Tipo de proyecto</h4></label>
            <select class="form-control" id="type" required>
            ${typesRes
            .map((type) => `<option value="${type.id}">${type.name}</option>`)
            .join("")}
            </select>
        </div>

    <button type="submit" class="decision">Crear Proyecto</button>
    `;
}
