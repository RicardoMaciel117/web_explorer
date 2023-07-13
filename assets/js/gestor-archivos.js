let cont_canvas = 0;

let archivos_encontrados = [];

let archivos_resaltados = [];

let index_arch_encontrado = 0;

function colocarArchivos(archivos){

	cont_canvas = 0;



	$("#contenedor-archivos").empty();

	colocarRutaEditable(archivos["RUTA"]);
	//Si hay historial


	$("#dir-ruta_left").attr("title", rutasAlmacenadas[ rutasAlmacenadas.length-1 ]);

	const dirs = archivos.dirs;
	for(i in dirs){
		cont_canvas++;
		generarObjetoArchivo(dirs[i], "folder-icon", archivos["RUTA"], cont_canvas );
	}

	archivos.files.filter(Boolean).forEach(function(arch){
		cont_canvas++;
		generarObjetoArchivo(arch["file_name"], arch["mime_type"], archivos["RUTA"], cont_canvas );
	});




	$(".archivos").each(function(){
		//console.log($(this).text());

		/*
		$(this).bind("click", function(){
			alert($(this).attr("title")+" -> "+$(this).attr("title").length);
		});
		*/

		$(this).dblclick(function(){
			if($(this).attr("itemid") != "folder-icon"){
				//alert("Editar archivo: "+archivos["RUTA"]+$(this).attr("title"));
				abrirArchivo($(this).attr("title"), $(this).attr("itemid"), archivos["RUTA"]);
			}
			else{
				//alert("Abrir carpeta: "+archivos["RUTA"]+$(this).attr("title"));
				obtenerArchivos(archivos["RUTA"]+$(this).attr("title"));
			}
			//alert(archivos["RUTA"])
		});

		$(this).bind("contextmenu",function(e){
		//$(document).bind("contextmenu",function(e){
			activar_context_menu = true;
			archivoSeleccionado = archivos["RUTA"]+$(this).attr("title");

			if($(this).attr("itemid") != "folder-icon"){
				mostrarMenu("Archs", e);
			}
			else{
				mostrarMenu("Dirs", e);
			}
			e.preventDefault();
		});
	});

	for(i = 1; i <= cont_canvas; i++){
		setCanvicon(i);
	}

}

function generarObjetoArchivo(nombre, mime_type, ruta, c_canvas){

	const etiquetas = [];
	let contador_letras = 0;
	etiquetas.push("<div class='letra-etiqueta'>&nbsp;</div>");
	nombre.split("").forEach(function(letra){

		if(letra == " "){
			letra = "&nbsp;";
		}

		contador_letras++;
		if(contador_letras <= 11){
			etiquetas.push("<div class='letra-etiqueta'>"+letra+"</div>");
		}
		else if(contador_letras > 11 ) {
			if(letra == "&nbsp;"){
				etiquetas.push("<br>");
				contador_letras = 0;
			}
			else{
				etiquetas.push("<div class='letra-etiqueta'>"+letra+"</div>");
			}
		}
		else{
			return;
		}
	});

	const archivo_imagen = file_resolver[mime_type];
	const file_img = (archivo_imagen) ? archivo_imagen : mime_type;



	//src-item="${ruta+nombre}"
	$("#contenedor-archivos").append(`
		<div class="archivos" title="${nombre}" itemid="${mime_type}" >
			<div class="canvas_container">
				<canvas id="canv_${c_canvas}"><span >${file_img}</span></canvas>
			</div>

			<div class="etiqueta-archivo">${etiquetas.join("")}</div>
		</div>
	`);
}

//<img src="imgs/icons/mimetypes/${file_img}.png" />

//<object style="position: relative; z-index: 0;" data="imgs/icons/mimetypes/${file_img}.svg" type="image/svg+xml"></object>

//<img src="imgs/icons/mimetypes/${file_img}.svg" />

const image_icons_object = {
	"icons": [],
	"objects" : []
}

function setCanvicon(ic){
	const c = document.getElementById("canv_"+ic);
	const image_icon = c.childNodes[0].innerHTML;
  	const ctx = c.getContext("2d");
	let tmp_img = new Image();
	tmp_img.src = `imgs/icons/mimetypes/${image_icon}.png`;
	tmp_img.onload = function() {

		ctx.drawImage(tmp_img, 34, 0, 64, 64);
	}
}

function setIcon(id_canvas){


	let image_icon = element.attr("alt");

	let icon_index = image_icons_object["icons"].indexOf(image_icon);

	console.log("Set icon: "+icon_index);

	if(icon_index == -1){
		image_icons_object["icons"].push(image_icon);
		icon_index = image_icons_object["icons"].length -1;
		let tmp_img = new Image();
		tmp_img.src = `imgs/icons/mimetypes/${image_icon}.png`;
		image_icons_object["objects"].push(tmp_img);

		tmp_img.onload = function() {
			//document.getElementById('contenedor-archivos').appendChild(image_icons_object["objects"][icon_index]);
			const canvas = element[0].getContext('2d');

			canvas.drawImage(image_icons_object["objects"][icon_index], 0, 0);
			return false;
		}
	}

	const canvas = element[0].getContext('2d');
	canvas.drawImage(image_icons_object["objects"][icon_index], 0, 0);


}

