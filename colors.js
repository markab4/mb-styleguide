function copyStringToClipboard(str) {
    if (str.includes("#")) str = str.substring(str.indexOf("#")+1).trim();
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

let selectedFg, selectedBg, selectedPlatform;

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
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    const hex = x => isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`;
};


function selectPalette(paletteElement) {
    try {
        let $paletteSelector = $(".palette-selector");
        removeActive($paletteSelector);
        selectedPlatform = paletteElement.innerText;

        toggleClasses(paletteElement, "active", "passive");

        let $platforms = $("#platforms");
        let $fgColor = $(".fg-color");
        $fgColor.remove();
        $(".bg-color").remove();


        let colors = ``;
        let fgColors = Object.keys(compliantColors[selectedPlatform]);
        for (let i = 0; i < fgColors.length; i++)
            colors += `<div class="div-block-49 fg-block" onclick="selectFg(this)" style="background-color: ${fgColors[i]}"></div>\n`;


        $platforms.after(
            $("     <div class=\"fg-color\" style='background-color: #fff'>\n" +
                "                <div class=\"colorsel-header\">\n" +
                "                    <div class=\"greyline\"></div>\n" +
                "                    <div class=\"corpo20px\">Foreground Color</div>\n" +
                "                </div>\n" +
                "                <div class=\"div-block-48\">\n" + colors +
                "                </div>\n" +
                "            </div>").hide()
        );

        $(".fg-color").show(400);

    } catch (TypeError) {
        console.log(`${selectedPlatform} does not have a list of compliant colors yet. :-(`)
    }
}

function selectFg(fgElement) {
    selectedFg = rgbToHex(fgElement.style.backgroundColor);
    let $fgBlocks = $(".fg-block");
    $fgBlocks.removeClass("selected");
    fgElement.classList.add("selected");

    $(".bg-color").remove();

    let bgColors = compliantColors[selectedPlatform][selectedFg];


    let colors = "";
    for (let i = 0; i < bgColors.length; i++) {
        colors += "<div class=\"bg-block div-block-49\" onclick='selectBg(this)' " +
            "style='background-color: " + bgColors[i] + "'></div>\n"
    }

    let $fgColor = $(".fg-color");
    $fgColor.after($(
        `<div class="bg-color" style='background-color: #fff'>
                <div class="colorsel-header">
                    <div class="greyline"></div>
                    <div class="corpo20px">Background Color</div>
                </div>
                <div class="div-block-48-copy">${colors}</div>
            </div>`).hide());
    $(".bg-color").show(400);

    let $fontSelector = $(".font-selector-module");

    $fontSelector.replaceWith(
        "<div class=\"font-selector-module\" style='margin-bottom: 0'>\n    <div class=\"div-block-47\">\n" +
        "        <div class=\"colorsel-header\" id=\"contrast-results\">\n" +
        "            <div class=\"greyline\"></div>\n" +
        "            <div class=\"corpo20px\">Contrast Results</div>\n" +
        "        </div>\n" +
        "        <div class=\"color-sujessionselector grab\" onclick=\"copyStringToClipboard(this.innerText)\">\n" +
        "            <div class=\"color_suggesion_wrapper\">\n" +
        "                <div class=\"color_suggesion_label\">Foreground</div>\n" +
        `                        <div class="color_suggesion_hex">${selectedFg}</div>` +
        "                    </div>\n" +
        "                    <div class=\"w-clearfix\"><img src=\"https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e0629620b1ac55a4df1b955_Icon_copycode%20(1).svg\" alt=\"\" class=\"white-arrow-down\"></div>\n" +
        "                </div>\n" +
        "                <div class=\"color-sujessionselector grab\" id=\'background-display\' onclick=\"copyStringToClipboard(this.innerText)\">\n" +
        "                    <div class=\"color_suggesion_wrapper\">\n" +
        "                        <div class=\"color_suggesion_label\">Background</div>\n" +
        "                        <div class=\"color_suggesion_hex\">???</div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n");
}

const createFontButtons = (sizes, name) => {
    let html = "";
    for (let i = 0; i < sizes.length; i++)
        html += `<label><input ${i === 0 ? "checked" : ""} type="radio" name="${name}" value="${sizes[i]}"><div class="text-block-17">${sizes[i]}</div></label>`;
    return html;
};

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
        "                    <div class=\"w-clearfix\"><img src=\"https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e0629620b1ac55a4df1b955_Icon_copycode%20(1).svg\" alt=\"\" class=\"white-arrow-down\"></div>\n"));

    let $fontDisplay = $(`<div class="font1 font-display">
                    <div class="font_verion_wrapper">
                        <div class="big-font">Corporate A Regular 24pt</div>
                        <div class="div-block-54 selector">
                            <div class="div-block-53 w-clearfix">${createFontButtons(['24pt', '30pt', '36pt', '42pt'], 'big-font')}</div>
                        </div>
                    </div>
                </div>
                <div class="font2 font-display">
                    <div class="font_verion_wrapper">
                        <div class="medium-font">CorpoS Regular 18pt</div>
                        <div class="div-block-54">
                            <div class="div-block-53 w-clearfix">${createFontButtons(['18pt', '32pt'], 'medium-font')}</div>
                        </div>
                    </div>
                </div>
                <div class="font3 font-display">
                    <div class="font_verion_wrapper">
                        <div class="small-font">Arial Regular 14pt</div>
                        <div class="div-block-54">
                            <div class="div-block-53 w-clearfix">${createFontButtons(['12pt', '14pt'], 'small-font')}</div>
                        </div>
                    </div>
                </div>`);

    let $fontSelector = $(".font-selector-module");
    $('.font-display').remove();
    $fontSelector.append($fontDisplay.hide());
    $('.font-display').show(400);
    let $fontBoxes = $(".font_verion_wrapper");
    $fontBoxes.css({
        "background-color": selectedBg,
        "color": selectedFg
    })

    let $bigFont = $(".big-font"),
        $mediumFont = $(".medium-font"),
        $smallFont = $(".small-font");

    $("input[name='big-font']").click(function () {
        let radioValue = $("input[name='big-font']:checked").val();
        let text = $bigFont.text();
        $bigFont.text(text.replace(/\d\dpt/, radioValue));
        $bigFont.css("font-size", radioValue);
    });

    $("input[name='medium-font']").click(function () {
        let radioValue = $("input[name='medium-font']:checked").val();
        let text = $bigFont.text();
        $mediumFont.text(text.replace(/\d\dpt/, radioValue));
        $mediumFont.css("font-size", radioValue);
    });

    $("input[name='small-font']").click(function () {
        let radioValue = $("input[name='small-font']:checked").val();
        let text = $smallFont.text();
        $smallFont.text(text.replace(/\d\dpt/, radioValue));
        $smallFont.css("font-size", radioValue);
    });

}