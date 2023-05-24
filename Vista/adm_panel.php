<?php
session_start();
if (isset($_SESSION['name_user'])) {
    include_once '../Vista/layouts/header.php';
    $fecha = date("Y-m-d");;
?>
    <title>Panel Libreria</title>
    <?php
    include_once '../Vista/layouts/nav.php';
    ?>
    <script src="../Recursos/js/inicio.js"></script>
    <input type="hidden" id="id_usuario" value="<?php echo $_SESSION['id_user']; ?>">
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>My reserves </h1><h5 class='badge badge-warning' id="bdTotalReserves"></h5>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <div class="container">
            <div class="row" id="divMisReserves">
                
            </div>
        </div>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
<?php
    include_once '../Vista/layouts/footer.php';
} else {
    header('Location: ../index.php');
}
?>