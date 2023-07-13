
let activar_context_menu = false;
const menu_context = document.getElementById("menu").style;
let archivoSeleccionado = "";

function mostrarMenu(id, e){

	document.getElementById("Archs").style.display = "none";
	document.getElementById("Dirs").style.display = "none";
	document.getElementById(id).style.display = "block";
	var posX = e.clientX;
    var posY = e.clientY;
    menu(posX, posY);

}

function menu(x, y) {
	menu_context.top = y + "px";
	//i.left = (x - 256) + "px";
	menu_context.left = x  + "px";
	menu_context.visibility = "visible";
	console.log("Mostrando");
}
