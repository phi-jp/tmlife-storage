/*
 * phi
 */


var $id = function(id) { return document.getElementById(id); };

var toHTML = function() {
    var eSrc    = $id("src");
    var eDst    = $id("dst");
    var ePreview= $id("preview").contentDocument.body;
    var markdownText = eSrc.value;
    var htmlText     = markdown.toHTML(markdownText);
    
    eDst.value = htmlText;
    ePreview.innerHTML = htmlText;
};

var changeMode = function() {
    for (var i=0; i<document.modeForm.mode.length; ++i) {
        var c = document.modeForm.mode[i];
        
        if (c.checked) {
            $id(c.value).style.display = "";
        }
        else {
            $id(c.value).style.display = "none";
        }
    }
};

window.onload = function() {
    tm.FormObserver.observeAll();
    
    $id("src").onchange = toHTML;
    
    // 一度実行しておく
    toHTML();
    
    for (var i=0; i<document.modeForm.mode.length; ++i) {
        var c = document.modeForm.mode[i];
        c.onchange = changeMode;
    }
    // 一度実行しておく
    changeMode();
};

