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
    let $paletteSelector = $(".palette-selector");
    removeActive($paletteSelector);
    toggleClasses(paletteElement, "active", "passive");
    $("#size-selector, #style-selector, #typeface-selector").remove();
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
                        <div class="text-block-19 selector typeface-block passive" onclick="selectTypeface(this)">Arial</div>
                    </div>
                </div>
`);
    $(".type-selector-row._1").after($typefaceSelector);
}

function selectTypeface(typefaceElement) {

    let $typefaceBlocks = $(".typeface-block");
    $typefaceBlocks.removeClass("active");
    typefaceElement.classList.add("active");

    $("#size-selector, #style-selector").remove();
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
                        <div class="text-block-21 selector style-block passive" onclick="selectStyle(this)">Regular Italic</div>
                    </div>
                    <div class="typeface-selector"></div>
                </div>`))
}

function selectStyle(styleElement) {
    let $styleBlocks = $(".style-block");
    $styleBlocks.removeClass("active");
    styleElement.classList.add("active");


    $("#size-selector").remove();
    $("#style-selector").after(
        $(`
<div class="type-selector-row _2" id="size-selector">
    <div class="typesel-header-with-toggle">
        <div class="greyline"></div>
        <div class="corpo20px">Size</div>
        <div class="div-block-58">
            <div class="toggle-image"><img src="images/Mobile.svg" alt=""></div>
            <label class="switch toggle _1">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    <div class="div-block-76">
        <a href="#master-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div>
                <div class="text-block-23">Master heading</div>
            </div>
        </a>
        <a href="#module-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-25">Module heading</div>
        </a>
        <a href="#paragraph-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-26">Paragraph heading</div>
        </a>
        <a href="#paragraph-heading" class="typeface-selector-result selector passive" onclick="selectSize(this)">
            <div class="text-block-26">Paragraph heading</div>
        </a>
    </div>
</div>
        `));
    $("#sample-design").remove();
    let $sampleDesign = $(`
                <div class="sample-page-wrapper" id="sample-design">
                    <div class="div-block-75"><img src="images/Image-682x.png"
                                                   srcset="images/Image-682x-p-500.png 500w, images/Image-682x-p-800.png 800w, images/Image-682x-p-1080.png 1080w, images/Image-682x-p-1600.png 1600w, images/Image-682x.png 2000w"
                                                   sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw"
                                                   alt="" id="master-heading"></div>
                    <div><img src="images/Image-692x.png"
                              srcset="images/Image-692x-p-500.png 500w, images/Image-692x-p-800.png 800w, images/Image-692x-p-1080.png 1080w, images/Image-692x-p-1600.png 1600w, images/Image-692x.png 2000w"
                              sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="module-heading"></div>
                    <div><img src="images/Image-702x.png"
                              srcset="images/Image-702x-p-500.png 500w, images/Image-702x-p-800.png 800w, images/Image-702x-p-1080.png 1080w, images/Image-702x-p-1600.png 1600w, images/Image-702x.png 2000w"
                              sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="paragraph-heading"></div>
                </div>
`);
    $("#design-sample-header").after($sampleDesign);
}

function selectSize(sizeElement) {
    let $sizeSelector = $(".typeface-selector-result");
    removeActive($sizeSelector);
    toggleClasses(sizeElement, "active", "passive");
}