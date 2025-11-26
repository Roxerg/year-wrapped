function drawBarPlot(plot_identifier, in_data, y_val, x_val, mark_lines) {

    in_data.sort(function(a,b) {
        return a[y_val] < b[y_val]
    })
    // data.forEach()
    var data = in_data.slice(0,30).reverse()

    const xSize = 1500;
    const ySize = 1000;
    const margin = 40;
    const xMax = xSize - margin*2;
    const yMax = ySize - margin*2;
    
    var x_min = Infinity
    var x_max = 0
    var y_val_min = Infinity
    var y_val_max = 0
    data.forEach(e => {
        if (e.time > x_max) { x_max = e.time }
        if (e.time < x_min) { x_min = e.time }
        if (e[y_val] > y_val_max) { y_val_max = e[y_val] }
        if (e[y_val] < y_val_min) { y_val_min = e[y_val] }
    });

          // Declare the chart dimensions and margins.
    const width = 1500;
    const height = 1000;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 150;
    const marginLeft = 40;

    var labels = []
    data.forEach((e) => labels.push(e.name))
    console.log(data)
    console.log(labels)

    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        // .domain(d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter)) // descending frequency
        .domain(labels) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, 1400])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.select(plot_identifier).append("svg") // d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "orange")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.elevation_gain))
        .attr("height", (d) => y(0) - y(d.elevation_gain))
        .attr("width", x.bandwidth());

    // Add the x-axis and label.
    const x_axis = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    x_axis.selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-45)");

    for (var line of mark_lines) {
        var line_obj = svg.append("g")
        
        line_obj.append("line")
            .attr("x1", marginLeft)
            .attr("y1", function (d) {return y(line[0])})
            .attr("x2", width)
            .attr("y2", function (d) {return y(line[0])})
            .attr("stroke-width", 2)
            .attr("stroke", line[1]);
        
        line_obj.append('text')
         .attr('class', 'barsEndlineText')
         .attr('text-anchor', 'left')
         .attr("x", marginLeft + 2*line[2].length)
         .attr("y", y(line[0])-5)
         .text(line[2])
    }

    // Add the y-axis and label
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y).toFixed()))
        // .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start"));
            // .text("↑ Frequency (%)"));

    // Return the SVG element.

    return svg.node()
}