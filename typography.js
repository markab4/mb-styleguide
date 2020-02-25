let selectedPlatform, selectedTypeface, selectedFontFamily, selectedStyle, selectedWeight, selectedFontStyle,
    selectedSize, selectedStyleElement, mobileSwitch,
    selectedLeading, selectedTracking, selectedScreen = "desktop", selectedSizeText;

function scrollToSelectedImage() {
    (function (f) {
        "use strict";
        "function" === typeof define && define.amd ? define(["jquery"], f) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery)
    })(function ($) {
        "use strict";

        function n(a) {
            return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function h(a) {
            return $.isFunction(a) || $.isPlainObject(a) ? a : {top: a, left: a}
        }

        var p = $.scrollTo = function (a, d, b) {
            return $(window).scrollTo(a, d, b)
        };
        p.defaults = {axis: "xy", duration: 0, limit: !0};
        $.fn.scrollTo = function (a, d, b) {
            "object" === typeof d && (b = d, d = 0);
            "function" === typeof b && (b = {onAfter: b});
            "max" === a && (a = 9E9);
            b = $.extend({}, p.defaults, b);
            d = d || b.duration;
            var u = b.queue && 1 < b.axis.length;
            u && (d /= 2);
            b.offset = h(b.offset);
            b.over = h(b.over);
            return this.each(function () {
                function k(a) {
                    var k = $.extend({}, b, {
                        queue: !0, duration: d, complete: a && function () {
                            a.call(q, e, b)
                        }
                    });
                    r.animate(f, k)
                }

                if (null !== a) {
                    var l = n(this), q = l ? this.contentWindow || window : this, r = $(q), e = a, f = {}, t;
                    switch (typeof e) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                                e = h(e);
                                break
                            }
                            e = l ? $(e) : $(e, q);
                        case "object":
                            if (e.length === 0) return;
                            if (e.is || e.style) t = (e = $(e)).offset()
                    }
                    var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;
                    $.each(b.axis.split(""), function (a, c) {
                        var d = "x" === c ? "Left" : "Top", m = d.toLowerCase(), g = "scroll" + d, h = r[g](),
                            n = p.max(q, c);
                        t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d);
                        b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n));
                        !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {}))
                    });
                    k(b.onAfter)
                }
            })
        };
        p.max = function (a, d) {
            var b = "x" === d ? "Width" : "Height", h = "scroll" + b;
            if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();
            var b = "client" + b, k = a.ownerDocument || a.document, l = k.documentElement, k = k.body;
            return Math.max(l[h], k[h]) - Math.min(l[b], k[b])
        };
        $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
            get: function (a) {
                return $(a.elem)[a.prop]()
            }, set: function (a) {
                var d = this.get(a);
                if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop();
                var b = Math.round(a.now);
                d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a))
            }
        };
        return p
    });

    let imageToScrollTo;
    if (selectedSizeText.includes("Master") || (selectedScreen === "mobile" && selectedSizeText.includes("Heading"))) {
        imageToScrollTo = `${selectedPlatform}-${selectedScreen}-${1}`;
    } else if (selectedSizeText.includes("Module")) {
        imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${3}`;
    } else if (selectedSizeText.includes("CAPS") || (selectedScreen === "mobile" && selectedSizeText.includes("Nav"))) {
        imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${2}`;
    } else if (selectedSizeText.includes("Paragraph")) {
        imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${4}`;
    } else if (selectedSizeText.includes("Navigational")) {
        imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${5}`;
    } else imageToScrollTo = `#placeholder`;
    $('.sample-page-wrapper').scrollTo(imageToScrollTo);
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

