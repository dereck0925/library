    <head>
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="../Recursos/img/logo.ico" />
        <!-- jQuery -->
        <script src="../Recursos/js/jquery.min.js"></script>
        <!-- Font Awesome -->
        <link rel="stylesheet" href="../Recursos/css/all.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="../Recursos/css/adminlte.min.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">


        <!-- Bootstrap 4 -->
        <script src="../Recursos/js/bootstrap.bundle.min.js"></script>
        <!-- AdminLTE App -->
        <script src="../Recursos/js/adminlte.min.js"></script>
        <!-- AdminLTE for demo purposes -->
        <script src="../Recursos/js/demo.js"></script>
        <!-- Sweet alert -->
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        <!-- Select 2 -->
        <script src="../Recursos/js/select2.js"></script>
        <!-- Select 2 -->
        <link rel="stylesheet" href="../Recursos/css/select2.css">

        <link rel="stylesheet" href="../Recursos/css/styles.css">
    </head>

    <body class="hold-transition sidebar-mini">
        <!-- Site wrapper -->
        <div class="wrapper">
            <!-- Navbar -->
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="adm_panel.php" class="nav-link">Inicio</a>
                    </li>
                </ul>

                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <!-- Messages Dropdown Menu -->
                    <a href="../Controlador/logout.php">Cerrar Sesión</a>
                </ul>
            </nav>
            <!-- /.navbar -->

            <!-- Main Sidebar Container -->
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <!-- Brand Logo -->
                <a href="../Vista/adm_panel.php" class="brand-link">
                    <img src="../Recursos/img/logo.png" class="brand-image img-circle elevation-3" style="opacity: .8">
                    <span class="brand-text font-weight-light">Libreria</span>
                </a>

                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar user (optional) -->
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img id="avatar4" class="img-circle elevation-2" alt="User Image">
                        </div>
                        <div class="info">
                            <a href="#" class="d-block"><?php echo $_SESSION['name_user']; ?></a>
                        </div>
                    </div>

                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <!-- Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library -->
                            <?php
                            if (isset($_SESSION['name_user'])) {
                            ?>
                                
                                <li class="nav-item">
                                    <a href="../Vista/adm_biblioteca.php?modulo=biblioteca" class="nav-link <?php echo $_GET['modulo'] == 'biblioteca' ? 'active' : '' ?>">
                                        <i class="nav-icon fas fa-book"></i>
                                        <p>
                                            Biblioteca 
                                        </p>
                                    </a>
                                </li>
                            <?php
                            }                            
                            ?>
                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
            </aside>
        </div>
    </body>