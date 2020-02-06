// $(function () {
// $.fn.hasId = function(id) {
//     return this.attr('id') == id;
// };
//

let selectedFg, selectedBg;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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

let rgbToHex = function (rgb) {
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};


function selectPalette(paletteElement) {
    let $paletteSelector = $(".palette-selector");
    removeActive($paletteSelector);

    toggleClasses(paletteElement, "active", "passive");

    let $platforms = $("#platforms");
    let $fgColor = $(".fg-color");
    $fgColor.remove();
    $(".bg-color").remove();

    let colors = "";
    for (let i = 0; i <= getRandomInt(12) + 3; i++) {
        colors += "<div class=\"fg-block div-block-49\" onclick='selectFg(this)' " +
            "style='background-color: " + getRandomColor() + "'></div>\n"
    }
    $platforms.after(
        $("     <div class=\"fg-color\" style='background-color: #fff'>\n" +
            "                <div class=\"colorsel-header\">\n" +
            "                    <div class=\"greyline\"></div>\n" +
            "                    <div class=\"corpo20px\">Foreground Color</div>\n" +
            "                </div>\n" +
            "                <div class=\"div-block-48\">\n" + colors +
            "                </div>\n" +
            "            </div>"));
}

function selectFg(fgElement) {
    selectedFg = rgbToHex(fgElement.style.backgroundColor);
    let $fgBlocks = $(".fg-block");
    $fgBlocks.removeClass("selected");
    fgElement.classList.add("selected");

    $(".bg-color").remove();

    let colors = "";
    for (let i = 0; i <= getRandomInt(36) + 8; i++) {
        colors += "<div class=\"bg-block div-block-49\" onclick='selectBg(this)' " +
            "style='background-color: " + getRandomColor() + "'></div>\n"
    }

    let $fgColor = $(".fg-color");
    $fgColor.after(
        $("            <div class=\"bg-color\" style='background-color: #fff'>\n" +
            "                <div class=\"colorsel-header\">\n" +
            "                    <div class=\"greyline\"></div>\n" +
            "                    <div class=\"corpo20px\">Background Color</div>\n" +
            "                </div>\n" +
            "                <div class=\"div-block-48-copy\">\n" + colors +
            "                </div>\n" +
            "            </div>"));

    let fontSelector = $(".font-selector-module");
    fontSelector.replaceWith("        <div class=\"font-selector-module\" style='margin-bottom: 0'>\n" +
        "            <div class=\"div-block-47\">\n" +
        "                <div class=\"colorsel-header\" id=\"contrast-results\">\n" +
        "                    <div class=\"greyline\"></div>\n" +
        "                    <div class=\"corpo20px\">Contrast Results</div>\n" +
        "                </div>\n" +
        "                <div class=\"color-sujessionselector grab\" onclick=\"copyStringToClipboard(this.innerText)\">\n" +
        "                    <div class=\"color_suggesion_wrapper\">\n" +
        "                        <div class=\"color_suggesion_label\">Foreground</div>\n" +
        `                        <div class=\"color_suggesion_hex\">${selectedFg}</div>\n` +
        "                    </div>\n" +
        "                    <div class=\"w-clearfix\"><img src=\"images/Icon_copycode-1.svg\" alt=\"\" class=\"white-arrow-down\"></div>\n" +
        "                </div>\n" +
        "                <div class=\"color-sujessionselector grab\" id='background-display' onclick=\"copyStringToClipboard(this.innerText)\">\n" +
        "                    <div class=\"color_suggesion_wrapper\">\n" +
        "                        <div class=\"color_suggesion_label\">Background</div>\n" +
        "                        <div class=\"color_suggesion_hex\">???</div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n");
}

function createFontButtons(sizes, name) {
    let html = "";
    for (let i = 0; i < sizes.length; i++) {
        html += `<label><input ${i === 0 ? "checked" : ""} type="radio" name="${name}" value="${sizes[i]}"><div class=\"text-block-17\">${sizes[i]}</div></label>`
    }
    return html;
}

function selectBg(bgElement) {
    selectedBg = rgbToHex(bgElement.style.backgroundColor);

    let $bgBlocks = $(".bg-block");
    $bgBlocks.removeClass("selected");
    bgElement.classList.add("selected");

    let $backgroundDisplay = $("#background-display");

    $backgroundDisplay.html($(
        "                    <div class=\"color_suggesion_wrapper\">\n" +
        "                        <div class=\"color_suggesion_label\">Background</div>\n" +
        `                        <div class=\"color_suggesion_hex\">${selectedBg}</div>\n` +
        "                    </div>\n" +
        "                    <div class=\"w-clearfix\"><img src=\"images/Icon_copycode-1.svg\" alt=\"\" class=\"white-arrow-down\"></div>\n"));

    let $fontDisplay = $(" <div class=\"div-block-56\" id='font-display'>\n" +
        "                <div class=\"font1\">\n" +
        "                    <div class=\"font_verion_wrapper\">\n" +
        "                        <div class=\"big-font\">Corporate A Regular 24pt</div>\n" +
        "                        <div class=\"div-block-54 selector\">\n" +
        "                            <div class=\"div-block-53 w-clearfix\">\n" +
        createFontButtons(['24pt', '30pt', '36pt', '42pt'], 'big-font') +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"font2\">\n" +
        "                    <div class=\"font_verion_wrapper\">\n" +
        "                        <div class=\"medium-font\">CorpoS Regular 18pt</div>\n" +
        "                        <div class=\"div-block-54\">\n" +
        "                            <div class=\"div-block-53 w-clearfix\">\n" +
        createFontButtons(['18pt', '32pt'], 'medium-font') +

        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"font3\">\n" +
        "                    <div class=\"font_verion_wrapper\">\n" +
        "                        <div class=\"small-font\">Arial Regular 14pt</div>\n" +
        "                        <div class=\"div-block-54\">\n" +
        "                            <div class=\"div-block-53 w-clearfix\">\n" +
        createFontButtons(['12pt', '14pt'], 'small-font') +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>");

    let $fontSelector = $(".font-selector-module");
    $('#font-display').remove();
    $fontSelector.append($fontDisplay);
    let $fontBoxes = $(".font_verion_wrapper");
    $fontBoxes.css({
        "background-color": selectedBg,
        "color": selectedFg
    })

    let $bigFont = $(".big-font"),
        $mediumFont = $(".medium-font"),
        $smallFont = $(".small-font");

    $("input[name='big-font']").click(function(){
        let radioValue = $("input[name='big-font']:checked").val();
        let text = $bigFont.text();
        $bigFont.text(text.replace(/\d\dpt/, radioValue));
        $bigFont.css("font-size", radioValue);
    });

    $("input[name='medium-font']").click(function(){
        let radioValue = $("input[name='medium-font']:checked").val();
        let text = $bigFont.text();
        $mediumFont.text(text.replace(/\d\dpt/, radioValue));
        $mediumFont.css("font-size", radioValue);
    });

    $("input[name='small-font']").click(function(){
        let radioValue = $("input[name='small-font']:checked").val();
        let text = $smallFont.text();
        $smallFont.text(text.replace(/\d\dpt/, radioValue));
        $smallFont.css("font-size", radioValue);
    });

}


// });