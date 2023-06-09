let winnersAPI = "/api/v1.0/winners";

d3.json(winnersAPI).then(function (data) {
    console.log(data);
});



function innit() {
    d3.json(winnersAPI).then(function (data) {
        console.log(data);
        MaleChart(data);
        FemaleChart(data);
    });
}


// function to build the plots
function MaleChart() {
    d3.json(winnersAPI).then(function (data) {

    // filter down data to Males
    const maleWinners = data.filter(d => d.Gender === 'male');

    // filter down data to Other
    // const otherWinners = data.filter(d => d.Gender === 'org');

    // filter by category and count the number of male winners
    const maleCatWinners = d3.group(maleWinners, d => d.Category, d => d.Gender, entries => entries.length);

    // filter by category and count the number of other winners
    // const otherCatWinners = d3.group(otherWinners, d => d.Category, d => d.Gender, entries => entries.length);
    
    let trace = {
        x: maleCatWinners,
        y: maleWinners,
        type: "bar",
        orientation: "h",
        
    };

    let layout = {
        title: 'Male Winners By Category',
        width: 400,
        height: 400,
    };

    plotly.newPlot("male", [trace], layout);

    });
}

// function to build the plots
function FemaleChart() {
    d3.json(winnersAPI).then(function (data) {

    // filter down data to Females
    const femaleWinners = data.filter(d => d.Gender == 'female');

    // filter down data to Other
    // const otherWinners = data.filter(d => d.Gender === 'org');

    // filter by category and count the number of female winners
    const femCatWinners = d3.group(femaleWinners, d => d.Category, d => d.Gender, entries => entries.length);

    // filter by category and count the number of other winners
    // const otherCatWinners = d3.group(otherWinners, d => d.Category, d => d.Gender, entries => entries.length);

    let trace1 = {
        x: femCatWinners,
        y: femaleWinners,
        type: "bar",
        orientation: "h",
        
    };

    let layout = {
        title: 'Female Winners By Category',
        width: 400,
        height: 400,
    };

    plotly.newPlot("female", [trace1], layout);

});
}

innit();