
let toogle_full_apps_container = false;
const open_apps_frame = [];

function mover_der_apps_frame(){
	if(!toogle_full_apps_container){
		$("#apps_container_frame").css({
			"left": "calc(100% - 50.5%)"
		});
	}
}

function mover_izq_apps_frame(){
	if(!toogle_full_apps_container){
		$("#apps_container_frame").css({
			"left": "1px"
		});
	}
}

function centrar_apps_frame(){
	if(!toogle_full_apps_container){
		$("#apps_container_frame").css({
			"left": "1px",
			"width": "99%"
		});

	}
	else{
		$("#apps_container_frame").css({
			"width": "50%"
		});
	}
	toogle_full_apps_container = !toogle_full_apps_container;

}

function hide_apps_frame(){
	$("#apps_container_frame").css({
		"visibility": "hidden"
	});
}

function show_apps_frame(){
	$("#apps_container_frame").css({
		"visibility": "visible"
	});
}

function add_app_to_frame(src){
	const token_app = "app"+Math.round(+new Date()/1000);
	open_apps_frame.push(token_app);
	$("#apps_body_container").html(`
		<iframe id="${token_app}" src="${src}" class="full_iframe_app iframe_app"></iframe>
	`);
}
