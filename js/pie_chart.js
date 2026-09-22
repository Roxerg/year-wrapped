function drawPieChart(plot_identifier, in_data) {
    var data = [];
    var curr_key = "count";
    const color_map = {
        "other": "grey",
        "Raleigh Veloce": prime_col,
        "CDA" : sec_col,
        "Santander Bike": third_col
    };

    var counters = {};
    in_data.forEach((e) => {
        if (e.bike == "") { e.bike = "other"; }
        if (!(e.bike in counters)) {
            counters[e.bike] = { "count": 0, "distance": 0 };
        }
        counters[e.bike]["count"] += 1;
        counters[e.bike]["distance"] += e.distance;
    });

    Object.entries(counters).forEach(([k, bike]) => {
        data.push({
            "count": bike["count"],
            "distance": Math.round(bike["distance"]),
            "distance_unit": "km",
            "count_unit": "rides",
            "name": k,
            "color": color_map[k] || "grey"
        });
    });

    const width = 600;
    const height = 500;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.70; // Expanded center hole for legend & button

    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", "100%")
        .attr("height", "auto");

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const pie = d3.pie().sort(null).value((d) => d["count"]);

    // Render Pie Arcs
    const path = svg.datum(data).selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("fill", (d, i) => data[i]["color"])
        .attr("d", arc)
        .each(function(d) { this._current = d; });

    // Center Container
    const centerGroup = svg.append("g");

    // Center Legend (Stacked vertically in the middle)
    const rowHeight = 18;
    const legendYOffset = -((data.length * rowHeight) / 2) - 15; // Shifted up to make room for button

    const leg = centerGroup.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${legendYOffset + (i * rowHeight)})`);

    leg.append("rect")
        .attr("x", -90)
        .attr("y", -6)
        .attr("width", 12)
        .attr("height", 12)
        .attr("rx", 2)
        .attr("fill", (d) => d.color);

    const legendText = leg.append("text")
        .attr("x", -70)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .style("font-size", "1em")
        .style("font-weight", "500")
        .attr("fill", "#374151")
        .text((d) => `${d.name}: ${d[curr_key]} ${d[curr_key+"_unit"]}`);

    // Center Toggle Button (Positioned below legend items)
    const buttonY = (data.length * rowHeight) / 2 + 10;

    const centerBtn = centerGroup.append("g")
        .attr("transform", `translate(0, ${buttonY})`)
        .style("cursor", "pointer")
        .on("click", change);

    centerBtn.append("rect")
        .attr("x", -50)
        .attr("y", -12)
        .attr("width", 100)
        .attr("height", 24)
        .attr("rx", 12)
        .attr("fill", sec_col);

    const btnText = centerBtn.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "600")
        .text("Mode: Count");

    function change() {
        curr_key = (curr_key === "count") ? "distance" : "count";
        
        btnText.text(`Mode: ${curr_key.charAt(0).toUpperCase() + curr_key.slice(1)}`);
        legendText.text((d) => `${d.name}: ${d[curr_key]} ${d[curr_key+"_unit"]}`);
        
        pie.value((d) => d[curr_key]);
        path.data(pie(data));
        path.transition().duration(750).attrTween("d", arcTween);
    }

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(0);
        return (t) => arc(i(t));
    }

    return svg.node();
}