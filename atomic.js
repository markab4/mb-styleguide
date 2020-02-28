function copyStringToClipboard(str) {
    if (str.includes("#")) str = str.substring(str.indexOf("#") + 1).trim();
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}


let selectedType, selectedStyle, selectedWidth;

function switchDesignSamples() {
    selectedType = $("input[name='type']:checked").val();
    selectedStyle = $("input[name='style']:checked").val();
    selectedWidth = $("input[name='width']:checked").val();

    let imgSource;

    if (selectedType === "text-link") {
        // Bold link
        if (selectedStyle === "bold-link") imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e46c6301bee19ad1fc0e83c_Bold%20link.jpg";
        // Primary text link
        else if (selectedStyle === "primary-link") imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e447715f4740e84431fbb5f_Primary%20%20text%20link.jpg";
        // Icon link
        else
        // if (selectedStyle === "icon-link")
            imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e44766dce2bf2604f460247_Primary%20Link.jpg";
    } else {
        // Primary button
        if (selectedStyle === "primary") imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e46c630c8bcef232379344b_Primary%20Button.jpg";
        // Secondary button
        else if (selectedStyle === "secondary") imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e447702fe671a3054a3e830_Secondary%20Button.jpg";
        // Secondary alternative
        else
        // if (selectedStyle === "secondary-alt")
            imgSource = "https://uploads-ssl.webflow.com/5dd45997b98acbf1482572e4/5e46c63207688fab1ae854ac_Secondary%20Alternative-p-800.jpeg";
    }
    $("#design-sample").remove();

    $(".cta-example-wrapper").append($(`<img id="design-sample" src="${imgSource}" alt="">`).hide());
    $("#design-sample").fadeIn(400);
}

function initializeCtaOptions() {

    selectedType = $("input[name='type']:checked").val();
    selectedStyle = $("input[name='style']:checked").val();
    selectedWidth = $("input[name='width']:checked").val();

    $(".cta-specs").remove();
    let $ctaSpecs;
    if (selectedType === "button") {
        $ctaSpecs = $(`
    <div class="cta-specs">
        <div class="div-block-69">
            <div class="buttonsel-header">
                <div class="greyline"></div>
                <div class="corpo20px black">Style</div>
            </div>
            <div class="checkmarks-wrapper-vertical">
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" checked type="radio" id="primary" name="style"
                               value="primary">
                        <label class="radio_label" for="primary">Primary</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="secondary" name="style"
                               value="secondary">
                        <label class="radio_label" for="secondary">Secondary</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="secondary-alt" name="style"
                               value="secondary-alt">
                        <label class="radio_label" for="secondary-alt">Secondary Alt</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="tertiary" name="style"
                               value="tertiary">
                        <label class="radio_label" for="tertiary">Tertiary</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="AMG" name="style"
                               value="AMG">
                        <label class="radio_label" for="AMG">AMG</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="disabled" name="style"
                               value="disabled">
                        <label class="radio_label" for="disabled">Disabled</label><br>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="buttonsel-header">
                <div class="greyline"></div>
                <div class="corpo20px">Width</div>
            </div>
            <div class="checkmarks-wrapper-vertical">
                <div class="checkmarks-block buttons_selector w-clearfix" onclick="switchDesignSamples()">
                    <input class="radio_button" checked type="radio" id="default" name="width"
                           value="default">
                    <label class="radio_label" for="default">Default</label><br>
                </div>
                <div class="checkmarks-block buttons_selector w-clearfix" onclick="switchDesignSamples()">
                    <input class="radio_button" type="radio" id="wide" name="width"
                           value="width">
                    <label class="radio_label" for="wide">Wide</label><br>
                </div>
            </div>
        </div>
    </div>
`);
    } else {
        $ctaSpecs = $(`
    <div class="cta-specs">
        <div class="div-block-69">
            <div class="buttonsel-header">
                <div class="greyline"></div>
                <div class="corpo20px black">Style</div>
            </div>
            <div class="checkmarks-wrapper-vertical">
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" checked type="radio" id="primary-link" name="style"
                               value="primary-link">
                        <label class="radio_label" for="primary-link">Primary Link</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="secondary-link" name="style"
                               value="secondary-link">
                        <label class="radio_label" for="secondary-link">Secondary Link</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="bold-link" name="style"
                               value="bold-link">
                        <label class="radio_label" for="bold-link">Bold Link</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="icon-link" name="style"
                               value="icon-link">
                        <label class="radio_label" for="icon-link">Icon Link</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="in-text-link" name="style"
                               value="in-text-link">
                        <label class="radio_label" for="in-text-link">In-text Link</label><br>
                    </div>
                </div>
                <div class="checkmarks-block buttons_selector">
                    <div class="div-block-53 w-clearfix" onclick="switchDesignSamples()">
                        <input class="radio_button" type="radio" id="in-text-icon-link" name="style"
                               value="in-text-icon-link">
                        <label class="radio_label" for="in-text-icon-link">In-text Icon Link</label><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
`);
    }
    $(".cta-type").after($ctaSpecs.hide());
    $ctaSpecs.show(400);

    switchDesignSamples(selectedType, selectedStyle, selectedWidth);
}

document.addEventListener("DOMContentLoaded", function() {
    initializeCtaOptions();
    let $toCopy = $(".colorsect, .black-block-2");
    $toCopy.attr("onclick", "copyStringToClipboard(this.innerText)");
    $toCopy.addClass("grab");
});
