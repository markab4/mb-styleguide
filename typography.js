let selectedPlatform, selectedTypeface, selectedFontFamily, selectedStyle, selectedWeight, selectedFontStyle,
    selectedSize, selectedStyleElement, mobileSwitch,
    selectedLeading, selectedTracking, selectedScreen = "desktop";

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

function selectPalette(paletteElement) {
    try {
        selectedPlatform = paletteElement.innerText;
        let $paletteSelector = $(".palette-selector");
        removeActive($paletteSelector);
        toggleClasses(paletteElement, "active", "passive");
        $("#size-selector, #style-selector, #typeface-selector, #specs").remove();
        selectedStyleElement = null;
        selectedScreen = "desktop";

        let typefaces = Object.keys(typesetting[selectedPlatform]);

        let typefaceClasses = {
            "Corpo A": "text-block-18",
            "Corpo S": "text-block-19",
            "Arial": "text-block-arial"
        };

        let typefacesHtml = `<div class="type-selector-row _3" id="typeface-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Typeface</div>
                    </div>`;
        for (let i = 0; i < typefaces.length; i++) {
            typefacesHtml += `<div class="typeface-selector">
                        <div class="${typefaceClasses[typefaces[i]]} selector typeface-block passive" onclick="selectTypeface(this)">${typefaces[i]}</div>
                        </div>`
        }
        typefacesHtml += `</div>`;
        $(".type-selector-row._1").after($(typefacesHtml));
    } catch (TypeError) {
        console.log(`${selectedPlatform} does not have a list of typefaces yet. :-(`)
    }
}

function selectTypeface(typefaceElement) {
    selectedTypeface = typefaceElement.innerText;

    let styles = Object.keys(typesetting[selectedPlatform][selectedTypeface]);

    let styleClasses = {
        "Regular": "text-block-20",
        "Medium": "text-block-20",
        "Italic": "text-block-21",
        "Bold": "text-block-2-bold"
    };

    selectedFontFamily = getComputedStyle(typefaceElement).fontFamily;
    let $typefaceBlocks = $(".typeface-block");
    $typefaceBlocks.removeClass("active");
    typefaceElement.classList.add("active");
    $("#size-selector, #style-selector, #specs").remove();
    selectedStyleElement = null;
    selectedScreen = "desktop";


    let stylesHtml = `<div class="type-selector-row _3" id="style-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Style</div>
                    </div>`;

    for (let i = 0; i < styles.length; i++) {
        stylesHtml += `<div class="typeface-selector">
                        <div class="${styleClasses[styles[i]]} selector style-block passive" onclick="selectStyle(this)">${styles[i]}</div>
                    </div>`
    }
    for (let i = styles.length; i < 3; i++) { // To make sure there are three rows in the column
        stylesHtml += `<div class="typeface-selector">
                        <div class="style-block"></div>
                    </div>`
    }
    stylesHtml += `</div>`;

    $("#typeface-selector").after($(stylesHtml));
    $(".style-block").css("font-family", selectedFontFamily);
}

