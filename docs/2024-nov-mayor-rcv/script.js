$(document).ready(function () {
    // Load data from CSV file using PapaParse
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function (results) {
            var tableBody = $('#electionResults tbody');
            var minVotes = {}; // Object to hold minimum votes for each round
            var maxFinalRound = -Infinity; // Variable to hold the maximum for the final round
            var voteColumns = []; // To hold columns named "Round X Votes"

            // Dynamically identify all "Round X Votes" columns in the data
            Object.keys(results.data[0]).forEach(col => {
                if (/^Round \d+ Votes$/.test(col)) {
                    voteColumns.push(col);
                }
            });

            // Reverse the order of columns
            voteColumns.reverse();

            // Identify the final round column
            var finalRound = voteColumns[0];

            // First pass to collect vote values and determine minimum and maximum for each round
            results.data.forEach(function (row) {
                if (row["Candidate"] === "Continuing Ballots Total") {
                    return; // Skip this iteration
                }

                // Loop through each dynamically identified voting column
                voteColumns.forEach(round => {
                    const voteValue = parseFloat(row[round]);
                    if (!isNaN(voteValue) && voteValue !== 0) {
                        // Set minimum for each round
                        if (!minVotes[round] || voteValue < minVotes[round]) {
                            minVotes[round] = voteValue;
                        }
                        // Update maximum for the final round only
                        if (round === finalRound && voteValue > maxFinalRound) {
                            maxFinalRound = voteValue;
                        }
                    }
                });
            });

            // Second pass to build the table with colors
            results.data.forEach(function (row) {
                if (row["Candidate"] === "Continuing Ballots Total") {
                    return; // Skip this iteration
                }

                var html = '<tr>';
                html += `<td>${row["Candidate"] || "N/A"}</td>`; // Default to "N/A" if missing

                // Iterate through the dynamically identified columns in reverse order
                voteColumns.forEach(round => {
                    var voteValue = row[round] || "N/A";
                    var percentageValue = row[round.replace("Votes", "Percentage")] || "N/A";
                    
                    // Check for zero votes and zero percentage
                    var isZero = (voteValue === "0" || voteValue === "0.00") && (percentageValue === "0.00%" || percentageValue === "0%");
                    var cellContent = isZero 
                        ? `<span class="zero-vote">X</span>` 
                        : `<span class="percentage">${percentageValue}</span><br><span class="votes">${voteValue}</span>`;
                    
                    // Determine background color
                    var bgColor = 'transparent';
                    if (parseFloat(row[round]) === minVotes[round]) {
                        bgColor = 'rgba(243, 110, 87, 0.4)'; // Red for minimum in each round
                    } 
                    if (round === finalRound && parseFloat(row[round]) === maxFinalRound) {
                        bgColor = 'rgba(138, 214, 206, 0.4)'; // Green for maximum in the final round
                    }

                    // Add cell HTML with styles
                    html += `<td style="background-color: ${bgColor}; text-align: center;">${cellContent}</td>`;
                });

                html += '</tr>';
                tableBody.append(html);
            });

            // Initialize DataTables
            $('#electionResults').DataTable({
                "paging": false,
                "searching": false,
                "info": false,
                "ordering": false
            });

            // Initialize Pym.js
            var pymChild = new pym.Child();

            // Resize Pym.js on window resize
            $(window).on('resize', function() {
                pymChild.sendHeight();
            });

            // Send the initial height to Pym.js
            pymChild.sendHeight();
        }
    });
});

