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
        $("#size-selector, #style-selector, #typeface-selector, #specs, #sample-design").remove();
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
        "Medium/Bold": "text-block-2-bold",
        "Italic": "text-block-21",
        "Bold": "text-block-2-bold"
    };

    selectedFontFamily = getComputedStyle(typefaceElement).fontFamily;
    let $typefaceBlocks = $(".typeface-block");
    $typefaceBlocks.removeClass("active");
    typefaceElement.classList.add("active");
    $("#size-selector, #style-selector, #specs, #sample-design").remove();
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

    $("#size-blocks, #specs, #sample-design").remove();

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
    <div style="font-size: ${fullStyle.size}; line-height: ${fullStyle.leading}; letter-spacing: ${fullStyle.tracking/1000}em"
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

    // let sampleImage;
    // switch (selectedSizeText) {
    //     case "Master heading":
    //         sampleImage = `<img src="images/Image-682x.png"
    //                          srcset="images/Image-682x-p-500.png 500w, images/Image-682x-p-800.png 800w, images/Image-682x-p-1080.png 1080w, images/Image-682x-p-1600.png 1600w, images/Image-682x.png 2000w"
    //                          sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="master-heading"
    //                          class="image-29">`;
    //         break;
    //     case "Module heading":
    //         sampleImage = `<img src="images/Image-692x.png"
    //                          srcset="images/Image-692x-p-500.png 500w, images/Image-692x-p-800.png 800w, images/Image-692x-p-1080.png 1080w, images/Image-692x-p-1600.png 1600w, images/Image-692x.png 2000w"
    //                          sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="module-heading">`;
    //         break;
    //     case "Paragraph heading":
    //         sampleImage = `<img src="images/Image-702x.png"
    //                          srcset="images/Image-702x-p-500.png 500w, images/Image-702x-p-800.png 800w, images/Image-702x-p-1080.png 1080w, images/Image-702x-p-1600.png 1600w, images/Image-702x.png 2000w"
    //                          sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="" id="paragraph-heading">`;
    //         break;
    // }


    // $("#sample-design").remove();

//     let $sampleDesign = $(`
// <div class="sample-page-wrapper" id="sample-design">
//     <div class="line-pointer"></div>
//     <div id="33" class="div-block-75">
//     ${sampleImage}
//     </div>
// </div>
// `);

    if ($("#sample-design").length < 1) {  // if there's no sample-design yet
        console.log(`sample design length`, $("#sample-design").length);
        let $sampleDesign = $(`
<div id="sample-design">
                <div id="spinner">Loading...</div>
<!--                <div class="buttons">-->
<!--                    <button id="prev">&uarr; Prev</button>-->
<!--                    <button id="next">&darr; Next</button>-->
<!--                </div>-->
                <div id="carousel">
                    <img src="images/Image-682x.png"
                         srcset="images/Image-682x-p-500.png 500w, images/Image-682x-p-800.png 800w, images/Image-682x-p-1080.png 1080w, images/Image-682x-p-1600.png 1600w, images/Image-682x.png 2000w"
                         sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw"
                         alt="" class="image-29">
                    <img src="images/Image-692x.png"
                         srcset="images/Image-692x-p-500.png 500w, images/Image-692x-p-800.png 800w, images/Image-692x-p-1080.png 1080w, images/Image-692x-p-1600.png 1600w, images/Image-692x.png 2000w"
                         sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="">
                    <img src="images/Image-702x.png"
                         srcset="images/Image-702x-p-500.png 500w, images/Image-702x-p-800.png 800w, images/Image-702x-p-1080.png 1080w, images/Image-702x-p-1600.png 1600w, images/Image-702x.png 2000w"
                         sizes="(max-width: 767px) 100vw, (max-width: 991px) 968px, 98vw" alt="">
                </div>
                </div>
    `);
        $("#design-sample-header").after($sampleDesign);
        loadSamples();
        console.log("NEW DESIGN SAMPLE");
    }

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

function loadSamples() {
    let Carousel = {
        width: $(`.design-example-section`).outerWidth(),     // Images are forced into a width of this many pixels.
        numVisible: 2,  // The number of images visible at once.
        duration: 600,  // Animation duration in milliseconds.
        padding: 2      // Vertical padding around each image, in pixels.
    };

    function rotateForward() {
        let carousel = Carousel.carousel,
            children = carousel.children,
            firstChild = children[0],
            lastChild = children[children.length - 1];
        carousel.insertBefore(lastChild, firstChild);
    }

    function rotateBackward() {
        let carousel = Carousel.carousel,
            children = carousel.children,
            firstChild = children[0],
            lastChild = children[children.length - 1];
        carousel.insertBefore(firstChild, lastChild.nextSibling);
    }

    function animate(begin, end, finalTask) {
        let wrapper = Carousel.wrapper,
            carousel = Carousel.carousel,
            change = end - begin,
            duration = Carousel.duration,
            startTime = Date.now();
        carousel.style.top = begin + 'px';
        let animateInterval = window.setInterval(function () {
            let t = Date.now() - startTime;
            if (t >= duration) {
                window.clearInterval(animateInterval);
                finalTask();
                return;
            }
            t /= (duration / 2);
            let top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                change / 2 * (Math.pow(t - 2, 3) + 2));
            carousel.style.top = top + 'px';
        }, 1000 / 60);
    }

    document.getElementById('spinner').style.display = 'none';
    let carousel = Carousel.carousel = document.getElementById('carousel'),
        images = carousel.getElementsByTagName('img'),
        numImages = images.length,
        imageWidth = Carousel.width,
        aspectRatio = images[0].width / images[0].height,
        imageHeight = imageWidth / aspectRatio,
        padding = Carousel.padding,
        rowHeight = Carousel.rowHeight = imageHeight + 2 * padding;
    carousel.style.width = imageWidth + 'px';
    for (let i = 0; i < numImages; ++i) {
        let image = images[i],
            frame = document.createElement('div');
        frame.className = 'pictureFrame';
        let aspectRatio = image.offsetWidth / image.offsetHeight;
        image.style.width = frame.style.width = imageWidth + 'px';
        image.style.height = imageHeight + 'px';
        image.style.paddingTop = padding + 'px';
        image.style.paddingBottom = padding + 'px';
        frame.style.height = rowHeight + 'px';
        carousel.insertBefore(frame, image);
        frame.appendChild(image);
    }
    Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
    carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px';
    carousel.style.visibility = 'visible';
    let wrapper = Carousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);
    // let prevButton = document.getElementById('prev'),
    //     nextButton = document.getElementById('next');
    // prevButton.onclick = function () {
    //     prevButton.disabled = nextButton.disabled = true;
    //     rotateForward();
    //     animate(-Carousel.rowHeight, 0, function () {
    //         carousel.style.top = '0';
    //         prevButton.disabled = nextButton.disabled = false;
    //     });
    // };
    // nextButton.onclick = gotoNext;

    $(".typeface-selector-result").click(gotoNext);


    function gotoNext() {
        // prevButton.disabled = nextButton.disabled = true;
        animate(0, -Carousel.rowHeight, function () {
            rotateBackward();
            carousel.style.top = '0';
            // prevButton.disabled = nextButton.disabled = false;
        });
    }
}