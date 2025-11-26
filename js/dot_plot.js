function drawDotPlot(plot_identifier, in_data, y_val, x_val, mark_lines) {
    // Set Dimensions
    const xSize = 1500;
    const ySize = 1000;
    const margin = 40;
    const xMax = xSize - margin*2;
    const yMax = ySize - margin*2;

    const data = [];
    
    var x_min = Infinity
    var x_max = 0
    var y_val_min = Infinity
    var y_val_max = 0
    in_data.forEach(e => {
        if (e.time > x_max) { x_max = e.time }
        if (e.time < x_min) { x_min = e.time }
        if (e[y_val] > y_val_max) { y_val_max = e[y_val] }
        if (e[y_val] < y_val_min) { y_val_min = e[y_val] }
        // data.push([e.time, e.distance])
    });

    var tooltip = d3.select(plot_identifier).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append SVG Object to the Page
    const svg = d3.select(plot_identifier)
        .append("svg")
        .attr("width", xSize)
        .attr("height", ySize)
        .append("g")
        .attr("transform","translate(" + margin + "," + margin + ")");

    var date_domain = []
    for (var i=0; i<12; i++) {
        date_domain.push(new Date(2025, i, 1))
    }
    console.log(date_domain)
    // X Axis
    const x = d3.scaleTime()
        .domain([x_min, x_max])
        .range([0, xMax]); // xMax

    svg.append("g")
        .attr("transform", "translate(0," + yMax + ")")
        .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)));

    // Y Axis
    console.log(y_val, y_val_min, y_val_max)
    const y = d3.scaleLinear()
        .domain([y_val_min, y_val_max])
        .range([ yMax, 0]); // yMax

    svg.append("g")
        .call(d3.axisLeft(y));

    function idleDot(dot) {
        dot.transition()
            .attr("r", function (d) {
                return 5 + Math.min(d[y_val] / 20, 10)
            })
            .transition()
            .style("fill", function (d) {
                if (d.commute == "true") { return "Grey" } 
                else { return "Orange" }
            })
            
    }

    function highlightDot(dot) { 
        dot
        .transition()
        .style("fill", "#87A4F6") 
        .transition()
        .attr("r", 20)
    }

    for (var line of mark_lines) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", function (d) {return y(line[0])})
            .attr("x2", xMax)
            .attr("y2", function (d) {return y(line[0])})
            .attr("stroke-width", 2)
            .attr("stroke", line[1]);
    }

    // Dots
    svg.selectAll("dot")
        .data(in_data).enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[x_val]) } )
        .attr("cy", function (d) { return y(d[y_val]) } )
        .attr("r", 5)
        .on("mouseover", function (evt, d) {
            highlightDot(d3.select(this))
            const [mx, my] = d3.pointer(evt);
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
        .on("mousemove", function (evt, d) { 
            const [mx, my] = d3.pointer(evt);
        })       
        .on("mouseout", function(d) { 
            d3.select(this).call(idleDot)
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })        

    idleDot(svg.selectAll("circle"))
    }

function drawAltDotPlot(plot_identifier, in_data, y_val, x_val) {

        var data = in_data.sort(function(a,b) {
            return a[x_val] > b[x_val]
        })
        
        // data.forEach((e) => e.average_speed = )

        const commutes = data.filter((e) => e.commute == "true")
        const rides = data.filter((e) => e.commute != "true")

        const average_speed_commute = commutes.reduce(
            (accum, curr_val) => accum + curr_val.average_speed, 0) / commutes.length
        const average_speed = rides.reduce(
            (accum, curr_val) => accum + curr_val.average_speed, 0) / rides.length

        var data = data.filter((e) => e.average_speed > 0)

        const width = 1500;
        const height = 500;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Declare the x (horizontal position) scale.
        const x = d3.scaleUtc(d3.extent(data, d => d.time), [marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear([0, d3.max(data, d => d.average_speed)], [height - marginBottom, marginTop]);

        // Create the SVG container.
        const svg =  d3.select(plot_identifier).append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;")
            .style("-webkit-tap-highlight-color", "transparent")
            .style("overflow", "visible")

        // Add the x-axis.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        // Add the y-axis, remove the domain line, add grid lines and a label.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Average Speed"));

        svg.selectAll("dot")
            .data(data).enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[x_val]) } )
            .attr("cy", function (d) { return y(d[y_val]) } )
            .attr("r", 5)
            .style("fill", function (d) {
                    if (d.commute == "true") { return "Grey" } 
                    else { return "Orange" }
                })

        for (var line of [
            [average_speed_commute, "Red", `Average Commute Speed: ${average_speed_commute}`],
            [average_speed, "Red", `Average Sport Ride Speed: ${average_speed}`]
        ]) {

            console.log(line)
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

}