"use strict";

//Dependencias ->
var fs = require('fs');
var https = require('https');
var path = require('path');
var express = require('express');
const basicAuth = require('express-basic-auth');
const mime = require('mime');
//const mime = require( 'ext2mime' );

//Dependencias <-

const SERVER_PORT = 4000;
const options = {
	key: fs.readFileSync('ssl/llave_ssl.key'),
	cert: fs.readFileSync('ssl/llave_ssl.crt')
};
console.log();
console.log("#########################################################################");
console.log("#########################################################################");
console.log("#######                                                          ########");
console.log("####### RECURDA ACCEDER AL SERVIDOR CON https://localhost:"+SERVER_PORT+"   ########");
console.log("#######                                                          ########");
console.log("#########################################################################");
console.log("#########################################################################");
console.log();
//Configuraciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Configuraciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Configuraciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var app = express();

var server = https.createServer(options, app);
var io = require('socket.io')(server);

//Autenticacion ->
app.use(basicAuth({
	users: {
		node: 'otrosi10'
	},
	challenge: true // <--- needed to actually show the login dialog!
})); // */ //<-





server.listen(SERVER_PORT, function() {
	console.log('server up and running at %s port', SERVER_PORT);
});

//Configuraciones del servidor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//Configuraciones del servidor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//###################################################

//Resolucion de rutas >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Resolucion de rutas >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Resolucion de rutas >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) { //# Ruta INDEX
	res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/getResource', function(req, res) { // decargador de archivos (Need filename)
	//const file_resource = decodeURI();
	const file_resource = new Buffer(Object.keys(req.query)[0], 'base64').toString();

	res.download(file_resource);
});



app.get('/playVideo', function(req, res){
	console.log(path.join(__dirname + '/video/index.html'));
  res.sendFile(path.join(__dirname, '/video/index.html'/*+Object.keys(req.query)[0]*/));
  //res.send("holi bebe");
  //res.redirect(path.join(__dirname, '/video/?holi'));
});

app.get('/ace', function(req, res) { //Se envia por get el archivo a editar con ACE
	const ace_file = decode_b64(Object.keys(req.query)[0]); //new Buffer(Object.keys(req.query)[0], 'base64').toString();

	res.sendFile(path.join(__dirname, '/ace/editor.html?' + ace_file));
});

app.post('/up', function(req, res) { // # Nube para subir archivos -->

	// create an incoming form object
	var form = new formidable.IncomingForm();
	var nombreArch;
	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, "/subidas");

	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	form.on('file', function(field, file) {
		nombreArch = file.name;
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});

	// log any errors that occur
	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
		console.log("Moviendo al directorio");
		moverArchivo(nombreArch);
		res.sendFile(path.join(__dirname, 'index.html'));
	});

	// parse the incoming request containing the form data
	form.parse(req);

}); // # Nube para subir archivos <--

//Resolucion de rutas <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//Resolucion de rutas <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//###################################################

//Conexion de SOCKETS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Conexion de SOCKETS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Conexion de SOCKETS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
io.sockets.on("connection", function(socket) {
	//El token se genera por cada tab del cliente que abra en el nav
	//Con token
	socket.on("obtenerArchivos", function(ruta, token) {
		io.sockets.emit("obtenerArchivos" + token, obtenerArchivos(ruta));
	});


	socket.on("abrir", function(ruta, token) {
		ruta = decode_b64(ruta);
		const contenido = abrirArchivo(ruta);
		io.sockets.emit("cargarArchivo" + token, contenido, ruta);
	});

	socket.on("guardar", function(ruta, cont, token) {
		var resultado = guardar(ruta, cont);
		io.sockets.emit("estadoDeArchivo" + token, resultado);
	});

	socket.on("crearArchivo", function(ruta, nombre, token) {
		crearArchivo(nombre, ruta);
		io.sockets.emit("archivoCreado" + token, "");
	});



	socket.on("comprimirDirectorio", function(ruta, nombre, token) {
		comprimirDirectorio(nombre, ruta);
		io.sockets.emit("zipCreado" + token, "");
	});
/*


	socket.on("subida", function(ruta, token) {
		directorio = ruta;
		console.log("DirectorioActualizado: " + ruta);
		//io.sockets.emit("estadoDeArchivo"+token, );
	});
	socket.on("crearArchivo", function(nombre, k, token) {
		io.sockets.emit("archivoCreado" + token, verificarArchivo(nombre, k));
	});
	*/
});
//Conexion de SOCKETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//Conexion de SOCKETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//###################################################

//Funciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Funciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Funciones del servidor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function obtenerArchivos(rutaActual) {
    if(rutaActual == "__dirname/"){
        rutaActual = path.join(__dirname, '.')+"/";
    }
	console.log("-> "+rutaActual+"\n");
	const RUTA = rutaActual;
	const archivos = {
		"RUTA": RUTA,
		"files": [],
		"dirs": []
	}

	fs.readdirSync(RUTA).forEach(function(file) {

		if (!fs.lstatSync(RUTA + file).isDirectory()) {
			//var _mime = mime(file.split(".").pop());

            var _mime = mime.getType(file);

			if (_mime) {
				_mime = _mime.replace("/", "-");
			} else {
				_mime = "qgis-mldata";
			}
			archivos.files.push({
				"file_name": file,
				"file_date": fs.statSync(RUTA + file).mtime.getTime(),
				"mime_type": _mime.replace("/", "-")
			});
		} else {
			archivos.dirs.push(file);
		}
	});

	archivos.files.sort(function(a, b){
	    return  b.file_date - a.file_date;
	});

	return archivos;
}

function crearArchivo(nombre, rutaActual){
    console.log(rutaActual);
    if(rutaActual == "__dirname/"){
        rutaActual = path.join(__dirname, '.')+"/";
    }
    console.log("Archivo creado: "+rutaActual+nombre);
    fs.writeFileSync(rutaActual+nombre, "", "utf-8");
}

function crearArchivo(nombre, rutaActual){
    console.log(rutaActual);
    if(rutaActual == "__dirname/"){
        rutaActual = path.join(__dirname, '.')+"/";
    }
    console.log("Archivo creado: "+rutaActual+nombre);
    fs.writeFileSync(rutaActual+nombre, "", "utf-8");
}


function abrirArchivo(ruta){
	var contenido = "";
	var contents = fs.readFileSync(ruta, 'utf8');
	return contents;
}

function guardar(ruta,cont){
	var resultado = "";

	if (fs.existsSync(ruta)) {
    	fs.writeFileSync(ruta, cont,"utf8");
		resultado = "Se ha guardado el archivo";
	}
	else {
		resultado = "Ha ocurrido un error";
	}
	return resultado;
}

function decode_b64(string){
	return new Buffer(string, 'base64').toString();
}

//Funciones del servidor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//Funciones del servidor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//Funciones del servidor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<