// Step 1: Plotly
// 1. Use the D3 library to read in `samples.json`.
// Using d3.json() to fetch data from JSON samples file:

d3.json("data/samples.json").then((incomingData) => {
    console.log(incomingData);

    // From samples.json
    var data = incomingData;
    console.log(data);

    // Adding test subject id number to the drop down menus
    var names = data.names;
    // Selecting dropdown tag
    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    });

    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.     

    // Initializes the page with a default plot
    function init() {

        // Setting the first test id number as the default for plotting
        defaultTestId = data.samples.filter(sample => sample.id === "940")[0];
        console.log(defaultTestId);

        // * Use `sample_values` as the values for the bar chart.
        defaultSampleValues = defaultTestId.sample_values;

        // * Use `otu_ids` as the labels for the bar chart.
        defaultotuids = defaultTestId.otu_ids;

        // * Use `otu_labels` as the hovertext for the chart.
        defaultotulabels = defaultTestId.otu_labels;

        // The top 10 OTUs
        sampleValues = defaultSampleValues.slice(0, 10).reverse();
        sampleotuids = defaultotuids.slice(0, 10).reverse();
        sampleotulabels = defaultotulabels.slice(0, 10).reverse();

        console.log(sampleValues);
        console.log(sampleotuids);
        console.log(sampleotulabels);

        // Plot 1: Bar Chart
        var trace1 = {
            x: sampleValues,
            y: sampleotuids.map(outId => `OTU ${outId}`),
            text: sampleotulabels,
            type: "bar",
            orientation: "h",
        };

        // data
        var databar = [trace1];

        var layoutbar = {
            title: "Top 10 UTOs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            autosize: false,
            width: 500,
            height: 600,
        }

        Plotly.newPlot("bar", databar, layoutbar);

        // 3. Create a bubble chart that displays each sample.
        // Plot 2: Bubble Chart
        var trace2 = {
            x: defaultotuids,
            y: defaultSampleValues,
            text: defaultotulabels,
            mode: 'markers',
            marker: {
                color: defaultotuids,
                size: defaultSampleValues,
            },
        };
        var databubble = [trace2];

        var layoutbubble = {
            title: 'Sample Display',
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Value" },
            showlegend: false,

        };

        Plotly.newPlot('bubble', databubble, layoutbubble);

        // Filtering Demographic information 
        defaultDemographic = data.metadata.filter(sample => sample.id === 940)[0];
        console.log(defaultDemographic);

        // Getting a reference to the table using d3
        var panelBody = d3.select("#sample-metadata");
        // Using d3 to append table row to `p` for each metadata
        var row = panelBody.append("p");
        // Using the `Object.entries` to console.log each metadata
        Object.entries(defaultDemographic).forEach(([key, value]) => {
            console.log(key, value);
            // Append a cell to the row for each value
            var cell = row.append("p");
            cell.text(`${key.toUpperCase()}: ${value}`);
        });

    };

    init();

    // Call updatePlotly() when a change takes place to select different subject text id
    d3.selectAll("body").on("change", updatePlotly);

    // Function called when dropdown menue items are selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var inputElement = d3.select("selDataset");

        // Assign the value of the dropdown menu option to a variable
        // var switchValue = inputElement.node().value;

        // Getting the value property of the input element
        var inputValue = inputElement.property("value");
        console.log(inputValue);

        // Use the form input to filter the dataset by id
        var filteredData = data.samples.filter((sample) => sample.id === inputValue)[0];
        console.log(filteredData);

        // Selected test id sample_values
        idSampleValues = filteredData.sample_values;

        // Select test id otu_ids
        idOtuIds = filteredData.otu_ids;

        // Select test id otu_labels
        idOtuLabels = filteredData.otu_labels;

        // Select the top 10 OTUs
        top10Values = idSampleValues.slice(0, 10).reverse();
        top10Ids = idOtuIds.slice(0, 10).reverse();
        top10Labels = idOtuLabels.slice(0, 10).reverse();


        // Plot 1: Bar Chart
        Plotly.restyle("bar", "x", [top10Values]);
        Plotly.restyle("bar", "y", [top10Ids.map(outId => `OTU ${outId}`)]);
        Plotly.restyle("bar", "text", [top10Labels]);

        // Plot 2: Bubble Chart
        Plotly.restlye('bubble', "x", [idOtuIds]);
        Plotly.restlye('bubble', "y", [idSampleValues]);
        Plotly.restlye('bubble', "text", [idOtuLabels]);
        Plotly.restlye('bubble', "market.color", [idOtuIds]);
        Plotly.restlye('bubble', "marker.size", [idSampleValues]);

        // Demographic information 
        DemoInfo = data.metadata.filter((sample) => sample.id === inputValue)[0];

        // Clear out current contents in the panel
        tbody.html("");

        // Getting a reference to the table using d3
        var panelBody = d3.select("#sample-metadata");
        // Using d3 to append table row to `p` for each metadata
        var row = panelBody.append("p");
        // Using the `Object.entries` to console.log each metadata
        Object.entries(DemoInfo).forEach(([key, value]) => {
            console.log(key, value);
            // Append a cell to the row for each value
            var cell = row.append("p");
            cell.text(`${key.toUpperCase()}: ${value}`);
        });

    };
});





