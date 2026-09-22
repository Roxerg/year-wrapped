function drawDotPlot(plot_identifier, in_data, y_val, x_val, mark_lines) {
    // Canvas dimensions and margins
    const width = 600;
    const height = 500;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    var x_min = d3.min(in_data, d => d[x_val]);
    var x_max = d3.max(in_data, d => d[x_val]);
    var y_val_min = d3.min(in_data, d => d[y_val]);
    var y_val_max = d3.max(in_data, d => d[y_val]);

    var tooltip = d3.select(plot_identifier).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Responsive SVG Container using viewBox
    const svg = d3.select(plot_identifier)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "auto")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis Scale
    const year = x_min.getFullYear();
    const x = d3.scaleTime()
        .domain([new Date(year, 0, 1), new Date(year, 11, 1)])
        .range([0, innerWidth]);

    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b")));

    // Y Axis Scale
    const y = d3.scaleLinear()
        .domain([y_val_min, y_val_max])
        .nice() // Extends domain nicely to round values
        .range([innerHeight, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    function idleDot(dot) {
        dot.transition()
            .attr("r", function (d) {
                return 5 + Math.min(d[y_val] / 20, 10);
            })
            .transition()
            .style("fill", function (d) {
                return d.commute == "true" ? "Grey" : prime_col;
            });
    }

    function highlightDot(dot) { 
        dot.transition()
            .style("fill", third_col) 
            .transition()
            .attr("r", 20);
    }

    // Benchmark Lines
    for (var line of mark_lines) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", y(line[0]))
            .attr("x2", innerWidth)
            .attr("y2", y(line[0]))
            .attr("stroke-width", 2)
            .attr("stroke", line[1]);
    }

    // Render Data Dots
    const circles = svg.selectAll("circle")
        .data(in_data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d[x_val]))
        .attr("cy", d => y(d[y_val]))
        .attr("r", 5)
        .on("mouseover", function (evt, d) {
            highlightDot(d3.select(this));
            tooltip.transition()
                .duration(500)
                .style("opacity", .9);
            tooltip.html(
                d.name
                + "<br/>"
                + d[x_val].toLocaleDateString("en-GB") 
                + "<br/>"
                + y_val + ": " + d[y_val] + "<br/>"
                + "avg speed: " + d.average_speed + " km/h"
            )
            .style("left", (evt.pageX + 20) + "px")
            .style("top", (evt.pageY - 28) + "px");
        })
        .on("mouseout", function() { 
            d3.select(this).call(idleDot);
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });        

    idleDot(circles);
}

function drawAltDotPlot(plot_identifier, in_data, y_val, x_val) {

        // Filter out zero/negative distances (Log scale requires > 0)
        var data = in_data.filter((e) => e.distance > 0 && e.average_speed > 0)

        data.sort(function(a,b) {
            return a.distance - b.distance
        })

        const width = 600;
        const height = 500;

        // Set equal padding to center the chart content within the canvas
        const paddingX = 60;
        const paddingY = 60;

        // Logarithmic X Scale centered horizontally
        const x = d3.scaleLog()
            .domain(d3.extent(data, d => d.distance))
            .range([paddingX, width - paddingX]);

        // Linear Y Scale centered vertically
        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d[y_val]))
            .range([height - paddingY, paddingY]);

        // Create SVG container
        const svg = d3.select(plot_identifier).append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;")
            .style("-webkit-tap-highlight-color", "transparent")
            .style("overflow", "visible");

        // Logarithmic Linear Regression Trendline
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

        data.forEach(d => {
            const xVal = Math.log(d.distance);
            const yVal = d[y_val];
            sumX += xVal;
            sumY += yVal;
            sumXY += xVal * yVal;
            sumXX += xVal * xVal;
        });

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        const xMin = d3.min(data, d => d.distance);
        const xMax = d3.max(data, d => d.distance);

        const y1Val = slope * Math.log(xMin) + intercept;
        const y2Val = slope * Math.log(xMax) + intercept;

        // Render Trend Line
        svg.append("line")
            .attr("class", "trend-line")
            .attr("x1", x(xMin))
            .attr("y1", y(y1Val))
            .attr("x2", x(xMax))
            .attr("y2", y(y2Val))
            .attr("stroke", sec_col)
            .attr("stroke-width", 2.5)
            .attr("stroke-dasharray", "6 4");

        // Plot Dots
        svg.selectAll("dot")
            .data(data).enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.distance) } )
            .attr("cy", function (d) { return y(d[y_val]) } )
            .attr("r", 5)
            .style("fill", function (d) {
                    if (d.commute == "true") { return "Grey" } 
                    else { return prime_col }
                });
}