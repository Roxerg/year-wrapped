function analyzeYear(year, dateList) {
    // Normalize input list into YYYY-MM-DD
    const normalizedDates = new Set(
      dateList.map(dateStr => {
        const d = new Date(dateStr);
        return d.toISOString().split("T")[0];
      })
    );
  
    const matches = [];
  
    let current = new Date(year, 0, 1);
  
    while (current.getFullYear() === year) {
      const normalized = current.toISOString().split("T")[0];
      const weekday = current.toLocaleDateString("en-US", {
        weekday: "long"
      });
  
      const entry = {
        date: normalized,
        weekday
      };
  
      if (normalizedDates.has(normalized)) {
        entry.active = true;
      } else {
        entry.active = false;
      }

      matches.push(entry);
  
      current.setDate(current.getDate() + 1);
    }
  
    return matches;
  }
  
  
tha_list = [
  "Oct 30, 2022, 7:46:37 AM",
  "May 17, 2024, 5:34:58 PM",
  "May 17, 2024, 8:06:02 PM",
  "May 16, 2024, 5:07:54 PM",
  "Jun 7, 2024, 7:42:43 AM",
  "Jun 8, 2024, 7:39:08 AM",
  "Jun 12, 2024, 5:43:40 PM",
  "Jun 26, 2024, 6:09:34 PM",
  "Jun 28, 2024, 6:53:15 PM",
  "Jun 15, 2024, 8:38:41 PM",
  "Jul 5, 2024, 8:15:29 PM",
  "Jul 10, 2024, 8:23:57 PM",
  "Jul 11, 2024, 6:40:42 PM",
  "Jul 11, 2024, 7:10:19 PM",
  "Jul 12, 2024, 4:44:01 PM",
  "Jul 13, 2024, 10:10:32 AM",
  "Jul 19, 2024, 4:33:31 PM",
  "Jul 19, 2024, 5:26:14 PM",
  "Jul 20, 2024, 8:55:14 AM",
  "Jul 24, 2024, 5:20:30 PM",
  "Jul 24, 2024, 7:50:30 PM",
  "Jul 26, 2024, 3:55:26 PM",
  "Jul 27, 2024, 1:15:52 PM",
  "Jul 27, 2024, 8:12:56 PM",
  "Jul 29, 2024, 5:10:09 PM",
  "Jul 30, 2024, 4:12:57 PM",
  "Jul 30, 2024, 7:41:18 PM",
  "Jul 31, 2024, 4:58:52 PM",
  "Aug 1, 2024, 9:37:51 PM",
  "Aug 2, 2024, 8:05:53 AM",
  "Aug 2, 2024, 9:41:26 AM",
  "Aug 3, 2024, 8:20:00 AM",
  "Aug 3, 2024, 10:53:16 AM",
  "Aug 5, 2024, 5:08:14 PM",
  "Aug 5, 2024, 10:48:41 PM",
  "Aug 6, 2024, 5:54:15 PM",
  "Aug 13, 2024, 5:08:25 PM",
  "Aug 15, 2024, 1:37:39 PM",
  "Sep 14, 2024, 10:17:32 AM",
  "Sep 14, 2024, 7:32:22 PM",
  "Sep 15, 2024, 1:24:21 PM",
  "Sep 18, 2024, 5:40:30 PM",
  "Sep 19, 2024, 8:05:00 AM",
  "Sep 22, 2024, 2:44:18 PM",
  "Oct 26, 2024, 3:58:05 PM",
  "Nov 10, 2024, 10:57:51 AM",
  "Nov 10, 2024, 9:29:50 PM",
  "Nov 11, 2024, 6:51:31 PM",
  "Nov 14, 2024, 8:57:21 AM",
  "Nov 15, 2024, 9:28:26 AM",
  "Dec 28, 2024, 2:21:55 PM",
  "Jan 2, 2025, 11:03:03 AM",
  "Jan 2, 2025, 12:10:43 PM",
  "Jan 2, 2025, 2:56:26 PM",
  "Jan 18, 2025, 9:59:27 AM",
  "Jan 18, 2025, 2:31:50 PM",
  "Jan 18, 2025, 4:08:02 PM",
  "Jan 19, 2025, 5:09:55 PM",
  "Jan 22, 2025, 5:54:00 PM",
  "Jan 25, 2025, 2:12:51 PM",
  "Feb 1, 2025, 8:24:33 AM",
  "Feb 3, 2025, 8:53:16 AM",
  "Feb 3, 2025, 4:50:31 PM",
  "Feb 4, 2025, 6:57:38 PM",
  "Feb 4, 2025, 8:46:11 PM",
  "Feb 10, 2025, 7:43:49 PM",
  "Feb 10, 2025, 9:49:55 PM",
  "Feb 22, 2025, 1:38:46 PM",
  "Feb 22, 2025, 4:52:17 PM",
  "Feb 24, 2025, 1:26:37 PM",
  "Mar 8, 2025, 9:54:27 AM",
  "Mar 9, 2025, 12:39:27 PM",
  "Mar 11, 2025, 8:08:49 AM",
  "Mar 11, 2025, 8:11:52 AM",
  "Mar 11, 2025, 1:08:05 PM",
  "Mar 14, 2025, 9:07:01 PM",
  "Mar 15, 2025, 9:52:12 AM",
  "Mar 16, 2025, 2:30:36 PM",
  "Mar 16, 2025, 3:46:40 PM",
  "Mar 16, 2025, 6:51:03 PM",
  "Mar 16, 2025, 11:48:04 PM",
  "Mar 19, 2025, 9:19:59 AM",
  "Mar 20, 2025, 9:07:49 AM",
  "Mar 21, 2025, 10:07:26 PM",
  "Mar 22, 2025, 1:45:53 PM",
  "Mar 25, 2025, 4:07:27 PM",
  "Mar 28, 2025, 12:41:05 PM",
  "Mar 30, 2025, 1:02:19 PM",
  "Mar 30, 2025, 3:05:10 PM",
  "Dec 28, 2024, 3:20:42 PM",
  "Jan 18, 2025, 9:51:42 AM",
  "Apr 4, 2025, 9:08:12 AM",
  "Apr 5, 2025, 7:26:48 AM",
  "Apr 5, 2025, 11:12:15 AM",
  "Apr 6, 2025, 7:36:22 AM",
  "Apr 12, 2025, 4:17:10 PM",
  "Apr 17, 2025, 5:50:27 PM",
  "Apr 20, 2025, 4:29:33 PM",
  "Apr 24, 2025, 11:17:05 AM",
  "Apr 24, 2025, 4:22:27 PM",
  "Apr 24, 2025, 6:03:15 PM",
  "Apr 25, 2025, 6:12:40 AM",
  "Apr 26, 2025, 12:55:27 PM",
  "Apr 27, 2025, 6:26:28 AM",
  "May 1, 2025, 12:57:11 PM",
  "May 3, 2025, 7:12:10 AM",
  "May 3, 2025, 1:45:37 PM",
  "May 6, 2025, 6:04:26 PM",
  "May 6, 2025, 7:05:57 PM",
  "May 7, 2025, 12:21:40 PM",
  "Jul 8, 2023, 5:17:54 AM",
  "May 8, 2025, 5:58:09 PM",
  "May 9, 2025, 11:17:18 PM",
  "May 11, 2025, 8:33:24 PM",
  "May 14, 2025, 9:35:29 AM",
  "May 14, 2025, 6:10:14 PM",
  "May 20, 2025, 7:38:17 AM",
  "May 20, 2025, 2:01:56 PM",
  "May 27, 2025, 7:53:48 PM",
  "Jun 1, 2025, 5:58:51 AM",
  "Jun 6, 2025, 7:08:07 AM",
  "Jun 9, 2025, 6:37:49 PM",
  "Jun 11, 2025, 10:42:06 AM",
  "Jun 11, 2025, 11:08:10 PM",
  "Jun 15, 2025, 7:41:23 PM",
  "Jun 18, 2025, 5:15:47 PM",
  "Jun 18, 2025, 6:09:03 PM",
  "Jun 21, 2025, 4:28:09 PM",
  "Jun 22, 2025, 2:43:04 AM",
  "Jun 26, 2025, 6:42:48 PM",
  "Jun 28, 2025, 12:57:12 PM",
  "Jun 29, 2025, 1:44:48 PM",
  "Jun 29, 2025, 11:10:34 AM",
  "Jun 29, 2025, 2:09:23 PM",
  "Jul 4, 2025, 5:47:55 PM",
  "Sep 2, 2023, 10:31:24 AM",
  "Jul 8, 2025, 6:13:06 PM",
  "Jul 8, 2025, 10:23:12 PM",
  "Jul 12, 2025, 6:51:31 PM",
  "Jul 13, 2025, 2:21:05 PM",
  "Jul 22, 2025, 7:36:35 AM",
  "Jul 24, 2025, 7:22:09 AM",
  "Jul 26, 2025, 10:47:24 AM",
  "Jul 26, 2025, 1:20:57 PM",
  "Jul 26, 2025, 4:47:07 PM",
  "Jul 27, 2025, 7:45:33 PM",
  "Jul 28, 2025, 8:12:22 AM",
  "Jul 28, 2025, 6:36:49 PM",
  "Jul 28, 2025, 10:10:22 PM",
  "Jul 31, 2025, 8:02:30 AM",
  "Aug 1, 2025, 6:56:52 PM",
  "Aug 3, 2025, 9:35:22 AM",
  "Aug 3, 2025, 7:14:21 PM",
  "Aug 9, 2025, 3:33:03 PM",
  "Aug 16, 2025, 6:50:33 PM",
  "Aug 17, 2025, 7:08:27 AM",
  "Aug 18, 2025, 5:46:16 PM",
  "Aug 18, 2025, 10:32:03 PM",
  "Aug 20, 2025, 8:08:28 AM",
  "Aug 21, 2025, 8:57:35 AM",
  "Aug 21, 2025, 4:44:22 PM",
  "Aug 22, 2025, 4:02:39 PM",
  "Aug 22, 2025, 5:48:25 PM",
  "Aug 22, 2025, 7:30:11 PM",
  "Aug 27, 2025, 8:20:33 AM",
  "Aug 27, 2025, 6:14:18 PM",
  "Aug 29, 2025, 7:09:15 PM",
  "Aug 30, 2025, 12:42:15 PM",
  "Aug 31, 2025, 3:01:10 PM",
  "Aug 31, 2025, 9:37:54 PM",
  "Sep 6, 2025, 12:08:47 PM",
  "Sep 12, 2025, 5:06:20 PM",
  "Oct 2, 2025, 8:09:17 AM",
  "Oct 24, 2025, 6:16:50 PM",
  "Nov 16, 2025, 8:53:46 AM",
];

