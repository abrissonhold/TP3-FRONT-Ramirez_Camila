export function NoContent(message = "No hay datos") {
    return `
        <div class="text-center mt-5">
          <img src="images/no-content.png" alt="No hay datos" style="max-width: 150px;">
          <p class="mt-3"><strong>${message}</strong></p>
        </div>`;
}
