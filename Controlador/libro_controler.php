<?php
//Controlador libro
include_once '../Modelo/Libro.php';
$Libro = new Libro();

// Controller to create book
if ($_POST['funcion'] == 'create_book') {
    $titulo = $_POST['titulo'];
    $autor = utf8_decode($_POST['autor']);
    $imagen = $_POST['imagen'];
    $descripcion = $_POST['andescripciono'];
    $id_category = $_POST['id_category'];
    if ($_FILES['imagen']['name'] <> "") {
        $imagen = uniqid() . "-" . $_FILES['imagen']['name'];
        $ruta = '../Recursos/esal/' . $imagen;
        move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta);
        $Libro->createBook($titulo, $autor, $imagen, $descripcion, $id_category);
    }else{
        $imagen = "";
        $Libro->createBook($titulo, $autor, $imagen, $descripcion, $id_category);
    }
}

// Controller to search books
if ($_POST['funcion'] == 'buscar_libros') {
    $json = array();
    $Libro->buscar();
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id,
            'titulo' => utf8_encode($objeto->titulo),
            'autor' => utf8_encode($objeto->autor),
            'estado' => utf8_encode($objeto->estado),
            'name_category' => $objeto->name_category
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

// Controller to read data book
if ($_POST['funcion'] == 'chargeBook') {
    $json = array();
    $id = $_POST['id'];
    $Libro->chargeBook($id);
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'titulo' => $objeto->titulo,
            'autor' => $objeto->autor,
            'imagen' => "../Recursos/img/Books/".$objeto->imagen,
            'descripcion' => $objeto->descripcion,
            'estado' => $objeto->estado,
            'name_category' => $objeto->name_category
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}

// Controller to list reserve by user
if ($_POST['funcion'] == 'listarReservas') {
    $json = array();
    $Libro->listarReservas();
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'id' => utf8_encode($objeto->id),
            'titulo' => utf8_encode($objeto->titulo),
            'autor' => utf8_encode($objeto->autor),
            'id_libro' => utf8_encode($objeto->id_libro),
            'dias' => $objeto->dias
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

// Controller to delete reserve
if ($_POST['funcion'] == 'deleteReserve') {
    $Libro->deleteReserve($_POST['id'], $_POST['id_libro']);
}

// Controller to count reserves by user
if ($_POST['funcion'] == 'totalReservas') {
    $json = array();
    $id_usuario = $_POST['id_usuario'];
    $Libro->totalReservas($id_usuario);
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'total' => utf8_encode($objeto->total)
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}

//Controller to create reserve
if ($_POST['funcion'] == 'reserveBook') {
    $id_usuario = $_POST['id_usuario'];
    $id_libro = $_POST['id_libro'];
    $dias = $_POST['dias'];
    $Libro->reserveBook($id_usuario, $id_libro, $dias);
}


//Controller to read data categories 
if ($_POST['funcion'] == 'cargarSelect') {
    $json = array();
    $Libro->cargarSelect();
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id,
            'name_category' => $objeto->name_category
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

//Controller to list books by category
if ($_POST['funcion'] == 'listByCategory') {
    $json = array();
    $id_category = $_POST['id_category'];
    $Libro->listByCategory($id_category);
    foreach ($Libro->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id,
            'titulo' => utf8_encode($objeto->titulo),
            'autor' => utf8_encode($objeto->autor),
            'estado' => utf8_encode($objeto->estado),
            'name_category' => $objeto->name_category
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}