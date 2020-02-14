let selectedPlatform, selectedTypeface, selectedWeight, selectedStyle, selectedSize, selectedLeading, selectedTracking,
    isMobile = false;

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
    selectedPlatform = paletteElement.innerText;
    let $paletteSelector = $(".palette-selector");
    removeActive($paletteSelector);
    toggleClasses(paletteElement, "active", "passive");
    $("#size-selector, #style-selector, #typeface-selector, #specs").remove();
    let $typefaceSelector = $(`
                <div class="type-selector-row _3" id="typeface-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Typeface</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-18 selector typeface-block passive" onclick="selectTypeface(this)">Corporate A</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-19 selector typeface-block passive" onclick="selectTypeface(this)">CorpoS</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-arial selector typeface-block passive" onclick="selectTypeface(this)">Arial</div>
                    </div>
                </div>
`);
    $(".type-selector-row._1").after($typefaceSelector);
}

function selectTypeface(typefaceElement) {
    selectedTypeface = getComputedStyle(typefaceElement).fontFamily;
    let $typefaceBlocks = $(".typeface-block");
    $typefaceBlocks.removeClass("active");
    typefaceElement.classList.add("active");

    $("#size-selector, #style-selector, #specs").remove();
    $("#typeface-selector").after(
        $(`
                <div class="type-selector-row _3" id="style-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Style</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-20 selector style-block passive" onclick="selectStyle(this)">Regular</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-21 selector style-block passive" onclick="selectStyle(this)">Italic</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-2-bold selector style-block passive" onclick="selectStyle(this)">Bold</div>
                    </div>
                </div>`));
    $(".style-block").css("font-family", selectedTypeface);
}

function selectStyle(styleElement) {
    let computedStyle = getComputedStyle(styleElement);
    selectedWeight = computedStyle.fontWeight;
    selectedStyle = computedStyle.fontStyle;
    let $styleBlocks = $(".style-block");
    $styleBlocks.removeClass("active");
    styleElement.classList.add("active");


    $("#size-selector, #specs").remove();
    $("#style-selector").after(
        $(`
<div class="type-selector-row _2" id="size-selector">
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
    </div>
    <div class="div-block-76">
        <a href="#master-heading" class="typeface-selector-result selector passive size-block" onclick="selectSize(this)">
                <div class="text-block-23 size-block">Master heading</div>
        </a>
        <a href="#module-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-25 size-block">Module heading</div>
        </a>
        <a href="#paragraph-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-26 size-block">Paragraph heading</div>
        </a>
        <a href="#paragraph-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-26 size-block">Paragraph heading</div>
        </a>
    </div>
</div>
        `));

    $(".size-block").css({
        "font-family": selectedTypeface,
        "font-weight": selectedWeight,
        "font-style": selectedStyle
    });
}

function selectSize(sizeElement) {
    let selectedSizeText = sizeElement.innerText;
    let computedStyle = getComputedStyle(sizeElement.childNodes[1]);
    selectedSize = computedStyle.fontSize;
    selectedLeading = computedStyle.lineHeight;
    selectedTracking = computedStyle.letterSpacing;
    let $sizeSelector = $(".typeface-selector-result");
    removeActive($sizeSelector);
    toggleClasses(sizeElement, "active", "passive");

    let $specs = $(`
                        <div class="div-block-80" id="specs">
                            <div class="div-block-79">
                                <div class="text-block-31">size <span class="specs">${selectedSize}</span></div>
                                <div class="text-block-31">leading <span class="specs">${selectedLeading}</span></div>
                                <div class="text-block-31">tracking <span class="specs">${selectedTracking}</span></div>
                            </div>
                        </div>
    `);
    $("#specs").remove();

    $('#specs-wrapper').append($specs);


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


    $("#sample-design, #specs").remove();
    let $sampleDesign = $(`
<div class="sample-page-wrapper" id="sample-design">
    <div class="line-pointer"></div>
    <div id="33" class="div-block-75">
    ${sampleImage}
    </div>
</div>
`);
    $("#design-sample-header").after($sampleDesign);
}

function toggleMobile(checkBox) {
    isMobile = checkBox.checked;
    console.log("selectedPlatform: ", selectedPlatform,
        "selectedTypeface", selectedTypeface,
        "selectedWeight", selectedWeight,
        "selectedStyle", selectedStyle,
        "selectedSize", selectedSize,
        "selectedLeading", selectedLeading,
        "selectedTracking", selectedTracking,
        "isMobile", isMobile);
}