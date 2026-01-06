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

function moneyToFloat(value) {
    return parseFloat(value.replace(/[^0-9.]/g, ''));
}

function init() {
    populateSelect();
    $("#your-pay").val("$50,000");
    $("#reset").addClass("inactive");
    onSelect($("#rich-guy option:selected").val());
    $("#reset").hide();
    var incomeInput = $("#your-pay");
    incomeInput.on("input", function(evt){
        var parsed = moneyToFloat(incomeInput.val());
        if (parsed != NaN) {
            incomeInput.val(formatter.format(parsed));
        }
    });
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
    var ceoPay = $("#rich-guy option:selected").val();
    var ceoPayPerSecond = ceoPay / (365*24*60*60);
    var yourPay = moneyToFloat($("#your-pay").val());
    var requiredSeconds = yourPay / ceoPayPerSecond;
    var result = requiredSeconds;
    var units = "seconds";
    if (requiredSeconds > (3600 * 24)) {
        result = (requiredSeconds / (3600 * 24));
        units = "days";
    } else if (requiredSeconds > 3600) {
        result = (requiredSeconds / 3600);
        units = "hours";
    } else if (requiredSeconds > 60) {
        result = (requiredSeconds / 60);
        units = "minutes";
    }
    var result = Math.round(result * 100) / 100;
    setTimeout(function() {
        $("#interval").text(result)
        $("#units").text(units);
    }, 500);
    setTimeout(setRecipe, 800);
    console.log("Updated");
    $("#calculate").hide();
    $("#reset").show();
}

function setRecipe() {
    var index = Math.floor(Math.random() * recipes.length);
    var content = recipes[index].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    $("#recipe-title").text(recipes[index].title);
    $("#recipe-content").html(content);
    $("#recipe-container").fadeIn(800);
}

function reset() {
    $("#calculate").show();
    $("#reset").hide();
    $("#blade").removeClass("drop");
    $("#recipe-container").hide();
    $("#interval").text("")
    $("#units").text("")
}