function selectStyle(styleElement) {


    let computedStyle = getComputedStyle(styleElement);
    selectedWeight = computedStyle.fontWeight;
    selectedFontStyle = computedStyle.fontStyle;
    let $styleBlocks = $(".style-block");
    $styleBlocks.removeClass("active");
    styleElement.classList.add("active");

    $("#size-blocks, #specs").remove();

    selectedStyle = styleElement.innerText;

    let sizeHtml = ``;
    let $previousSelector = $("#style-selector");
    if (selectedStyleElement) {
        $previousSelector = $("#size-selector");
        selectedScreen = (mobileSwitch && mobileSwitch.checked) ? "mobile" : "desktop";
    } else { // Create toggle button if this is the first time Style is selected
        sizeHtml = `<div class="type-selector-row _2" id="size-selector">
        <div class="typesel-header-with-toggle">
            <div class="greyline"></div>
            <div class="corpo20px">Size</div>
            <div class="div-block-58">
                <label class="switch toggle _1">
                    <input type="checkbox" id="mobile-slider" onclick="toggleMobile(this)">
                    <span class="slider round"></span>
                </label>
                <div class="toggle-image"><img src="images/Mobile.svg" alt=""></div>
            </div>
        </div>`;
        selectedScreen = "desktop";
    }
    sizeHtml += `<div class="div-block-76" id="size-blocks">`;

    let sizeList = Object.keys(typesetting[selectedPlatform][selectedTypeface][selectedStyle][selectedScreen]);
    for (let i = 0; i < sizeList.length; i++) {
        let fullStyle = typesetting[selectedPlatform][selectedTypeface][selectedStyle][selectedScreen][sizeList[i]];

        sizeHtml += `<div class="typeface-selector-result selector passive" onclick="selectSize(this)">
    <div style="font-size: ${fullStyle.size}; line-height: ${fullStyle.leading}; letter-spacing: ${fullStyle.tracking}px"
         class="text-block-26 size-block ${sizeList[i].includes("Caps") ? "all-caps" : ""}">
        ${sizeList[i]}
    </div>
</div>`
    }
    sizeHtml += `</div></div>`;
    if (!selectedStyleElement) $previousSelector.after($(sizeHtml));
    else $previousSelector.append($(sizeHtml));
    $(".size-block").css({
        "font-family": selectedFontFamily,
        "font-weight": selectedWeight,
        "font-style": selectedFontStyle
    });
    selectedStyleElement = styleElement;
}

function selectSize(sizeElement) {
    let selectedSizeText = sizeElement.innerText;
    let fullStyle = typesetting[selectedPlatform][selectedTypeface][selectedStyle][selectedScreen][selectedSizeText];

    selectedSize = fullStyle.size;
    selectedLeading = fullStyle.leading;
    selectedTracking = fullStyle.tracking;
    let $sizeSelector = $(".typeface-selector-result");
    removeActive($sizeSelector);
    toggleClasses(sizeElement, "active", "passive");

    $("#specs").remove();

    $('#specs-wrapper').append($(`
                <div class="div-block-79" id="specs">
                    <div class="text-block-31">size <span class="spec">${selectedSize}</span></div>
                    <div class="text-block-31">leading <span class="spec">${selectedLeading}</span></div>
                    <div class="text-block-31">tracking <span class="spec">${selectedTracking}</span></div>
                </div>
    `));

    let sampleImage;
    switch (selectedSizeText) {
        case "Master heading":
            sampleImage = `<img src="images/Image-682x.png"
                             srcset="images/Image-682x-p-500.png 500w, images/Image-682x-p-800.png 800w, images/Image-682x-p-1080.png 1080w, images/Image-682x-p-1600.png 1600w, images/Image-682x.png 2000w"
                             sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="master-heading"
                             class="image-29">`;
            break;
        case "Module heading":
            sampleImage = `<img src="images/Image-692x.png"
                             srcset="images/Image-692x-p-500.png 500w, images/Image-692x-p-800.png 800w, images/Image-692x-p-1080.png 1080w, images/Image-692x-p-1600.png 1600w, images/Image-692x.png 2000w"
                             sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="module-heading">`;
            break;
        case "Paragraph heading":
            sampleImage = `<img src="images/Image-702x.png"
                             srcset="images/Image-702x-p-500.png 500w, images/Image-702x-p-800.png 800w, images/Image-702x-p-1080.png 1080w, images/Image-702x-p-1600.png 1600w, images/Image-702x.png 2000w"
                             sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="paragraph-heading">`;
            break;
    }


    $("#sample-design").remove();
    let $sampleDesign = $(`
<div class="sample-page-wrapper" id="sample-design">
    <div class="line-pointer"></div>
    <div id="33" class="div-block-75">
    ${sampleImage}
    </div>
</div>
`);
    $("#design-sample-header").after($sampleDesign);
    console.log("selectedPlatform: ", selectedPlatform,
        "selectedFontFamily", selectedFontFamily,
        "selectedWeight", selectedWeight,
        "selectedFontStyle", selectedFontStyle,
        "selectedSize", selectedSize,
        "selectedLeading", selectedLeading,
        "selectedTracking", selectedTracking,
        "selectedScreen", selectedScreen);
}

function toggleMobile(checkBox) {
    selectedScreen = checkBox.checked ? "mobile" : "desktop";
    mobileSwitch = checkBox;
    selectStyle(selectedStyleElement);

}