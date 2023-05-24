$(document).ready(function() {
    var tipo_usuario = $('#tipo_usuario').val();
    var id_region = $('#id_region').val();
    var id_cargo = $('#id_cargo').val();

    if (tipo_usuario == 3) {
        $('#btn_crear_usuario').hide();
    }
    var funcion = "";
    var id_usuario = $('#id_usuario').val();
    var edit = false;
    buscar_general(id_usuario);
    buscarGestionUsuarios();
    buscar_avatar(id_usuario);

    function buscar_avatar(id) {
        funcion = 'buscarAvatar';
        $.post('../Controlador/usuario_controler.php', { id, funcion }, (response) => {
            const usuario = JSON.parse(response);
            $('#avatar4').attr('src', usuario.avatar);
        });
    }

    function buscar_general(dato) {
        funcion = 'buscar_datos_general';
        $.post('../Controlador/usuario_controler.php', { dato, funcion }, (response) => {
            const obj = JSON.parse(response);
            $('#edad_usuario').html(obj.edad_usuario);
            $('#fecha_nac').html(obj.fecha_nac);
            $('#doc_usuario').html(obj.doc_id);
            $('#p_telefono').html(obj.tel_voluntario);
            $('#p_celular').html(obj.cel_voluntario);
            $('#p_residencia').html(obj.dir_voluntario);
            $('#p_email').html(obj.email_voluntario);
            $('#p_region').html(obj.nombre_region);
            $('#p_cargo').html(obj.nombre_cargo);
            $('#p_tipo').html(obj.nombre_tipo);
            $('#p_info').html(obj.inf_voluntario);
            $('#avatar1').attr('src', obj.avatar);
            $('#avatar2').attr('src', obj.avatar);
            $('#avatar3').attr('src', obj.avatar);
            buscar_avatar(id_usuario);
        })
    };

    $(document).on('click', '.edit', (e) => {
        funcion = 'llenar_datos';
        edit = true;
        $.post('../Controlador/usuario_controler.php', { funcion, id_usuario }, (response) => {
            const usuario = JSON.parse(response);
            $('#txtNombreCompleto').val(String(usuario.nombre_completo));
            $('#txtDoc_id').val(String(usuario.doc_id));
            $('#txtTecha_nac').val(String(usuario.fecha_nac));
            $('#txtLugarNac').val(String(usuario.lugar_nac));
            $('#txtTelefono').val(String(usuario.tel_voluntario));
            $('#txtCelular').val(String(usuario.cel_voluntario));
            $('#txtDireccion').val(String(usuario.dir_voluntario));
            $('#txtEmail').val(String(usuario.email_voluntario));
            $('#txtAdicional').val(String(usuario.inf_voluntario));
            $('#txtTwitter').val(String(usuario.twitter));
            $('#txtFb').val(String(usuario.facebook));
            $('#txtInstagram').val(String(usuario.instagram));
        })
    });

    $('#formEditarGeneral').submit(e => {
        if (edit == true) {
            let nombre = $('#txtNombreCompleto').val();
            let doc_id = $('#txtDoc_id').val();
            let fecha_nac = $('#txtTecha_nac').val();
            let lugarNac = $('#txtLugarNac').val();
            let telefono = $('#txtTelefono').val();
            let celular = $('#txtCelular').val();
            let direccion = $('#txtDireccion').val();
            let email = $('#txtEmail').val();
            let inf_voluntario = $('#txtAdicional').val();
            let twitter = $('#txtTwitter').val();
            let fb = $('#txtFb').val();
            let instagram = $('#txtInstagram').val();
            funcion = 'editar_general';
            $.post('../Controlador/usuario_controler.php', { id_usuario, funcion, nombre, doc_id, fecha_nac, lugarNac, telefono, celular, direccion, email, inf_voluntario, twitter, fb, instagram }, (response) => {
                if (response == 'editado') {
                    $('#editado').hide('slow');
                    $('#editado').show(1000);
                    $('#editado').hide(2000);
                    $('#formEditarGeneral').trigger('reset');
                    edit = false;
                    buscar_general(id_usuario);
                }

            })
        } else {
            $('#noeditado').hide('slow');
            $('#noeditado').show(1000);
            $('#noeditado').hide(2000);
            $('#formEditarGeneral').trigger('reset');
        }
        e.preventDefault();
    });

    $('#form_pass').submit(e => {
        let nameUser = $('#txtUsuarioCh').val();
        let oldpass = $('#oldPass').val();
        let newpass = $('#newPass').val();
        funcion = "changePass";
        $.post('../Controlador/usuario_controler.php', { id_usuario, funcion, nameUser, oldpass, newpass }, (response) => {
            if (response == 'update') {
                $('#update').hide('slow');
                $('#update').show(1000);
                $('#update').hide(8000);
                $('#form_pass').trigger('reset');
            } else {
                $('#noUpdate').hide('slow');
                $('#noUpdate').show(1000);
                $('#noUpdate').hide(5000);
                $('#noUpdate').html(response);
            }
        });
        e.preventDefault();
    });

    $('#form_avatar').submit(e => {
        let formData = new FormData($('#form_avatar')[0]);
        $.ajax({
            url: '../Controlador/usuario_controler.php',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done(function(response) {
            const json = JSON.parse(response);
            if (json.alert == 'edit') {
                $('#avatar3').attr('src', json.ruta);
                $('#updateAvatar').hide('slow');
                $('#updateAvatar').show(1000);
                $('#updateAvatar').hide(2000);
                $('#form_avatar').trigger('reset');
                buscar_general(id_usuario);
                buscar_avatar(id_usuario);
            } else {
                $('#noUpdateAvatar').hide('slow');
                $('#noUpdateAvatar').show(1000);
                $('#noUpdateAvatar').hide(2000);
                $('#form_avatar').trigger('reset');
            }
        });
        e.preventDefault();
    });

    $(document).on('keyup', '#TxtBuscarVoluntario', function() {
        let consulta = $(this).val();
        if (consulta != "") {
            buscarGestionUsuarios(consulta);
        } else {
            buscarGestionUsuarios();
        }
    });

    function buscarGestionUsuarios(consulta) {
        var funcion = "buscar_gestion_usuario";
        $.post('../Controlador/usuario_controler.php', { consulta, funcion, id_cargo, id_region, tipo_usuario }, (response) => {
            const usuarios = JSON.parse(response);
            let template = "";
            usuarios.forEach(usuario => {
                template += `<div usuarioId="${usuario.id}" estadoU="${usuario.estado}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                <div class="card bg-light">
                  <div class="card-header text-muted border-bottom-0">`;
                if (usuario.tipo_usuario == 1) {
                    template += `<h1 class="badge badge-dark">${usuario.nombre_tipo}</h1>`;
                }
                if (usuario.tipo_usuario == 2) {
                    template += `<h1 class='badge badge-warning'>${usuario.nombre_tipo}</h1>`;
                }
                if (usuario.tipo_usuario == 3) {
                    template += `<h1 class='badge badge-info'>${usuario.nombre_tipo}</h1>`;
                }
                if (usuario.estado == "Activo") {
                    template += `<h1 class="badge badge-success ml-1">${usuario.estado}</h1>`;
                } else {
                    template += `<h1 class="badge badge-danger ml-1">${usuario.estado}</h1>`;
                }
                template += `</div>
                  <div class="card-body pt-0">
                    <div class="row">
                      <div class="col-8">
                        <h2 class="lead"><b>${usuario.nombre_completo}</b></h2>
                        <p class="text-muted text-sm"><b>Sobre mi: </b> ${usuario.inf_voluntario} </p>
                        <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-birthday-cake"></i></span> Edad: ${usuario.edad} años</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Dirección: ${usuario.res_usuario}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Teléfono #: ${usuario.tel_voluntario}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span> Email: ${usuario.email_voluntario}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-map-marker-alt"></i></span> Región: ${usuario.nombre_region}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-sitemap"></i></span> Cargo: ${usuario.nombre_cargo}</li>
                        </ul>`;
                if (usuario.cel_voluntario != null && usuario.cel_voluntario != '') {
                    template += `<a href="https://api.whatsapp.com/send?phone=+57${usuario.cel_voluntario}&amp;text=Hola, me interesaría obtener información" target="_blank">
                                    <img src="../Recursos/img/whatsapp_icon.png" alt="" width="30px">
                                </a>`;
                }
                if (usuario.facebook != null && usuario.facebook != '') {
                    template += `<a href="${usuario.facebook}" target="_blank">
                                    <img src="../Recursos/img/facebook_icon.png" alt="" width="30px">
                                </a>`;
                }
                if (usuario.instagram != null && usuario.instagram != '') {
                    template += `<a href="${usuario.instagram}" target="_blank">
                                    <img src="../Recursos/img/instagram_icon.png" alt="" width="30px">
                                </a>`;
                }
                if (usuario.twitter != null && usuario.twitter != '') {
                    template += `<a href="${usuario.twitter}" target="_blank">
                                    <img src="../Recursos/img/twitter_icon.png" alt="" width="30px">
                                </a>`;
                }

                template += `</div>
                      <div class="col-4 text-center">
                        <img src="${usuario.avatar}" alt="" class="img-circle img-fluid" style='width: 80%'>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="text-right">`;
                if (id_usuario != usuario.id) {
                    if (tipo_usuario <= 2) {
                        if (tipo_usuario == 1) {
                            if (usuario.tipo_usuario == 3) {
                                template += `<button class='ascender btn btn-sm btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#confirmar_resp" title='Ascender'>
                                <i class="fas fa-sort-amount-up mr-1"></i> Ascender
                            </button>`;
                            }
                            if (usuario.tipo_usuario == 2) {
                                template += `<button class='descender btn btn-sm btn-secondary' type='button' data-bs-toggle="modal" data-bs-target="#confirmar_resp" title='Descender'>
                                <i class="fas fa-sort-amount-down mr-1"></i> Descender
                            </button>`;
                            }
                        }
                        if (usuario.tipo_usuario != 1) {
                            if (usuario.estado == "Activo") {
                                template += `<button class='activacion btn btn-sm btn-danger ml-1' type='button' data-bs-toggle="modal" data-bs-target="#confirmar_resp" title='Inactivar'>
                                <i class="fas fa-window-close ml-1"></i>Inactivar
                            </button>`;
                            } else {
                                template += `<button class='activacion btn btn-sm btn-success ml-1' type='button' data-bs-toggle="modal" data-bs-target="#confirmar_resp" title='Activar'>
                                <i class="fas fa-window-close ml-1"></i>Activar
                            </button>`;
                            }
                        }
                    }
                }
                if ((id_cargo != 1)) {
                    template += `<a href='../Vista/hv_pdf.php?id=${usuario.id}&hoja=carta' target='_blank'><button class='btn btn-sm btn-warning ml-1' type='button' title='Exportar'>
                        <i class="fas fa-file-pdf"></i> PDF
                    </button></a>`;
                }
                template += `</div>
                  </div>
                </div>
              </div>`;
            });
            $('#busquedaVoluntario').html(template);
        });
    }

    $('#form_crear_usuario').submit(e => {
        let nombre = $('#txtNombreUsuario').val();
        let cel = $('#txtCelVoluntario').val();
        let fechaNac = $('#txtFecNac').val();
        let documento = $('#txtDoc').val();
        let email = $('#txtEmailUsuario').val();
        let id_cargo = $('#selCargo').val();
        let id_region = $('#txtRegion').val();
        funcion = 'crear_voluntario';
        $.post('../Controlador/usuario_controler.php', { id_usuario, funcion, nombre, cel, fechaNac, documento, email, id_cargo, id_region }, (response) => {
            alert(response);
            console.log(response);
            if (response == 'agregado') {
                $('#create').hide('slow');
                $('#create').show(1000);
                $('#create').hide(2000);
                $('#form_crear_usuario').trigger('reset');
                buscarGestionUsuarios();
            } else {
                $('#noCreate').hide('slow');
                $('#noCreate').show(1000);
                $('#noCreate').hide(2000);
                $('#noCreate').html(response);
            }
        });
        e.preventDefault();
    });
    $(document).on('click', '.ascender', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('usuarioId');
        funcion = "ascender";
        $('#txtId_userConfirm').val(id);
        $('#txtFuncionConfirm').val(funcion);
    });
    $(document).on('click', '.descender', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('usuarioId');
        funcion = "descender";
        $('#txtId_userConfirm').val(id);
        $('#txtFuncionConfirm').val(funcion);
    });
    $(document).on('click', '.activacion', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('usuarioId');
        const estado = $(elemento).attr('estadoU');
        funcion = "activacion";
        $('#txtId_userConfirm').val(id);
        $('#txtFuncionConfirm').val(funcion);
        $('#txtEstadoConfirm').val(estado);
    });
    $('#form_confirmar_user').submit(e => {
        let id = $('#txtId_userConfirm').val();
        funcion = $('#txtFuncionConfirm').val();
        let pass = $('#txtPass').val();
        let estado = $('#txtEstadoConfirm').val();
        $.post('../Controlador/usuario_controler.php', { id, funcion, pass, estado }, (response) => {
            if (response == 'ascendido' || response == 'descendido' || response == 'actualizado') {
                buscarGestionUsuarios();
                $('#updateAsc').hide('slow');
                $('#updateAsc').show(1000);
                $('#updateAsc').hide(2000);
                $('#form_confirmar_user').trigger('reset');
                buscarGestionUsuarios();
            } else {
                $('#noUpdateAsc').hide('slow');
                $('#noUpdateAsc').show(1000);
                $('#noUpdateAsc').html(response);
            }
        });
        e.preventDefault();
    });

});