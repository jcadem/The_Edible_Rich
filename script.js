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

function populateSelect() {
    for (const key in rich_guys) {
        $('#rich-guy').append($('<option>', {
            text: rich_guys[key]['name'],
            value: rich_guys[key]['income']
        }));
    }
}

function populateIncome(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumSignificantDigits: 3
    });
    console.log(value);
    $("#ceo-pay").text(formatter.format(value));
}

function calculate() {
    $("#blade").addClass("drop");
    ceo_pay = $("#rich-guy option:selected").val();
    console.log(ceo_pay);
    ceo_pay_per_min = ceo_pay / (365*24*60);
    console.log(ceo_pay_per_min);
    your_income = $("#your-pay").val();
    console.log(your_income);
    required_time = your_income / ceo_pay_per_min;
    $("#interval").text(required_time + " minutes")
    console.log("animated")
}