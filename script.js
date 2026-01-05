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
    onSelect($("#rich-guy option:selected").val());
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
    result = requiredSecs + " seconds";
    if (requiredSecs > 3600) {
        result = (requiredSecs / 3600) + " hours";
    } else if (requiredSecs > 60) {
        result = (requiredSecs / 60) + " minutes";
    }
    $("#interval").text(result)
    setTimeout(setRecipe, 600);
    console.log("Updated");
}

function setRecipe() {
    index = Math.floor(Math.random() * recipes.length);
    content = recipes[index].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    $("#recipe-title").text(recipes[index].title);
    $("#recipe-content").html(content);
    $("#recipe").fadeIn(800);
}

function reset() {
    $("#blade").removeClass("drop");
    $("#recipe").hide();
    $("#interval").text("--?--")
}