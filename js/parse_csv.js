function parseCSV(file) {

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                const rows = results.data;
            
                if (rows.length <= 1) {
                    messageDiv.innerHTML = `<p style="color:red;">CSV is empty or missing data rows.</p>`;
                    return;
                }
            
                // first 5 data rows
                const parser = d3.timeParse("%s");
                const first5 = rows.slice(2,1000);
            
                let data = first5.map((row) => {
                    const date = new Date(row[1]); // original string format
                    // const unixMs = date.getTime(); // convert to unix time (ms)
                
                    return {
                        time: date,                   
                        distance: parseFloat(row[6]),
                        name: row[2],
                        activity_type: row[3],
                        commute: row[9],
                        max_speed: parseFloat(row[18]),
                        average_speed: Math.round(parseFloat(row[19]) * 18/5 * 100) / 100,
                        elevation_gain: parseFloat(row[20]),
                        elevation_loss: parseFloat(row[21]),
                        elapsed_time: row[5],
                        moving_time: row[16],
                        bike: row[11]
                    };
                }).filter((e) => e.time > new Date(2025, 0, 1))
                  .filter((e) => e.activity_type == "Ride");
            
                data.forEach(e => console.log("bike", e.bike))
            
                document.getElementById('message').innerHTML =
                    `<p style="color:green;">Parsed!</p>`;
            
                return resolve(data)
            }
        });
    });
}