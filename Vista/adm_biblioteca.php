<?php
$año = date('Y');
session_start();
if (isset($_SESSION['id_user'])) {
    include_once '../Vista/layouts/header.php'
?>
    <title>Adm | ESAL</title>
    <?php
    include_once '../Vista/layouts/nav.php';
    ?>
    <!-- Modal -->
    <script src="../Recursos/js/libro.js"></script>
    <input type="hidden" id="txtId_usuario" value="<?php echo $_SESSION['id_user']; ?>">
    <div class="modal fade" id="crearReserva" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="card card-success">
                    <div class="modal-header notiHeader">
                        <h3 class="card-title">Book Reservve</h3>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style="color: white;">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div>
                            <p id="pTitleBook"></p>
                            <p id="pAuthor"></p>
                        </div>
                        <div class="col-sm">
                            <h4>Description</h4>
                            <p id="pDescription"></p>
                        </div>
                        <div class="col-sm">
                            <img style="width: 70%;" id="imgBook">
                        </div>
                    </div>
                    <div class="card-footer">
                        <form id="form_create_reserve">
                            <div class="div form-group">
                                <input type="hidden" class="form-control" id="txtIdLibro" name="id_libro" required>
                            </div>
                            <div class="alert alert-success text-center" id="divCreate" style="display: none;">
                                <span><i class='fas fa-check m-1'> Libro reservado</i></span>
                            </div>
                            <div class="alert alert-danger text-center" id="divNoCreate" style="display: none;">
                                <span><i class='fas fa-times m-1'></i></span>
                            </div>
                            <div class="div form-group d-flex align-items-stretch">
                                <label for="txtCantDias">Days</label>
                                <input type="number" id="txtCantDias" class="form-control" style="width: 30%;" required>
                                <button type="submit" class="btn bg-gradient-primary float-right m-1">Reservar</button>
                            </div>
                            <button type="button" class="btn btn-outline-secondary float-right m-1" data-bs-dismiss="modal">Cerrar</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="d-flex align-items-stretch">Filter by
                            <div id="divSelectCategory">
                                <select id="selCategory" class="form-control">
                                    <option value="0">Category</option>

                                </select>
                            </div>
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="../Vista/adm_panel.php">Inicio</a></li>
                            <li class="breadcrumb-item active">Library</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section>
            <div class="container-fluid">
                <div class="card card-success">
                    <div class="modal-header notiHeader">
                        <h3 class="card-title">Search Book</h3>
                        <div class="input-group">
                            <input type="text" id="TxtSearchBook" placeholder="Enter title, author or category" class="form-control float-left">
                            <div class="input-group-append">
                                <button class="btn btn-default"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pb-0">
                        <div id="searchBooks" class="row d-flex align-items-stretch"></div>
                    </div>
                    <div class="card-footer">
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- /.content-wrapper -->
<?php
    include_once '../Vista/layouts/footer.php';
} else {
    header('Location: ../index.php');
}
?>