// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔗 Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",        // tu usuario de MySQL
    password: "Freestyle12", // tu contraseña
    database: "citafacil"    // nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar a MySQL:", err);
        return;
    }
    console.log("✅ Conectado a la base de datos MySQL");
});

// 🔥 Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor Node.js funcionando correctamente 🚀");
});

// 🧾 Ruta para registrar una cita
app.post("/api/citas", (req, res) => {
    const { nombre, correo, telefono, especialidad, fecha, hora, comentarios } = req.body;

    const sql = "INSERT INTO citas (nombre, correo, telefono, especialidad, fecha, hora, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, correo, telefono, especialidad, fecha, hora, comentarios], (err, result) => {
        if (err) {
            console.error("❌ Error al registrar cita:", err);
            res.status(500).send("Error al registrar la cita");
            return;
        }
        res.send("✅ Cita registrada correctamente");
    });
});

// 📋 Ruta para obtener todas las citas
app.get("/api/citas", (req, res) => {
    const sql = "SELECT * FROM citas ORDER BY fecha, hora";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Error al obtener citas:", err);
            res.status(500).send("Error al obtener las citas");
            return;
        }
        res.json(results);
    });
});

// 🚀 Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});