const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function init() {
    populateSelect();
    $("#your-pay").val(50000);
    $("#reset").addClass("inactive");
    onSelect($("#rich-guy option:selected").val());
    $("#reset").hide();
}

function populateSelect() {
    for (const key in richGuys) {
        $('#rich-guy').append($('<option>', {
            text: richGuys[key]['name'],
            value: richGuys[key]['income']
        }));
    }
}

function onSelect(value) {
    $("#ceo-pay").text(formatter.format(value));
}

function calculate() {
    $("#blade").addClass("drop");
    ceoPay = $("#rich-guy option:selected").val();
    ceoPayPM = ceoPay / (365*24*60);
    yourPay = $("#your-pay").val();
    requiredSecs = yourPay / ceoPayPM;
    result = requiredSecs;
    units = "seconds";
    if (requiredSecs > 3600) {
        result = (requiredSecs / 3600);
        units = "hours";
    } else if (requiredSecs > 60) {
        result = (requiredSecs / 60);
        unit = "minutes";
    }
    result = Math.round(result * 100) / 100;
    $("#interval").text(result)
    $("#units").text(unit);
    setTimeout(setRecipe, 600);
    console.log("Updated");
    $("#calculate").hide();
    $("#reset").show();
}

function setRecipe() {
    index = Math.floor(Math.random() * recipes.length);
    content = recipes[index].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    $("#recipe-title").text(recipes[index].title);
    $("#recipe-content").html(content);
    $("#recipe-container").fadeIn(800);
}

function reset() {
    $("#calculate").show();
    $("#reset").hide();
    $("#blade").removeClass("drop");
    $("#recipe").hide();
    $("#interval").text("")
    $("#units").text("")
}