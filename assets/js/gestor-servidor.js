var socket;
let token;
const sort = "fecha";
let rutasAlmacenadas = [];
let carpetaProyecto = "";

document.addEventListener('DOMContentLoaded' , function(){
	token = Math.round(+new Date()/1000);

	const url = String(window.location);
	if (url.includes("up")) {
		window.location = url.replace("up", "");
	}
	ajustar();
	//obtenerArchivos("/");
	obtenerArchivos("__dirname");
	//obtenerArchivos("/home/cesar/Escritorio/BD_Superama/BD de Alimentos Naturales/OrionIDE_1.1.7/OrionIDEv_1.1.6/node_modules/express/lib/middleware/");

});


function ajustar(){
	socket=io.connect();
	conectar();
}

function conectar(){
	socket.on("obtenerArchivos"+token,function(archivos){
		colocarArchivos(archivos);
	});
	/*
	socket.on("cargarArchivo"+token,function(contenido,ruta){

		document.getElementById("iden").innerHTML = ruta;
		colocarContenido(contenido);
				archivoActivo = true;
	});

	socket.on("estadoDeArchivo"+token,function(res){
		modal(res);
	});

	socket.on("archivoCreado"+token,function(res){
		modal(res);
	});
	socket.on("archivoZIP"+token,function(res){
		alert(res);
	});
	*/
}

function crearArchivo(nombre){
	socket.emit("crearArchivo", archivoSeleccionado+"/", nombre, token);
	alert("Archivo creado: "+archivoSeleccionado+"/");
	$("#modal_crear_elemento").css("display", "none");
}

function comprimirDirectorio(nombre){
	socket.emit("comprimirDirectorio", archivoSeleccionado+"/", nombre, token);
	alert("Archivo creado: "+archivoSeleccionado+"/");
	$("#modal_crear_elemento").css("display", "none");
}

function obtenerArchivos(ruta){
	if(!ruta.endsWith("/")){
		ruta += "/";
	}
	rutasAlmacenadas.push(ruta);
	socket.emit("obtenerArchivos",ruta,token, sort);
}