function init() {
    let winnersAPI = "/api/v1.0/winners";
  
    d3.json(winnersAPI).then(function(data) {
      console.log(data);
      createPlots(data);
      createMap(data);
    });
  }
  
  // Function to build the plots
  function createPlots(data) {
    // Filter down data to males
    const maleWinners = data.filter(d => d.Gender === 'male');
  
    // Group by category and count the number of male winners
    const maleCatWinners = d3.group(
      maleWinners,
      d => d.Category
    );
  
    // Prepare data for the male winners plot
    let maleTrace = {
      x: Array.from(maleCatWinners.keys()), // Categories as x-axis
      y: Array.from(maleCatWinners.values(), d => d.length), // Number of male winners as y-axis
      type: "bar",
      orientation: "v",
    };
  
    let maleLayout = {
      title: "Male Winners by Category",
      xaxis: {
        title: "Category",
      },
      yaxis: {
        title: "Number of Winners",
      },
      height: 400,
      width: 500,
    };
  
    Plotly.newPlot("male", [maleTrace], maleLayout);
  
    // Filter down data to females
    const femaleWinners = data.filter(d => d.Gender === 'female');
  
    // Group by category and count the number of female winners
    const femaleCatWinners = d3.group(
      femaleWinners,
      d => d.Category
    );
  
    // Prepare data for the female winners plot
    let femaleTrace = {
      x: Array.from(femaleCatWinners.keys()), // Categories as x-axis
      y: Array.from(femaleCatWinners.values(), d => d.length), // Number of female winners as y-axis
      type: "bar",
      orientation: "v",
    };
  
    let femaleLayout = {
      title: "Female Winners by Category",
      xaxis: {
        title: "Category",
      },
      yaxis: {
        title: "Number of Winners",
      },
      height: 400,
      width: 500,
    };
  
    Plotly.newPlot("female", [femaleTrace], femaleLayout);
  }
  
  function createMap(data) {
    // Create a map object
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
    });
  
    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(myMap);
  
    // Create markers and generate Wikipedia URLs
    data.forEach(item => {
      const { Name, Birth_Country, Category, Motivation} = item;
  
      // Generate Wikipedia URL
      const wikipediaURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(Name)}`;
  
      // Create marker
      L.marker([Birth_Country[0], Birth_Country[1]])
        .addTo(myMap)
        .bindPopup(`
          <h3>${Name}</h3>
          <p><strong>Birth Country:</strong> ${Birth_Country}</p>
          <p><strong>Category:</strong> ${Category}</p>
          <p><strong>Motivation:</strong> ${Motivation}</p>
          <p><a href="${wikipediaURL}" target="_blank">More info on Wikipedia</a></p>
        `);
    });
  }
  
  init();
  
  

