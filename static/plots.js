

// Create a function to initialize the page
function init() {
    let winnersAPI = "/api/v1.0/winners";
  
    d3.json(winnersAPI).then(function(data) {

      // Call Functions
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
  
    // Create Layout
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
  
    // Create Layout
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
  
  // Function to build the map
function createMap(data) {

    // Create the map object
    let map = L.map(
      "map",
      {
          center: [45.92, 6.68],
          crs: L.CRS.EPSG3857,
          zoom: 3,
          zoomControl: true,
          preferCanvas: false,
     }
  );

  // Add tile layer
    let tile_layer_b8c89cefc0a3117cd8f5b5ec8c0e05e3 = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {"attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
  ).addTo(map);


    // Loop through the data and add markers to the map
    data.forEach(function(item) {

      // Extract latitude and longitude from the coordinates column
      let coordinates = item.Coordinates.split(', ');
      let latitude = parseFloat(coordinates[0]);
      let longitude = parseFloat(coordinates[1]);
  
      // Add a marker to the map
      let marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup('<b>' + item.Name + '</b><br>' + item.Motivation + '<br>' + item.Gender + '<br>' + item.Category + '<br><a href="' + item.Wikipedia_URL + '">Wikipedia</a>');

      // Add a tooltip to the marker
      marker.on('mouseover', function() {
        marker.bindTooltip('Click to Learn More').openTooltip();
      });


    });
  }

  // Initialize the page
init();
  

