$(document).ready(function() {

    var id_usuario = $('#id_usuario').val();
    buscar_avatar(id_usuario);
    listarReservas();
    totalReservas();

    //Function to read avatar by user
    function buscar_avatar(id) {
        funcion = 'buscarAvatar';
        $.post('../Controlador/usuario_controler.php', { id, funcion }, (response) => {
            const usuario = JSON.parse(response);
            $('#avatar4').attr('src', usuario.avatar);
        });
    }

    //
    function listarReservas() {
        var funcion = "listarReservas";
        $.post('../Controlador/libro_controler.php', { funcion, id_usuario }, (response) => {
            const objetos = JSON.parse(response);
            num = 0;
            let template = `<div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table class="table table-bordered center-all">
                                            <thead notiHeader>                  
                                                <tr>
                                                    <th style="width: 2px">#</th>                                                    
                                                    <th style="width: 8px">Title</th>
                                                    <th style="width: 20px">Author</th>
                                                    <th style="width: 60x">Days</th>
                                                    <th style="width: 10px">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

            objetos.forEach(objeto => {
                num += 1;
                template += `                   <tr idReserve='${objeto.id}' idLibro='${objeto.id_libro}'>
                                                    <td style="width: 2px">${num}</td>
                                                    <td style="width: 8px">${objeto.titulo}</td>
                                                    <td style="width: 20px">${objeto.autor}</td>
                                                    <td style="width: 60px">${objeto.dias}</td>
                                                    <td style="width: 10px">
                                                        <button class='deleteReserve btn btn-sm btn-danger mr-1' type='button' >
                                                            <i class="fas fa-trash"></i>
                                                        </button>`;
                
                template += ` </td>
                                                </tr>`;

            });
            template += `                   </tbody>
                                        </table>
                                    </div> 
                                </div>
            `
            $('#divMisReserves').html(template);
        });
    }

    $(document).on('click', '.deleteReserve', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('idReserve');
        const id_libro = $(elemento).attr('idLibro');
        funcion = 'deleteReserve';
        $.post('../Controlador/libro_controler.php', { id, funcion, id_libro }, (response) => {
            listarReservas();
        });
    });

    
    function totalReservas() {  
        funcion = 'totalReservas';
        $.post('../Controlador/libro_controler.php', { id_usuario, funcion }, (response) => {
            const obj = JSON.parse(response);
            $('#bdTotalReserves').html("Reserves total: "+obj.total);            
        });
    }

});