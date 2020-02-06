function toggleClasses(htmlEl, className1, className2) {
    if (htmlEl.classList.contains(className1))
        htmlEl.classList.replace(className1, className2);
    else
        htmlEl.classList.replace(className2, className1);
}

function removeActive($el) {
    $el.removeClass("active");
    $el.addClass("passive");
}

function selectPalette(paletteElement){
    let $paletteSelector = $(".palette-selector");
    removeActive($paletteSelector);
    toggleClasses(paletteElement, "active", "passive");

    let $typefaceSelector = $("#typeface-selector");
    $typefaceSelector.css("display", "block");
}