function colocarFavoritos(){

	const favoritos = [
	    {"html": "/var/www/html/"}
	];
	const html_favoritos = [];

	for(i in favoritos){
		const ob_k = Object.keys(favoritos[i])[0];
		html_favoritos.push(
			`<div title="${favoritos[i][ob_k]}" class="contenedor-logos">
				<span class="folder-icono">🖿</span>
				<span class="folder-etiqueta">${ob_k}</span>
			</div>`
		);
	}

	$("#barra-lateral").append(html_favoritos.join("\n"));
	/*
	$("#barra-lateral").append(`
	    <hr>
	    <div class="contenedor-logos" onclick="window.open('https://organicos.nutrimonitor.com/config/_phpMyAdmin-5.1.1-all-languages_/', '_blank');">
			<span class="folder-icono"></span>
			<span class="folder-etiqueta">PHP MyAdmin</span>
		</div>
	    
	    
	    <div class="contenedor-logos" onclick="window.open('https://nutritionalindexts.com:4000//ace/?file=L3Zhci93d3cvaHRtbC93d3cubnV0cml0aW9uYWxpbmRleHRzLmNvbS9uaWsvY29udHJvbDIvaGVscF9kZXYudHh0', '_blank');">
			<span class="folder-icono"></span>
			<span class="folder-etiqueta">Help Dev</span>
		</div>
	    
	    <div class="contenedor-logos" onclick="window.open('https://nutritionalindexts.com:4000//ace/?file=L3Zhci93d3cvaHRtbC93d3cubnV0cml0aW9uYWxpbmRleHRzLmNvbS9ldHFDb2xfcGVuZGllbnRlcy5zcWw=', '_blank');">
			<span class="folder-icono"></span>
			<span class="folder-etiqueta">Nik Scrum</span>
		</div>
		
		<div class="contenedor-logos" onclick="window.open('https://www.nutritionalindexts.com:4000//ace/?file=L3Zhci93d3cvaHRtbC9vcmdhbmljb3MubnV0cmltb25pdG9yLmNvbS9jZXJPcmdTY3J1bS5zcWw=', '_blank');">
			<span class="folder-icono"></span>
			<span class="folder-etiqueta">CerOrg Scrum</span>
		</div>
		
	    <div class="contenedor-logos" onclick="window.open(window.location.href.replace('#', '')+'session.html', '_blank');">
			<span class="folder-icono"></span>
			<span class="folder-etiqueta">Session</span>
		</div>
	
	`);
	*/
	
	eventoFavoritos();
}

function colocarRutaEditable(ruta){
	ruta = ruta.split("/").filter(Boolean);
	const botones_ruta = [];
	//const ruta_reverse = ruta.reverse();
	
	const title_window = carpetaProyecto + ruta[ruta.length - 1];

    document.title = title_window;

	for(i = 0; i < ruta.length; i++){
		botones_ruta.push(
			`<button class="btn-dir-ruta btn-ruta-edit" title="/${ruta.slice(0, i+1).join("/")}/">
				${ruta[i]}
			</button>`
		);
	}
	$("#ruta-editable").html(botones_ruta.join("\n"));
	eventoRutaEditable();
}

function buscarArchivos(archivo){

	const matches = [];
	cancelarBusqueda();
	archivos_encontrados.length = 0;
	index_arch_encontrado = 0;

	$(".archivos").each(function(){
		const actual_file = $(this);

		if(actual_file.attr("title").toLocaleLowerCase().includes(archivo.toLocaleLowerCase())){
			archivos_encontrados.push(actual_file.find("div canvas").attr("id").split("_")[1]);
			matches.push(actual_file.attr("title"));
			//return false;

		}
	});

	if(archivos_encontrados.length > 0){
	    
	    resaltarArchivo(0);
		//console.log(matches[0]+" | "+archivo+" -> "+archivos_encontrados[0]);
	}
	else{
	    $("#resultados_busqueda").html("0 de 0");
	}
}

function resaltarArchivo(index){
    
    archivos_resaltados.push(index);
    
    const archivo_encontrado = $("#canv_"+archivos_encontrados[index]).parent().parent();

	archivo_encontrado.addClass("archivo-resaltado");

	const desplazamiento = archivo_encontrado.offset().top;

	//console.log("Mov: "+desplazamiento);
	
	$("#resultados_busqueda").html((index + 1)+" de "+archivos_encontrados.length);

	if(desplazamiento > 400 || desplazamiento < 10){
		$('#contenedor-archivos').animate( {scrollTop : archivo_encontrado.offset().top-70}, 200 );
	}
}

function buscarArchivoSiguiente(){
    if(index_arch_encontrado < archivos_encontrados.length-1){
        
        $("#canv_"+archivos_encontrados[index_arch_encontrado]).parent().parent().removeClass("archivo-resaltado");
        index_arch_encontrado++;
        resaltarArchivo(index_arch_encontrado);
    }
}

function buscarArchivoAnterior(){
    if(index_arch_encontrado > 0){
        
        $("#canv_"+archivos_encontrados[index_arch_encontrado]).parent().parent().removeClass("archivo-resaltado");
        index_arch_encontrado--;
        resaltarArchivo(index_arch_encontrado);
    }
}



function cancelarBusqueda(){
	for(a of archivos_resaltados){
		$("#canv_"+archivos_encontrados[a]).parent().parent().removeClass("archivo-resaltado");
	}
}

$(document).ready(function(){
	if($(window).width() <= 375){
		document.getElementById("ocultar_panel_lateral").click();
	}
	colocarFavoritos();
});