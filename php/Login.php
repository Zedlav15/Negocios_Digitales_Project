<?php
    include 'Conexion.php';

    session_start();

    if(isset($_POST['ingUser']) && isset($_POST['ingPass'])){
        $username = $_POST['ingUser'];
        $password = $_POST['ingPass'];

        $consulta = mysqli_query($conexion, "SELECT * FROM whatsapp_usuario WHERE usuario = '$username' AND contrasena = '$password'");
        $result = mysqli_fetch_assoc($consulta);

        if(mysqli_num_rows($consulta) > 0){
            $_SESSION['user'] = $username;
            $rol = $result['rol'];
            $_SESSION['rol'] = $rol;
            $change = mysqli_query($conexion, "UPDATE whatsapp_usuario SET statusData = 1 WHERE usuario = '$username'");
            switch($_SESSION['rol']){
                case 1:
                    header("location: ../html/supervisor.html");
                    break;
                case 2:
                    header("location: ../html/colab_copy.html");
                    break;
            }
        }
        else{
            echo '<script>
                    alert("Usuario no existe, por favor verifique los datos introducidos");
                    window.location = "../index.html";
                </script>';
            exit;
        }
    }