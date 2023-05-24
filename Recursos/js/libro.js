$(document).ready(function () {

    var funcion = "";
    // User id is loaded
    var id_usuario = $('#txtId_usuario').val();

    //Functions
    buscar_avatar(id_usuario);
    buscarLibros();
    cargarSelectCategoria();

    function buscar_avatar() {
        var id = $('#txtId_usuario').val();
        funcion = 'buscarAvatar';
        $.post('../Controlador/usuario_controler.php', { id, funcion }, (response) => {
            const usuario = JSON.parse(response);
            $('#avatar4').attr('src', usuario.avatar);
        });
    }

    //Check if the search field is empty
    //If it is not empty, execute the function buscarLibros with the search value
    $(document).on('keyup', '#TxtSearchBook', function () {
        let consulta = $(this).val();
        if (consulta != "") {
            buscarLibros(consulta);
        } else {
            buscarLibros();
        }
    });

    //function  to list or search for a book by title, author or category
    function buscarLibros(consulta) {
        var funcion = "buscar_libros";
        $.post('../Controlador/libro_controler.php', { consulta, funcion }, (response) => {
            const objetos = JSON.parse(response);
            num = 0;
            let template = `<div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table class="table table-bordered center-all">
                                            <thead notiHeader>                  
                                                <tr>
                                                    <th style="width: 2px">#</th>                                                    
                                                    <th>Title</th>
                                                    <th>Author</th>
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

            objetos.forEach(objeto => {
                num += 1;
                template += `                   <tr idReserve=${objeto.id}>
                                                    <td>${num}</td>
                                                    <td>${objeto.titulo}</td>
                                                    <td>${objeto.autor}</td>
                                                    <td>${objeto.name_category}</td>
                                                    <td style="width: 10px">
                                                        <button class='reserve btn btn-sm btn-info mr-1' type='button' data-bs-toggle="modal" data-bs-target="#crearReserva">
                                                            <i class="fas fa-file-alt mr-1">Reservar</i>
                                                        </button>`;

                template += ` </td>
                                                </tr>`;

            });
            template += `                   </tbody>
                                        </table>
                                    </div> 
                                </div>
            `
            $('#searchBooks').html(template);
        });
    }

    // function that captures the click event of the book button
    //print the book data in the modal
    $(document).on('click', '.reserve', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('idReserve');
        $('#txtIdLibro').val(id);
        funcion = 'chargeBook';
        $.post('../Controlador/libro_controler.php', { id, funcion }, (response) => {
            console.log(response);
            const obj = JSON.parse(response);
            $('#pTitleBook').html("<b>Title: </b>" + obj.titulo);
            $('#pAuthor').html("<b>Author: </b>" + obj.autor);
            $('#pDescription').html(obj.descripcion);
            $('#imgBook').attr('src', obj.imagen);

        });
    });

    //function that captures the data of the form 'form_create_reserve' to register a reserve
    $('#form_create_reserve').submit(e => {
        let id_libro = $('#txtIdLibro').val();
        let dias = $('#txtCantDias').val();
        funcion = 'reserveBook';
        $.post('../Controlador/libro_controler.php', { funcion, id_libro, dias, id_usuario }, (response) => {
            if (response == 'create') {
                $('#divCreate').hide('slow');
                $('#divCreate').show(1000);
                $('#divCreate').hide(2000);
                buscarLibros();
            } else {
                $('#divNoCreate').hide('slow');
                $('#divNoCreate').show(1000);
                $('#divNoCreate').hide(2000);
                $('#divNoCreate').html(response);
            }
        });
        e.preventDefault();
    });


    // Function that loads the categories in the select
    function cargarSelectCategoria(consulta) {
        var funcion = "cargarSelect";
        $.post('../Controlador/libro_controler.php', { consulta, funcion }, (response) => {
            const objetos = JSON.parse(response);
            num = 0;
            let template = `<option value="0">Category</option>`;
            objetos.forEach(objeto => {
                num += 1;
                template += `<option value="${objeto.id}">${objeto.name_category}</option>`;
            });
            $('#selCategory').html(template);
        });
    }

    // Function to filter books by category
    $("#selCategory").change(function () {
        var funcion = "listByCategory";
        let id_category = $('#selCategory').val();
        $.post('../Controlador/libro_controler.php', { funcion, id_category }, (response) => {
            console.log(response)
            const objetos = JSON.parse(response);
            num = 0;
            let template = `<div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table class="table table-bordered center-all">
                                            <thead notiHeader>                  
                                                <tr>
                                                    <th style="width: 2px">#</th>                                                    
                                                    <th>Title</th>
                                                    <th>Author</th>
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

            objetos.forEach(objeto => {
                num += 1;
                template += `                   <tr idReserve=${objeto.id}>
                                                    <td>${num}</td>
                                                    <td>${objeto.titulo}</td>
                                                    <td>${objeto.autor}</td>
                                                    <td>${objeto.name_category}</td>
                                                    <td style="width: 10px">
                                                        <button class='reserve btn btn-sm btn-info mr-1' type='button' data-bs-toggle="modal" data-bs-target="#crearReserva">
                                                            <i class="fas fa-file-alt mr-1">Reservar</i>
                                                        </button>`;

                template += ` </td>
                                                </tr>`;

            });
            template += `                   </tbody>
                                        </table>
                                    </div> 
                                </div>
            `
            $('#searchBooks').html(template);
        });
    });

});