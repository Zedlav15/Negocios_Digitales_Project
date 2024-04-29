<?php
    $servidor = "localhost"; #Nombre de la conexion
    $usuario = "root"; #Usuario de la BD
    $contrasena = ""; #Contraseña de la BD
    $BD = "usuarios_negocios"; #Nombre de la BD

    $conexion = mysqli_connect($servidor, $usuario, $contrasena, $BD); #Creacion de la conexion

    $conexion->set_charset("utf8"); #Establecimiento del charset