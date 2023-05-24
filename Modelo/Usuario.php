<?php
include_once '../Conexion/Conexion.php';
class Usuario
{
     //Constructor
     var $objetos;
     public function __CONSTRUCT()
     {
          $db = new Conexion();
          $this->acceso = $db->pdo;
     }

     //
     function loguearse($username, $password)
     {
          $sql = "SELECT id, nombre_completo, username, avatar, estado FROM usuario WHERE username=:username AND password=:password";
          $query = $this->acceso->prepare($sql);
          $query->execute(array(':username' => $username, ':password' => $password));
          $this->objetos = $query->fetchall();
          return $this->objetos;
     }

     function buscar_avatar($id)
     {
          $sql = "SELECT avatar FROM usuario WHERE id=:id";
          $query = $this->acceso->prepare($sql);
          $query->execute(array(':id' => $id));
          $this->objetos = $query->fetchall();
          return $this->objetos;
     }
}
