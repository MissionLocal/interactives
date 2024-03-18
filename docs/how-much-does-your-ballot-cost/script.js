document.addEventListener("DOMContentLoaded", function() {
    // set variables
    var ballotDropdown = document.getElementById("ballot-dropdown");
    var step2 = document.getElementById("step-2");
    var step3 = document.getElementById("step-3");
    var step4 = document.getElementById("step-4");
    var calculator = document.getElementById("calculatorBox");

    // Hide ballot content initially
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
    calculator.style.display = "none";

    // costs
    var costs = [{'contest_type':'prop','contest':'propA','value':'yes','cost': 5.85},
                {'contest_type':'prop','contest':'propA','value':'no','cost': 0},
                {'contest_type':'prop','contest':'propB','value':'yes','cost': 10.04},
                {'contest_type':'prop','contest':'propB','value':'no','cost': 8.53},
                {'contest_type':'prop','contest':'propC','value':'yes','cost': 3.26},
                {'contest_type':'prop','contest':'propC','value':'no','cost': 0.72},
                {'contest_type':'prop','contest':'propD','value':'yes','cost': 0},
                {'contest_type':'prop','contest':'propD','value':'no','cost': 0},
                {'contest_type':'prop','contest':'propE','value':'yes','cost': 18.73},
                {'contest_type':'prop','contest':'propE','value':'no','cost': 2.08},
                {'contest_type':'prop','contest':'propF','value':'yes','cost': 8.27},
                {'contest_type':'prop','contest':'propF','value':'no','cost': 0.41},
                {'contest_type':'prop','contest':'propG','value':'yes','cost': 0.96},
                {'contest_type':'prop','contest':'propG','value':'no','cost': 0},
                {'contest_type':'judge','contest':'judge1','value':'MichaelBegert','cost': 3.34},
                {'contest_type':'judge','contest':'judge1','value':'AlbertZecher','cost': 8.73},
                {'contest_type':'judge','contest':'judge13','value':'PatrickThompson','cost': 2.45},
                {'contest_type':'judge','contest':'judge13','value':'JeanRoland','cost': 4.28},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'PeterGallotta','cost': 0.78},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'KristinHardy','cost': 2.16},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'EmmaHeiken','cost': 1.63},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'LilyHo','cost': 2.07},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'JohnAvalos','cost': 0.5},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'CedricGAkbar','cost': 1.29},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'NancyTung','cost': 2.44},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'FrankTizedes','cost': 0.11},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'MichaelLai','cost': 6.89},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'JeremyLee','cost': 0.56},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'LauranceLemLee','cost': 0},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'PeterHoLikLee','cost': 0},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'TrevorChandler','cost': 1.71},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'VickChung','cost': 0.56},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'ChristopherChristensen','cost': 0},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'CarrieBarnes','cost': 4.61},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'PatrickBell','cost': 2.49},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'GloriaBerry','cost': 0.56},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'AdolfoVelasquez','cost': 0.73},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'MichaelNguyen','cost': 0.68},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'LynWerbach','cost': 1.65},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'JoeSangirardi','cost': 1.54},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'SydneySimpson','cost': 0.88},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'JoshuaRudyOchoa','cost': 0.62},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'LuisAZamora','cost': 1.22},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'MattDorsey','cost': 3.13},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'SalRosselli','cost': 3.64},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'JaneKim','cost': 1.24},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'BilalMahmood','cost': 7.99},
                {'contest_type':'DCCC','contest':'DCCCAD17','value':'AnitaMartinez','cost': 0.62},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'ParagGupta','cost': 2.23},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'NatalieGee','cost': 1.39},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'GregHardeman','cost': 3.45},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'FrancesHsieh','cost': 1.08},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'MichelaAliotoPier','cost': 4.35},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'JadeTu','cost': 1.88},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'LeahLacroix','cost': 0.7},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'SandraLeeFewer','cost': 0},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'ConnieChan','cost': 2.62},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'MikeChen','cost': 2.41},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'QueenaChen','cost': 1.02},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'DanCalamuci','cost': 2.75},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'LanierColes','cost': 4.26},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'SaraBarz','cost': 2.52},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'JenNossokoff','cost': 0.26},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'CatherineStefani','cost': 3.37},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'MarjanPhilhour','cost': 10.08},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'ManoRaju','cost': 1.15},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'HeneKelly','cost': 0.92},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'GordonMar','cost': 0.89},
                {'contest_type':'DCCC','contest':'DCCCAD19','value':'BrianQuan','cost': 2.49},]
    var selectedCosts = [];
    var totalCost = 0;
    var selectedDCCC = 0;

    function handleCheckboxClick(target) {
        // Handle checkbox clicks for both checkboxes and radio buttons
        if (target.matches('input[type="checkbox"], input[type="radio"]')) {
            // match the contest and value to the costs
            var contest = target.name;
            var value = target.value;
            var contestType = target.className;

            if (contestType == 'prop' || contestType == 'judge') {
                // if contest is already in selectedCosts, remove it
                selectedCosts = selectedCosts.filter(function(c) {
                    return c.contest != contest;
                });

                // find the selected contest and value
                var cost = costs.find(function(c) {
                    return c.contest == contest && c.value == value;
                });

                // add the cost to the selectedCosts
                selectedCosts.push(cost);

                // calculate the total cost
                totalCost = 0;
                selectedCosts.forEach(function(c) {
                    totalCost += c.cost;
                });
            }

            if (contest == 'DCCCAD17') {
                // if value and contest is already in selectedCosts, remove it
                if (target.checked) {
                    var cost = costs.find(function(c) {
                        return c.contest == contest && c.value == value;
                    });

                    // Check if the selectedDCCC is less than the limit
                    if (contest == 'DCCCAD17' && selectedDCCC < 14) {
                        selectedCosts.push(cost);
                        selectedDCCC += 1;
                    } else {
                        // If the limit is reached, uncheck the checkbox
                        target.checked = false;
                    }

                    // Calculate the total cost
                    totalCost = 0;
                    selectedCosts.forEach(function(c) {
                        totalCost += c.cost;
                    });
                } else {
                    selectedCosts = selectedCosts.filter(function(c) {
                        return c.contest != contest || c.value != value;
                    });

                    // Update the selectedDCCC count
                    selectedDCCC = 0;
                    selectedCosts.forEach(function(c) {
                        if (c.contest == contest) {
                            selectedDCCC += 1;
                        }
                    });

                    // Calculate the total cost
                    totalCost = 0;
                    selectedCosts.forEach(function(c) {
                        totalCost += c.cost;
                    });
                }
            }

            if (contest == 'DCCCAD19') {
                // if value and contest is already in selectedCosts, remove it
                if (target.checked) {
                    var cost = costs.find(function(c) {
                        return c.contest == contest && c.value == value;
                    });

                    // Check if the selectedDCCC is less than the limit
                    if (contest == 'DCCCAD19' && selectedDCCC < 10) {
                        selectedCosts.push(cost);
                        selectedDCCC += 1;
                    } else {
                        // If the limit is reached, uncheck the checkbox
                        target.checked = false;
                    }

                    // Calculate the total cost
                    totalCost = 0;
                    selectedCosts.forEach(function(c) {
                        totalCost += c.cost;
                    });
                } else {
                    selectedCosts = selectedCosts.filter(function(c) {
                        return c.contest != contest || c.value != value;
                    });

                    // Update the selectedDCCC count
                    selectedDCCC = 0;
                    selectedCosts.forEach(function(c) {
                        if (c.contest == contest) {
                            selectedDCCC += 1;
                        }
                    });

                    // Calculate the total cost
                    totalCost = 0;
                    selectedCosts.forEach(function(c) {
                        totalCost += c.cost;
                    });
                }
            }

            // Update the total cost with commas and rounded to 2 decimal places
            document.getElementById('totalCostVote-display').innerHTML = "Total: <b>$" + numberWithCommas(totalCost.toFixed(2)) + "</b>";



        }
    }

    function limitSelection() {
        var selectedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        var selectedDistrict = ballotDropdown.value;
        if (selectedDistrict === "ad17" && selectedCount > 14) {
            this.checked = false;
        } else if (selectedDistrict === "ad19" && selectedCount > 10) {
            this.checked = false;
        }
    }

    // function to return numbers with commas
    function numberWithCommas(x) {
        if (isFinite(x)) {
            x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return x;
        }
        else {
            return '0'
        }
    }

    // Function to handle radio button selection
    function handleRadioButtonClick(target) {
        if (target.matches('input[type="radio"]')) {
            var selectedSlate = target.value;
            var checkboxesToCheck;

            // Reset all checkboxes first
            var allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(function(checkbox) {
                checkbox.checked = false;
                handleCheckboxClick(checkbox); // Handle the selection logic
            });

            if (selectedSlate === "slateChange") {
                checkboxesToCheck = document.querySelectorAll('.DCCC.Change');
            } else if (selectedSlate === "slateLabor") {
                checkboxesToCheck = document.querySelectorAll('.DCCC.Labor');
            }

            checkboxesToCheck.forEach(function(checkbox) {
                checkbox.checked = true;
                handleCheckboxClick(checkbox); // Handle the selection logic
            });
        }
    }

    // Function to handle radio button selection for Step 4
    function handleRadioButtonClickStep4(target) {
        if (target.matches('input[type="radio"].slate2')) {
            var selectedSlate = target.value;
            var checkboxesToCheck;
            var checkboxesToUncheck;

            // Reset all checkboxes first
            var allCheckboxes = document.querySelectorAll('#step-4 input[type="checkbox"]');
            allCheckboxes.forEach(function(checkbox) {
                checkbox.checked = false;
                handleCheckboxClick(checkbox); // Handle the selection logic
            });

            if (selectedSlate === "slateChange2") {
                checkboxesToCheck = document.querySelectorAll('#step-4 .DCCC.Change');
            } else if (selectedSlate === "slateLabor2") {
                checkboxesToCheck = document.querySelectorAll('#step-4 .DCCC.Labor');
            }

            checkboxesToCheck.forEach(function(checkbox) {
                checkbox.checked = true;
                handleCheckboxClick(checkbox); // Handle the selection logic
            });
        }
    }


    // Attach event listeners to all buttons
    var checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
    checkboxButtons.forEach(function (checkboxButtons) {
        checkboxButtons.addEventListener('click', limitSelection);
    });

    // Handle checkbox clicks using event delegation
    document.addEventListener('click', function(event) {
        handleCheckboxClick(event.target);
    });

    // Attach event listeners to radio buttons
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', function(event) {
            var previouslySelectedSlate = document.querySelector('input[type="radio"]:checked');
            if (previouslySelectedSlate) {
                // Unselect the checkboxes of the previously selected slate
                var checkboxesToUncheck;
                if (previouslySelectedSlate.value === "slateChange") {
                    checkboxesToUncheck = document.querySelectorAll('.DCCC.Change');
                } else if (previouslySelectedSlate.value === "slateLabor") {
                    checkboxesToUncheck = document.querySelectorAll('.DCCC.Labor');
                }
                checkboxesToUncheck.forEach(function(checkbox) {
                    checkbox.checked = false;
                    handleCheckboxClick(checkbox); // Handle the selection logic
                });
            }

            // Handle the selection of checkboxes for the newly selected slate
            handleRadioButtonClick(event.target);
        });
    });

    // Attach event listeners to radio buttons for Step 4
    var radioButtonsStep4 = document.querySelectorAll('#step-4 input[type="radio"].slate2');
    radioButtonsStep4.forEach(function(radioButton) {
        radioButton.addEventListener('click', function(event) {
            handleRadioButtonClickStep4(event.target);
        });
    });


    // Dropdown steps
    ballotDropdown.addEventListener('change', () => {
        var selectedDistrict = ballotDropdown.value;
    
        // Reset selected choice arrays and total cost
        selectedCosts = [];
        totalCost = 0;
        selectedDCCC = 0;

        // Update the total cost with commas and rounded to 2 decimal places
        document.getElementById('totalCostVote-display').innerHTML = "Total: <b>$" + numberWithCommas(totalCost.toFixed(2)) + "</b>";


        // Reset radio button selections
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function(radioButton) {
            radioButton.checked = false;
        });

        // Reset checkbox selections
        var checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
        checkboxButtons.forEach(function(checkboxButton) {
            checkboxButton.checked = false;
        });
        
        if (selectedDistrict == "empty") {
            calculator.style.display = "none";
            step2.style.display = "none";
            step3.style.display = "none"; 
            step4.style.display = "none";
        } else if (selectedDistrict == "ad17") {
            calculator.style.display = "block";
            step2.style.display = "block";
            step3.style.display = "block";
            step4.style.display = "none";
        } else if (selectedDistrict == "ad19"){
            calculator.style.display = "block";
            step2.style.display = "block";
            step3.style.display = "none";
            step4.style.display = "block";
        }
    });
});
