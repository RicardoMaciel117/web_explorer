$("#ocultar_panel_lateral").bind("click", function() {
	$("#barra-lateral").css("width", "0px");
	$("#pantalla_principal").css({
		"margin-left": "0px",
		"width": "99.5%"
	});
	$("#mostrar_panel-lateral").css("visibility", "visible");
});

$("#app_bar").bind("click", function() {
	alert("Mostrar las apps");
});

$(document).bind("click", function(e) {
	if (activar_context_menu) {
		activar_context_menu = false;
		menu_context.visibility = "hidden";
	}
});

$("#mostrar-ruta-editable").bind("click", function() {
	document.getElementById("ocultar_panel_lateral").click();
	$("#ruta-editable").toggle();
});

$("#mostrar_panel-lateral").bind("click", function() {

	$("#barra-lateral").css("width", "200px");
	$("#pantalla_principal").css({
		"width": "calc(100% - 209px)",
		"margin-left": "202px"
	});

	$("#mostrar_panel-lateral").css("visibility", "hidden");

});

$("#dir-ruta_left").bind("click", function() {
	//Tags: Retroceder, ir a atras, ruta archivo
	if (rutasAlmacenadas.length > 1) {
		rutasAlmacenadas.pop();
		const rutaAnterior = rutasAlmacenadas[rutasAlmacenadas.length - 1];
		//rutasAlmacenadas = rutasAlmacenadas.slice(0 , rutasAlmacenadas.length-2);
		obtenerArchivos(rutaAnterior);
		rutasAlmacenadas.pop();
	}
});

$("#subir-archivo").bind("click", function() {
    mostrarModal("subir_elemento");
});

$("#editar-archivo").bind("click", function() {

	//window.open(window.location.href + "ace/?file=" + rutaDeDescarga, '_blank');

	const select_arch = window.btoa(archivoSeleccionado);
	window.open(window.location.href + "ace/?file=" + select_arch, '_blank');

});


$("#app_show_bar").bind("click", function() {
	show_apps_frame();
});

$("#editar-archivo-self").bind("click", function() {

	//window.open(window.location.href + "ace/?file=" + rutaDeDescarga, '_blank');

	const select_arch = window.btoa(archivoSeleccionado);
	add_app_to_frame(window.location.href + "ace/?file=" + select_arch);
	show_apps_frame();
	//window.open(window.location.href + "ace/?file=" + select_arch, '_blank');

});


$("#crear_archivo_men").bind("click", function() {
    mostrarModal("crear_elemento");
});

$("#cancelar_crear_elemento").bind("click", function() {
  ocultarModal();
});

$("#comprimir_directorio_men").bind("click", function() {
    mostrarModal("comprimir_directorio");
});

$("#descargar-archivo").bind("click", function() {
	const select_arch = window.btoa(archivoSeleccionado);
	window.open(window.location.href + "getResource?" + select_arch, '_blank');
});

$("#crear_elemento").bind("click", function() {
    const nombre = $("#nombre_elemento").val();
    if(nombre){
        crearArchivo(nombre);
    }
    else{
        alert("Debe asignar un nombre al archivo");
    }

});

$("#comprimir_directorio").bind("click", function() {
    const nombre = $("#nombre_elemento").val();
    if(nombre){
        comprimirDirectorio(nombre);
    }
    else{
        alert("Debe asignar un nombre al archivo .zip");
    }
});

function mostrarModal(boton){
  $("#modal_crear_elemento").css("display", "block");
  $("#crear_elemento").css("display", "none");
  $("#comprimir_directorio").css("display", "none");
  $("#nombre_elemento").val("");
  $("#"+boton).css("display", "block");
}

function ocultarModal(){
    $("#modal_crear_elemento").css("display", "none");
}

function eventoRutaEditable() {
	$(".btn-ruta-edit").each(function() {
		//alert($(this).text());
		$(this).bind("click", function() {
			const RUTA_Editable = $(this).attr("title");
			obtenerArchivos(RUTA_Editable);
		});
	});
}

$("body").on("keydown", function (e) {
	if(e.ctrlKey && String.fromCharCode(e.keyCode) == 'F'){
		e.preventDefault();
		const caja_busqueda = $("#busqueda");
		$("#modal_busqueda").css("display", "block");
		caja_busqueda.val("");
		caja_busqueda.focus();
        return false;
	}

	if(e.keyCode == 27){
		$(this).val("");
		$("#modal_busqueda").css("display", "none");
		cancelarBusqueda();
		return false;
	}
});

$("#busqueda").on("keyup", function (e) {
	if(e.keyCode == 27){
		$(this).val("");
		$("#modal_busqueda").css("display", "none");
		cancelarBusqueda();
		return false;
	}

	if($(this).val().length >= 3){
		buscarArchivos($(this).val());
	}
});

$("#bsq_archivo_anterior").bind("click", function(){
    buscarArchivoAnterior();
});

$("#bsq_archivo_siguiente").bind("click", function(){
    buscarArchivoSiguiente();
});


$("#abrir-directorio").bind("click", function(){
	obtenerArchivos(archivoSeleccionado);
	//alert("Se va a abrir este mad: "+archivoSeleccionado);
});

function eventoFavoritos() {
	$(".contenedor-logos").each(function() {
		//alert($(this).text());
		$(this).bind("click", function() {
			const RUTA_Favorito = $(this).attr("title");
			carpetaProyecto = $(this).text()+" -> ";
			obtenerArchivos(RUTA_Favorito);
		});
	});
}