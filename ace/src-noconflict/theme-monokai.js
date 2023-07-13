ace.define("ace/theme/monokai",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-monokai";
exports.cssText = ".ace-monokai .ace_gutter {\
background: #1B1B1B;\
color: #8F908A\
}\
.ace-monokai .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-monokai {\
text-shadow: 0px 2px 3px black;\
background-color: #141414;\
/*Color general del texto ################################################*/\
text-shadow: 0 0 20px #a5b9e6;\
color: #F8F8F2\
}\
.ace-monokai .ace_cursor {\
color: #F8F8F0\
}\
.ace-monokai .ace_marker-layer .ace_selection {\
box-shadow: 0 0 3px 2px #379ACF;\
background: rgba(55, 154, 207, 0.4)\
}\
.ace-monokai.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-monokai .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-monokai .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.ace-monokai .ace_marker-layer .ace_active-line {\
background: #202020\
}\
.ace-monokai .ace_gutter-active-line {\
background-color: #272727\
}\
.ace-monokai .ace_marker-layer .ace_selected-word {\
box-shadow: 0 0 3px 2px #379ACF;\
border: 1px solid #49483E\
}\
.ace-monokai .ace_invisible {\
color: #52524d\
}\
.ace-monokai .ace_entity.ace_name.ace_tag,\
.ace-monokai .ace_keyword,\
.ace-monokai .ace_meta.ace_tag,\
.ace-monokai .ace_storage {\
/*if = + - #########################################################*/\
text-shadow: 0 0 15px #FF27EA;\
color: #FF27EA\
}\
.ace-monokai .ace_punctuation,\
.ace-monokai .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-monokai .ace_constant.ace_character,\
.ace-monokai .ace_constant.ace_language,\
.ace-monokai .ace_constant.ace_numeric,\
.ace-monokai .ace_constant.ace_other {\
/*Valores constantes true 4000 false ################################*/\
color: #AE81FF\
}\
.ace-monokai .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-monokai .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-monokai .ace_support.ace_constant,\
.ace-monokai .ace_support.ace_function {\
/* Metodos por defecto de JavaScript */\
text-shadow: 0 0 15px #0099FF;\
color: #0099FF\
}\
.ace-monokai .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-monokai .ace_storage.ace_type,\
.ace-monokai .ace_support.ace_class,\
.ace-monokai .ace_support.ace_type {\
font-style: italic;\
/* console function ######################################################*/\
color: #9962FF;\
text-shadow: 0 0 15px #9962FF;\
font-weight: bold\
}\
.ace-monokai .ace_entity.ace_name.ace_function,\
.ace-monokai .ace_entity.ace_other,\
.ace-monokai .ace_entity.ace_other.ace_attribute-name,\
.ace-monokai .ace_variable {\
/* Nombre de funciones */\
font-weight: bold;\
text-shadow: 0 0 15px #00FF88;\
color: #00FF88\
}\
.ace-monokai .ace_variable.ace_parameter {\
/* Parametros (parametro) */\
font-style: italic;\
color: #1E90FF\
}\
.ace-monokai .ace_string {\
text-shadow: 0 0 2px #00FC3F;\
color: #00FC3F\
}\
.ace-monokai .ace_comment {\
text-shadow: 0 0 1px black;\
color: #696969;\
}\
.ace-monokai .ace_identifier:nth-child(2) {\
    /*color amarillo*/\
    color: #1EDCFF;\
    text-shadow: 0 0 15px #1EDCFF;\
}\
.ace-monokai .ace_identifier:nth-child(1) {\
    /*color azul variables*/\
    color: #1EDCFF;\
    text-shadow: 0 0 15px #1EDCFF;\
}\
.ace-monokai .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}";

//Morado, un poco obscuro: #6E00FC
//Verde, no esta mal: #00FF88
/*
Cometarios azules:
color: #0099FF;\
text-shadow: 0 0 5px #0099FF;\
*/


var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    ace.require(["ace/theme/monokai"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();