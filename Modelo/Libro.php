<?php
include_once '../Conexion/Conexion.php';
class Libro
{
    var $objetos;
    public function __CONSTRUCT()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    //SQL query to create a book
    function createBook($titulo, $autor, $imagen, $descripcion, $id_category)
    {
        $sql = "INSERT INTO libro(titulo, autor, imagen, descripcion, estado, id_category ) VALUES(:titulo, :autor, :imagen, :descripcion, 'Disponible', :id_category )";
        $query = $this->acceso->prepare($sql);
        if ($query->execute(array(':titulo' => $titulo, ':autor' => "$autor", ':imagen' => $imagen, ':descripcion' => $descripcion, ':id_category ' => $id_category))) {
            echo 'create';
        } else {
            echo 'Error al registrar el libro ';
        }
    }

    //SQL query to list a book reserved by a user
    function listarReservas()
    {
        $id = $_POST['id_usuario'];
        $sql = "SELECT R.id, L.titulo, L.autor, R.dias, R.id_libro FROM reserva R JOIN libro L ON R.id_libro=L.id WHERE R.id_usuario=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }

    //SQL query to list a book by category
    function listByCategory($id_category)
    {
        if ($id_category <> 0) {
            $sql = "SELECT L.id, L.titulo, L.autor, L.imagen, L.descripcion, L.estado, C.name_category FROM libro L JOIN categoria C ON L.id_category=C.id WHERE L.id_category=:id_category";
        } else {
            $sql = "SELECT L.id, L.titulo, L.autor, L.imagen, L.descripcion, L.estado, C.name_category FROM libro L JOIN categoria C ON L.id_category=C.id ";
        }

        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id_category' => $id_category));
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }

    // SQL query to find available books
    function buscar()
    {
        if (!empty($_POST['consulta'])) {
            $consulta = $_POST['consulta'];
            $sql = "SELECT L.id, L.titulo, L.autor, L.imagen, L.descripcion, L.estado, C.name_category FROM libro L JOIN categoria C ON L.id_category=C.id WHERE (titulo LIKE :consulta OR autor LIKE :consulta OR name_category LIKE :consulta ) AND estado='Disponible'";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT L.id, L.titulo, L.autor, L.imagen, L.descripcion, L.estado, C.name_category FROM libro L JOIN categoria C ON L.id_category=C.id WHERE (titulo NOT LIKE '' OR autor NOT LIKE 'null') AND estado='Disponible'";
            $query = $this->acceso->prepare($sql);
            $query->execute(array());
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }

    //SQL query to find a reserve
    function chargeBook($id)
    {
        $sql = "SELECT L.titulo, L.autor, L.imagen, L.descripcion, L.estado, C.name_category FROM libro L JOIN categoria C ON L.id_category=C.id WHERE L.id=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }

    //SQL query to reserve a book
    function reserveBook($id_usuario, $id_libro, $dias)
    {
        $sql = "INSERT INTO reserva(id_usuario, id_libro, dias) VALUES(:id_usuario, :id_libro, :dias)";
        $query = $this->acceso->prepare($sql);

        if ($query->execute(array(':id_usuario' => $id_usuario, ':id_libro' => "$id_libro", ':dias' => $dias))) {
            $sql = "UPDATE libro SET estado='No Disponible' WHERE id=:id_libro";
            $query = $this->acceso->prepare($sql);

            if ($query->execute(array(':id_libro' => "$id_libro"))) {
                echo 'create';
            } else {
                echo 'Error al cambiar el estado del libro';
            }
        } else {
            echo 'Error al registrar la reserva ';
        }
    }

    //SQL query to delete a reserve
    function deleteReserve($id, $id_libro)
    {
        $sql = "DELETE FROM reserva WHERE id=:id";
        $query = $this->acceso->prepare($sql);
        if ($query->execute(array(':id' => $id))) {
            $sql = "UPDATE libro SET estado='Disponible' WHERE id=:id_libro";
            $query = $this->acceso->prepare($sql);
            if ($query->execute(array(':id_libro' => $id_libro))) {
                echo 'delete';
            } else {
                echo 'Error al actualizar el estado del libro';
            }
        } else {
            echo 'Error al eliminar la reserva ';
        }
    }

    // query to update a book
    function editar($id, $titulo, $autor, $imagen, $descripcion, $id_category)
    {
        $sql = "UPDATE libro SET titulo=:titulo, autor=:autor, imagen=:imagen, descripcion=:descripcion, id_category=:id_category WHERE id=:id";
        $query2 = $this->acceso->prepare($sql);
        if ($query2->execute(array(':id' => $id, ':titulo' => "$titulo", ':autor' => $autor, ':imagen' => $imagen, ':descripcion' => $descripcion, ':id_category' => $id_category))) {
            echo 'update';
        } else {
            echo 'Error al actualizar el libro ';
        }
    }

    //query to count the total reservations of a user
    function totalReservas($id)
    {
        $sql = "SELECT COUNT(reserva.id) AS total FROM reserva WHERE reserva.id_usuario=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }

    //SQL query to list a category
    function cargarSelect()
    {
        $sql = "SELECT * FROM categoria";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }
}
