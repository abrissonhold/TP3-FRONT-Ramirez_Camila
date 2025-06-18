import { loadInformation } from "../services/informationAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { users } = await loadInformation();
  const select = document.getElementById("userSelect");

  users.forEach(user => {
    const opt = document.createElement("option");
    opt.value = user.id;
    opt.textContent = `${user.name} (${user.approverRole?.name || "Sin rol"})`;
    select.appendChild(opt);
  });

  document.getElementById("loginBtn").addEventListener("click", () => {
    const selectedUserId = select.value;
    if (!selectedUserId) return alert("Seleccioná un usuario");
    localStorage.setItem("userId", selectedUserId);
    window.location.href = "index.html";
  });
});