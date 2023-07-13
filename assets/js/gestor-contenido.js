const mimetype = [
	"video",
	"image",
	"text",
	"audio"
];

const extension = {
	"php": "text",
	"js": "text",
	"json": "text",
	"sql": "text",
	"txt": "text",
	"sh": "text",
	"html": "text",
	"css": "text",
	"tpl": "text",
	"ini": "text",
	"java": "text",
	"pdf": "pdf"
}

function abrirArchivo(archivo, arch_mimetype, ruta){

	const mime_encontrada = mimetype.map(function(m){
		return arch_mimetype.toLocaleLowerCase().includes(m);
	}).indexOf(true);

	if(mime_encontrada > -1){
		//alert("El archivo es: "+mimetype[mime_encontrada]+" | "+mime_encontrada);
		eval(`open_${mimetype[mime_encontrada]}('${ruta+archivo}')`);
		//abrirVideo(ruta+archivo);
	}
	else{
		const ext_split = archivo.split(".");
		const ext = ext_split[ (ext_split.length -1 ) ];

		if(extension[ext]){
			//alert("El archivo es => "+extension[ext]);
			eval(`open_${extension[ext]}('${ruta+archivo}')`);
		}
		else{
			alert("El archivo no es soportado");
		}
	}
}

function open_text(rutaArchivo){
	const ruta_base64 = window.btoa(rutaArchivo);
	window.open(window.location.href.replace("#", "")+"/ace/?file="+ruta_base64, '_blank');
}

function open_pdf(rutaArchivo){
	const ruta_base64 = window.btoa(rutaArchivo);
	window.open(window.location.href.replace("#", "")+"getResource?"+ruta_base64, '_blank');
}

function open_video(rutaArchivo){
	const ruta_base64 = window.btoa(rutaArchivo);
	window.open(window.location.href.replace("#", "")+"playVideo/?file="+ruta_base64, '_blank');
}

function open_audio(rutaArchivo){
	const ruta_base64 = window.btoa(rutaArchivo);
	const audio_src = window.location.href.replace("#", "")+"getResource?"+ruta_base64;
	console.log(audio_src);
	reproducir_cancion(audio_src);

}