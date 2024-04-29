<?php
include 'Conexion.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');  // Establece que la salida debe ser JSON

session_start();

// Chequear conexión
if ($conexion->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Fallo de conexión: ' . $conexion->connect_error]);
    exit();  // Detiene la ejecución del script
}

$username = $_POST['username'];
$password = $_POST['pass'];  // Captura la contraseña sin aplicar real_escape_string()

// Preparar la consulta para buscar el usuario por username (correo)
$stmt = $conexion->prepare("SELECT contrasena FROM usuario WHERE correo = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error de preparación: ' . $conexion->error]);
    exit();
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if ($password === $row['contrasena']) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontró el usuario.']);
}

$stmt->close();
$conexion->close();

