function copy_hex_color_pick(){
    
    navigator.clipboard.writeText(document.getElementById("color_picker").value).then(() => {
        //console.log('Content copied to clipboard');
    },() => {
        console.error('Failed to copy');
    });
    
}

document.getElementById("color_picker").addEventListener("change", watchColorPicker, false);

function watchColorPicker(){
    copy_hex_color_pick();
}

/*

input_color.addEventListener("input", function(){
    var theColor = input_color.value;
    console.log(theColor);
  // Do something with `theColor` here.
}, false);
*/