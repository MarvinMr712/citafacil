document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("citaForm");
  const tabla = document.getElementById("tablaCitas");
  const mensajeExito = document.getElementById("mensajeExito");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const telefono = document.getElementById("telefono").value;
      const especialidad = document.getElementById("especialidad").value;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const comentarios = document.getElementById("comentarios").value;

      const cita = { nombre, correo, telefono, especialidad, fecha, hora, comentarios };

      try {
        const res = await fetch("http://localhost:3000/api/citas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cita)
        });

        if (!res.ok) throw new Error("Error al registrar cita");

        mensajeExito.textContent = "✅ Cita registrada con éxito!";
        form.reset();
        cargarCitas(); // actualiza la tabla
      } catch (error) {
        console.error("Error al enviar la cita:", error);
        alert("❌ No se pudo conectar con el servidor. Asegúrate de que Node.js esté corriendo.");
      }
    });
  }

  async function cargarCitas() {
    if (!tabla) return;
    tabla.innerHTML = "";
    try {
      const res = await fetch("http://localhost:3000/api/citas");
      const citas = await res.json();
      citas.forEach((cita) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${cita.nombre}</td>
          <td>${cita.especialidad}</td>
          <td>${cita.fecha}</td>
          <td>${cita.hora}</td>
        `;
        tabla.appendChild(fila);
      });
    } catch (err) {
      console.error("Error al obtener citas:", err);
    }
  }

  cargarCitas();
});