const year_data = analyzeYear(2025, tha_list);


function drawGridPlot() {

    const grid = document.getElementById("gridplot");
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.opacity = 0;
    grid.appendChild(tooltip);

    containers = {}
    rows = {}

    // Build grid
    for (let r = 0; r < weekdays.length; r++) {
        const container = document.createElement("div");
        container.className = "row-container";

        const label = document.createElement("div");
        label.className = "label";
        label.textContent = weekdays[r][0];
        container.appendChild(label);

        const row = document.createElement("div");
        row.className = "row";
        rows[weekdays[r]] = row;
        containers[weekdays[r]] = container;
    }


    // Fill start of grid with filler until first weekday hit
    for (let i=0; i<weekdays.length; i++) {
        if (year_data[0].weekday == weekdays[i]) {
          break;
        }
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.classList.add("filler");
        rows[weekdays[i]].appendChild(cell)
    }

    // Fill grid with data
    for (let r = 0; r < weekdays.length; r++) {

        container = containers[weekdays[r]]
        row = rows[weekdays[r]]

        const weekday_elems = year_data.filter((e) => e.weekday === weekdays[r]);
        
        weekday_elems.forEach((item) => {
            const cell = document.createElement("div");
            cell.className = "cell";
        
            cell.addEventListener("mouseenter", (evt) => {
                tooltip.textContent = item.date;
                tooltip.style.left = (evt.pageX + 20) + "px";
                tooltip.style.top = (evt.pageY - 28) + "px";
                tooltip.style.opacity = 0.9;
            });
            cell.addEventListener("mousemove", (evt) => {
                tooltip.style.left = (evt.pageX + 20) + "px";
                tooltip.style.top = (evt.pageY - 28) + "px";
            });
            cell.addEventListener("mouseleave", () => {
                tooltip.style.opacity = 0;
            });

            cell.addEventListener("touchstart", (evt) => {
                evt.preventDefault();
                const t = evt.touches[0];
                tooltip.textContent = item.date;
                tooltip.style.left = (t.clientX + 20) + "px";
                tooltip.style.top = (t.clientY - 28) + "px";
                tooltip.style.opacity = 0.9;
            });
            cell.addEventListener("touchmove", (evt) => {
                evt.preventDefault();
                const t = evt.touches[0];
                tooltip.style.left = (t.clientX + 20) + "px";
                tooltip.style.top = (t.clientY - 28) + "px";
            });
            cell.addEventListener("touchend", (evt) => {
                evt.preventDefault();
                tooltip.style.opacity = 0;
            });

            if (item.active) {
                cell.classList.add("active");
            }

            row.appendChild(cell);
        });

        container.appendChild(row);
        grid.appendChild(container);
    }

    const scaleLabels = () => {
        const w = grid.clientWidth;
        const labelSize = Math.max(8, Math.min(16, w * 0.011));
        grid.querySelectorAll(".label").forEach((l) => l.style.fontSize = labelSize + "px");
        grid.style.setProperty("--row-gap", Math.max(2, Math.min(6, w * 0.004)) + "px");
    };
    scaleLabels();

    if (!grid._scaleBound) {
        grid._scaleBound = true;
        window.addEventListener("resize", scaleLabels);
    }

    // Toggle between cell and bar view
    grid.addEventListener("click", () => {
        grid.classList.toggle("bars");
});

}