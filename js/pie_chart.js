function drawPieChart(plot_identifier, in_data) {

    var data = []
    var bikes = []
    var curr_key = "count"
    const color_map = {
        "other": "grey",
        "Raleigh Veloce": "#9e67f0",
        "CDA" : "#78967e",
        "Santander Bike": "red"
    }


    var counters = {}

    in_data.forEach((e) => {
        if (e.bike == "") {e.bike = "other"}
        if (!(e.bike in counters)) {
            counters[e.bike] = {
                "count" : 0,
                "distance": 0,
            }
        }
        counters[e.bike]["count"] += 1
        counters[e.bike]["distance"] += e.distance
    })

    Object.entries(counters).forEach(([k, bike]) => {
        data.push({
            "count" : bike["count"],
            "distance" : Math.round(bike["distance"]),
            "name": k,
            "color": color_map[k]
        })
    })



    const width = 1000;
    const height = Math.min(500, width / 2);
    const outerRadius = height / 2 - 10;
    const innerRadius = outerRadius * 0.75;
    const tau = 2 * Math.PI;
    const color = d3.scaleOrdinal(d3.schemeObservable10);

    const svg = d3.create("svg")
        .attr("viewBox", [-width/2, -height/2, width, height])
        .attr("width", 1500);

    const arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

    const pie = d3.pie().sort(null).value((d) => d["count"]);

    // color legend
    const leg = svg.append("g")
      .selectAll()
      .data(data)
      .join("g")
        .attr("transform", (d, i, nodes) => `translate(-60,${(nodes.length / 2 - i - 1) * 20})`)
        .call(g => g.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", (d,i) => data[i]["color"]))
    
    leg.call(g => g.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text((d, i) => `${data[i]["name"]} (${data[i][curr_key]})`));
        
    const path = svg.datum(data).selectAll("path")
        .data(pie)
      .join("path")
        .attr("fill", (d, i) => data[i]["color"])
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial angles

    function change() {
        console.log("curr", this._curr_key)
        var value = "count"
        if (this._curr_key == "count") {
            value = "distance"
            this._curr_key = "distance"
        } else {
            value = "count"
            this._curr_key = "count"
        }
        curr_key = this._curr_key

        leg.select("text").data(data).text((d,i) =>`${data[i]["name"]} (${data[i][curr_key]})`)
        pie.value((d) => d[value]); // change the value function
        path.data(pie); // compute the new angles
        path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return (t) => arc(i(t));
    }

    // Return the svg node to be displayed.
    return Object.assign(svg.node(), {change});
}