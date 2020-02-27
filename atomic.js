let selectedType, selectedStyle, selectedWidth;

function switchDesignSamples() {
    selectedType = $("input[name='type']:checked").val();
    selectedStyle = $("input[name='style']:checked").val();
    selectedWidth = $("input[name='width']:checked").val();
    console.log("selectedType:", selectedType, "\nselectedStyle:", selectedStyle, "\nselectedWidth:", selectedWidth);

    let imgSource;

    if (selectedType === "text-link") {
        // Bold link
        if (selectedStyle === "bold-link") imgSource = "images/Bold link.jpg";
        // Primary text link
        else if (selectedStyle === "primary-link") imgSource = "images/Primary  text link.jpg";
        // Icon link
        else
        // if (selectedStyle === "icon-link")
            imgSource = "images/Icon-Link.jpg";
    } else {
        // Primary button
        if (selectedStyle === "primary") imgSource = "images/Primary Button.jpg";
        // Secondary button
        else if (selectedStyle === "secondary") imgSource = "images/Secondary Button.jpg";
        // Secondary alternative
        else
        // if (selectedStyle === "secondary-alt")
            imgSource = "images/Secondary Alternative.jpg";
    }
    $("#design-sample").remove();

    $(".cta-example-wrapper").append($(`<img id="design-sample" src="${imgSource}" alt="">`).hide());
    $("#design-sample").fadeIn(400);

    console.log("imgSource", imgSource);
}

function initializeCtaOptions() {

    selectedType = $("input[name='type']:checked").val();
    selectedStyle = $("input[name='style']:checked").val();
    selectedWidth = $("input[name='width']:checked").val();
    console.log("selectedType:", selectedType, "\nselectedStyle:", selectedStyle, "\nselectedWidth:", selectedWidth);

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

$(function () {
    initializeCtaOptions();
});