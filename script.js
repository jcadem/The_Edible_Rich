const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

/*
    Parses a formatted currency value and returns the raw number
*/
function moneyToFloat(value) {
    return parseFloat(value.replace(/[^0-9.]/g, ''));
}

/*
    Converts seconds to minutes, hours, or days as appropriate
    and rounds to two places
*/
function toHumanUnits(seconds) {
    var result = seconds;
    var units = "seconds";
    if (seconds > (3600 * 24)) {
        result = (seconds / (3600 * 24));
        units = "days";
    } else if (seconds > 3600) {
        result = (seconds / 3600);
        units = "hours";
    } else if (seconds > 60) {
        result = (seconds / 60);
        units = "minutes";
    }
    result = Math.round(result * 100) / 100;
    return { "quantity": result, "units": units};
}

/*
    Page load handler
*/
function init() {
    reset();
    populateSelect();
    onSelect($("#rich-guy option:selected").val());
    var incomeInput = $("#your-pay");
    incomeInput.val("$50,000");
    incomeInput.on("input", evt => formatCurrencyInput);
}

/*
    Handle for inputs, attempts to format as currency
*/
function formatCurrencyInput(event) {
    var parsed = moneyToFloat(incomeInput.val());
    if (parsed != NaN) {
        incomeInput.val(formatter.format(parsed));
    }
    reset();
}

/*
    Helper to populate select from data
*/
function populateSelect() {
    for (const key in richGuys) {
        $('#rich-guy').append($('<option>', {
            text: richGuys[key]['name'],
            value: richGuys[key]['income']
        }));
    }
}

/*
    Handle for a selection from the select
*/
function onSelect(value) {
    $("#ceo-pay").text(formatter.format(value));
    reset();
}

/*
    Handler for clicking the calculate button
*/
function calculate() {
    isReset = false;
    $("#blade").addClass("drop");
    var ceoPay = $("#rich-guy option:selected").val();
    var ceoPayPerSecond = ceoPay / (365*24*60*60);
    var yourPay = moneyToFloat($("#your-pay").val());
    var yourLifetimePay = yourPay * 45;
    var requiredSeconds = yourPay / ceoPayPerSecond;
    var requiredLifetimeSeconds = yourLifetimePay / ceoPayPerSecond;
    var result = toHumanUnits(requiredSeconds);
    var lifetimeResult = toHumanUnits(requiredLifetimeSeconds);
    
    setTimeout( () => setResults(result, lifetimeResult), 500);
    setTimeout(setRecipe, 1000);

    $("#calculate").hide();
    $("#reset").show();
}

/*
    Helper to add the results to the page
*/
function setResults(result, lifetimeResult) {
    $("#interval").text(result.quantity);
    $("#units").text(result.units);
    $("#extra").text("If you saved this salary for 45 years, they would make that amount in "
        + lifetimeResult.quantity + " " + lifetimeResult.units);
    $("#results-container").fadeIn(600);
}

/*
    Helper which selects a recipe from the list and adds it to the page
*/
function setRecipe() {
    var index = Math.floor(Math.random() * recipes.length);
    var content = recipes[index].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    $("#recipe-title").text(recipes[index].title);
    $("#recipe-content").html(content);
    $("#recipe-container").fadeIn(800);
}

/*
    Handler for the reset button
*/
function reset() {
    $("#calculate").show();
    $("#reset").hide();
    $("#blade").removeClass("drop");
    $("#recipe-container").hide();
    $("#results-container").hide();
}