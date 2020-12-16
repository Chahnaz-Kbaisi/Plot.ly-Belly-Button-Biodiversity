// Step 1: Plotly
// 1. Use the D3 library to read in `samples.json`.
// Using d3.json() to fetch data from JSON samples file:

d3.json("data/samples.json").then((incomingData) => {

    console.log(incomingData);

    var data = incomingData;
    console.log(data);

    // Adding test subject id number to the drop down menus
    var names = data.names;

    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })

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
            orientation: "h"
        };

        // data
        var BarData = [trace1];

        var layout = {
            title: "Top 10 UTOs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            autosize: false,
            width: 450,
            height: 600
        }

        Plotly.newPlot("bar", BarData, layout);


        // 3. Create a bubble chart that displays each sample.
        // Plot 2: Bubble Chart
        var trace2 = {
            x: defaultotuids,
            y: defaultSampleValues,
            text: defaultotulabels,
            mode: 'markers',
            markers: {
                color: defaultotuids,
                size: defaultSampleValues,
            }
        };
        var BubbleData = [trace2];

        var bubblelayout = {
            title: '<b>Bubble Chart displaying sample values of OTU IDs of the selected individual<b>',

        }

        Plotly.newPlot('bubble', BubbleData, bubblelayout);




        // Demographic Information
        defaultDemographic = data.metadata.filter(sample.id === 940)[0];
        console.log(defaultDemographic);

        Object.entries(defaultDemographic).forEach(
            ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key.toUpperCase()}: ${value}`));





    }


});