function selectPalette(paletteElement) {
    try {
        selectedPlatform = paletteElement.innerText;
        let $paletteSelector = $(".palette-selector");
        removeActive($paletteSelector);
        toggleClasses(paletteElement, "active", "passive");
        $("#size-selector, #style-selector, #typeface-selector, #specs, #sample-design, .sample-image").remove();
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
        $(".type-selector-row._1").after($(typefacesHtml).hide());
        $('#typeface-selector').show(400);
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

    $("#typeface-selector").after($(stylesHtml).hide());
    $(".style-block").css("font-family", selectedFontFamily);
    $('#style-selector').show(400);

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
        <div style="font-size: ${fullStyle.size}; line-height: ${fullStyle.leading}; letter-spacing: ${fullStyle.tracking / 1000}em"
         class="text-block-26 size-block ${sizeList[i]}">${sizeList[i]}</div></div>`;
    }
    sizeHtml += `</div></div>`;
    if (!selectedStyleElement) $previousSelector.after($(sizeHtml).hide());
    else $previousSelector.append($(sizeHtml));
    $(".size-block").css({
        "font-family": selectedFontFamily,
        "font-weight": selectedWeight,
        "font-style": selectedFontStyle
    });
    $('#size-selector').show(400);


    selectedStyleElement = styleElement;
}

function selectSize(sizeElement) {

    // jQuery.fn.scrollTo = function (elem, speed) {
    //     $(this).animate({
    //         scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    //     }, speed === undefined ? 1000 : speed);
    //     return this;
    // };

    selectedSizeText = sizeElement.innerText;
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

    if ($(".sample-image").length === 0) {

        let sampleImages = ``, numberOfImages = 4, outerWidth = $(`.design-example-section`).outerWidth();

        if (selectedScreen === "desktop" && selectedPlatform === "MBUSA") numberOfImages = 5;

        for (let i = 1; i <= numberOfImages; i++) {
            sampleImages += `<img src='images/Screens/${selectedPlatform}-${selectedScreen}-screens/${selectedPlatform}-${selectedScreen}-${i}.jpg' alt=""
                              id="${selectedPlatform}-${selectedScreen}-${i}" class="sample-image">`
        }
        sampleImages += `<img class="sample-image" src='images/Screens/Mercedes-Benz-Logo.jpg' alt="" id="placeholder">`;
        console.log(sampleImages);

        let $container = $('.sample-page-wrapper');
        $container.css("max-width", $("#design-sample-header").css("width"));
        $container.append($(sampleImages));
    }

    if ($(".sample-image").length) {
        console.log("right before");
        scrollToSelectedImage();
        console.log("right after");
    }
    // let imageToScrollTo;
    // if (selectedSizeText.includes("Master") || (selectedScreen === "mobile" && selectedSizeText.includes("Heading"))) {
    //     imageToScrollTo = `${selectedPlatform}-${selectedScreen}-${1}`;
    // } else if (selectedSizeText.includes("Module")) {
    //     imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${3}`;
    // } else if (selectedSizeText.includes("CAPS") || (selectedScreen === "mobile" && selectedSizeText.includes("Nav"))) {
    //     imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${2}`;
    // } else if (selectedSizeText.includes("Paragraph")) {
    //     imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${4}`;
    // } else if (selectedSizeText.includes("Navigational")) {
    //     imageToScrollTo = `#${selectedPlatform}-${selectedScreen}-${5}`;
    // } else imageToScrollTo = `#placeholder`;
    // try {
    //     // $container.scrollTo(imageToScrollTo);
    //     // let scroll =$(imageToScrollTo)[0].offsetTop;
    //     $container.scrollTo(imageToScrollTo);
    // } catch {
    //     console.log("fail");
    //     // console.log("$(\"#placeholder\")", $("#placeholder"));
    //     // let scrollTop = $("#placeholder").offset().top;
    //     // $container.scrollTop(scrollTop);
    //     // console.log("No image yet");
    // }


    // let $scrollTo = $('#MBUSA-desktop-3');


    // $("#sample-design").remove();


    console.log("selectedPlatform: ", selectedPlatform,
        "selectedFontFamily: ", selectedFontFamily,
        "selectedWeight: ", selectedWeight,
        "selectedFontStyle: ", selectedFontStyle,
        "selectedSize: ", selectedSize,
        "selectedLeading: ", selectedLeading,
        "selectedTracking: ", selectedTracking,
        "selectedScreen: ", selectedScreen)
    ;
}

function toggleMobile(checkBox) {
    selectedScreen = checkBox.checked ? "mobile" : "desktop";
    mobileSwitch = checkBox;
    $("#sample-design, .sample-image").remove();
    selectStyle(selectedStyleElement);
}
