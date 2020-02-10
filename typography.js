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
    $("#typeface-selector").remove();
    let $typefaceSelector = $(`
                <div class="type-selector-row _3" id="typeface-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Typeface</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-18 selector" onclick="selectTypeface(this)">Corporate A</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-19 selector" onclick="selectTypeface(this)">CorpoS</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-19 selector" onclick="selectTypeface(this)">Arial</div>
                    </div>
                </div>
`);
    $(".type-selector-row._1").after($typefaceSelector);
}

function selectTypeface(typefaceElement) {
    $("#style-selector").remove();
    $("#typeface-selector").after(
        $(`
                <div class="type-selector-row _3" id="style-selector">
                    <div class="typesel-header">
                        <div class="greyline"></div>
                        <div class="corpo20px">Style</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-20 selector" onclick="selectStyle(this)">Regular</div>
                    </div>
                    <div class="typeface-selector">
                        <div class="text-block-21 selector" onclick="selectStyle(this)">Regular Italic</div>
                    </div>
                    <div class="typeface-selector"></div>
                </div>`))
}

function selectStyle(styleElement) {
    $("#size-selector").remove();
    $("#style-selector").after(
        $(`
<div class="type-selector-row _2" id="size-selector">
    <div class="typesel-header-with-toggle">
        <div class="greyline"></div>
        <div class="corpo20px">Size</div>
        <div class="div-block-58">
            <div class="toggle-image"><img src="images/Mobile.svg" alt=""></div>
            <div class="toggle _1">
                <div class="toggle-dot"></div>
            </div>
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
                <div class="sample-page-wrapper" >
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