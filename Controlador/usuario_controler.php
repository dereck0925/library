<?php
include_once '../Modelo/Usuario.php';
$usuario = new Usuario();
session_start();

// Search for a user avatar
if ($_POST['funcion'] == 'buscarAvatar') {
    $json = array();
    $usuario->buscar_avatar($_POST['id']);
    foreach ($usuario->objetos as $objeto) {
        $json[] = array(
            'avatar' => '../Recursos/img/avatars/' . utf8_encode($objeto->avatar),
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}