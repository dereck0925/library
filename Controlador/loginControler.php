<?php
include_once '../Modelo/Usuario.php';
session_start();

if (!empty($_SESSION['type_id'])) {
    header('location: ../Vista/adm_panel.php');
} else {
    $user = $_POST['user'];
    //$pass = md5($_POST['pass']);
    $pass = $_POST['pass'];
    $usuario = new Usuario();
    $usuario->loguearse($user, $pass);
    if (!empty($usuario->objetos)) {
        foreach ($usuario->objetos as $objeto) {
            if ($objeto->estado == 'Activo') {
                $_SESSION['id_user'] = $objeto->id;
                $_SESSION['name_user'] = utf8_encode($objeto->username);
                $_SESSION['nombre'] = $objeto->nombre_completo;
                header('location: ../Vista/adm_panel.php');
            } else {
                $msj = 'El usuario se encuentra inactivo';
                header('location: ../index.php?msj=' . $msj);
            }
        }
    } else {
        $msj = 'Usuario o Contraseña incorrecta';
        header('location: ../index.php?msj=' . $msj);
    }
}
