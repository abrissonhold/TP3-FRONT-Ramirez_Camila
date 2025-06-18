export function ProjectForm(areasRes, typesRes, users, userId) {
    return `
        <div class="form-group">
            <label for="title"><h4>Título</h4></label>
            <input type="text" class="form-control" id="title" required></input>
        </div>

        <div class="form-group">
            <label for="description"><h4>Descripción</h4></label>
            <textarea type="text" class="form-control" id="description" rows="3" required> </textarea>
        </div>

        <div class="form-group">
            <label for="amount"><h4>Monto estimado</h4></label>
            <input type="number" class="form-control" id="amount" min="0" required></input>
        </div>

        <div class="form-group">
            <label for="duration"><h4>Duración estimada (días)</h4></label>
            <input type="number" class="form-control" id="duration" min="1" required></input>
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
