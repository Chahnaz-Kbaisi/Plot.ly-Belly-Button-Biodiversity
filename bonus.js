// Another way of doing the advanced challenge gauge plot to match given plot sceenshot
// Code saource: `https://codepen.io/ascotto/pen/eGNaqe?editors=0011`
// Advanced Challenge Assignment (Optional)
// Plot 3: Gauge Chart
function buildGauge(sample) {
    d3.json("data/samples.json").then((incomingData) => {
        console.log(incomingData);
        // From samples.json
        data = incomingData;
        console.log(data);

        filteredGaugeData = metadata.filter((sample) => parseInt(sample.id) === parseInt(sample));
        var wfreq = filteredGaugeData.wfreq;
        console.log(filteredGaugeData);
        var sample_id = filteredGaugeData.id;
        console.log(wfreq);
        var level = (filteredGaugeData.wfreq / 9) * 180;
        function gaugePointer(value) {
            // Calculating meter point
            var degrees = 180 - (value * 20),
                radius = .6;
            var radians = degrees * Math.PI / 180;
            var x = radius * Math.cos(radians);
            var y = radius * Math.sin(radians);

            // Path: may have to change to create a better triangle
            var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
                pathX = String(x),
                space = ' ',
                pathY = String(y),
                pathEnd = ' Z';
            var path = mainPath.concat(pathX, space, pathY, pathEnd);
            return path;
        };

        // Create the data array for the plot
        var datagauge = [
            {
                value: wfreq,
                type: 'scatter',
                x: [0], y: [0],
                marker: { size: 18, color: '850000' },
                showlegend: false,
                name: 'Times',
                text: sample_id,
                hoverinfo: 'text+value+name'
            },
            {
                values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
                rotation: 90,
                text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ['rgba(10, 20, 0, .5)', 'rgba(44, 157, 10, .5)',
                        'rgba(110, 184, 42, .5)', 'rgba(170, 202, 42, .5)',
                        'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)',
                        'rgba(232, 226, 202, .5)', 'rgba(242, 226, 202, .5)',
                        'rgba(252, 236, 202, .5)', 'rgba(255, 255, 255, 0)']
                },
                labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }];

        // Define the plot layout
        var layoutgauge = {
            shapes: [{
                type: 'path',
                path: gaugePointer(wfreq),
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            margin: { t: 100, b: 0 },
            title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
            autosize: true,
            xaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1]
            },
            yaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1],
            },
        };

        // Plot the "gauge" chart 
        Plotly.newPlot('gauge', datagauge, layoutgauge);
    });
};

