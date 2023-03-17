// start everything off once the page has loaded
document.addEventListener("DOMContentLoaded", function() {

    //set my variables
    var storyDropdown = document.getElementById("stories-dropdown");
    var step2 = document.getElementById("step-2")
    var step3 = document.getElementById("step-3")
    var step4 = document.getElementById("step-4")

    // define the contents of step 2 for each story
    var inputs_nextdoor = ['San Francisco neighborhood',
        'Sentient being, plural',
        'Street name',
        'Action verb ending in -ing',
        'Physical activity',
        'Organization',
        'Amount of time you last waited at the DMV',
        'Name of politician',
        'Transitive verb, present tense',
        'Something made out of paper',
        'Transitive verb, present tense',
        'Small-ish noun',
        'Architectural element',
        'Place in San Francisco',
        'Movement verb, present tense',
        'Action verb, present tense',
        'Tool',
        'Favorite animal',
        'Movement verb, present tense',
        'Small noun, plural',
        'Sentient being, plural',
        'Adverb ending in -ly',
        'Type of person',
        'Unpleasant noun']

    var inputs_leaving = ['Mid-sized town',
        'Industry',
        'Carpentry term ending in -s',
        'Noun, plural',
        'Food',
        'Another food',
        'Means of transportation, plural',
        'Item at doctor’s office, plural',
        'Something found on a farm, plural',
        'Noun',
        'Camping implement',
        'Unpleasant object, plural',
        'Crime, past tense',
        'Group of people',
        'Organization',
        'Name of politician',
        'Verb ending in -ing',
        'Movement verb ending in -ing',
        'Adjective',
        'Price of last plane ticket you bought',
        'Town/city',
        'Another town/city']

    var inputs_outOfTown = ['Adjective',
        'Opposite adjective',
        'Bodily function ending in -ing',
        'Fruit',
        'Price of your shoes',
        'Exciting adjective',
        'Adverb ending in -ly',
        'German word',
        'Adverb ending in -er',
        'Periodic table element',
        'Important year',
        'Emotion',
        'Creative adjective',
        'Bodypart(s)',
        'Creepy adjective',
        'San Francisco neighborhood',
        'Substance',
        'Random adjective',
        'Another random adjective',
        'Name of East Bay City',
        'New York City Borough',
        'Name of dictator']

    var step3Contents = '<hr /> \
                        <h3 class="step"><strong>Step 3: Generate your story</strong></h3> \
                        <button class="magic-button" id="generate-button">Write our sensational article</button>'

    // when the user selects a story, update the contents of step 2
    storyDropdown.addEventListener('change', () => {
        var selectedStory = storyDropdown.value;
        if (selectedStory == "empty") {
            step2.innerHTML = "";
            step3.innerHTML = "";
        }
        else if (selectedStory == "nextdoor") {
            createInputBoxes(inputs_nextdoor);
        }
        else if (selectedStory == "leaving") {
            createInputBoxes(inputs_leaving);
        }
        else if (selectedStory == "outOfTown") {
            createInputBoxes(inputs_outOfTown);
        }

        if (selectedStory != "empty") {
            var textboxes = document.querySelectorAll('input[type="text"]');
            textboxes.forEach((textbox) => {
                textbox.addEventListener('keyup', checkTextboxes);
            });
        }
    });

    // add in the generate story button if all the textboxes are filled
    function checkTextboxes() {
        let allFilled = true;
        var textboxes = document.querySelectorAll('input[type="text"]');
        var selectedStory = storyDropdown.value;
    
        for (let i = 0; i < textboxes.length; i++) {
            if (textboxes[i].value === '') {
              allFilled = false;
              break;
            }
        }
    
        if (allFilled == true) {
            step3.innerHTML = step3Contents;
            generateStory(selectedStory);
        }

        if (allFilled == false) {
            step3.innerHTML = "";
            step4.innerHTML = "";
        }
    }

    // the meat of the stories
    function generateStory(selectedStory) {
        var generateButton = document.getElementById("generate-button");
        generateButton.addEventListener('click', () => {
            var textboxes = document.querySelectorAll('input[type="text"]');
            var inputs = [];
            for (var i = 0; i < textboxes.length; i++) {
              inputs.push(textboxes[i].value);
            }

            if (selectedStory == "nextdoor") {
                step4.innerHTML = `<hr /> \
                                    <h3><strong>R. Mendozer</strong></h3> \
                                    <h4>${toTitleCase(inputs[0])} | Mar 20</h4> \
                                    <p>Hi everyone! I’m posting here to draw everyone’s attention to the ${inputs[1]} looking into cars on ${toTitleCase(inputs[2])}.</p> \
                                    <p>I’ve noticed them while ${inputs[3]} on the way to ${inputs[4]} every week, and even called the ${inputs[5]}. They took ${inputs[6]} to show up and told me they can’t do anything because that ${inputs[7]} won’t let them do their jobs.</p> \
                                    <p>Last week, more of those ${inputs[1]} even knocked on our door and wanted us to ${inputs[8]} a ${inputs[9]} subscription. I mean, who would ${inputs[10]} those anymore?</p> \
                                    <p>I’ve also noticed a ${inputs[11]} in the ${inputs[12]} near ${toTitleCase(inputs[13])}. I’m concerned that small ${inputs[1]} could stumble across it and ${inputs[14]} into it before a parent or guardian could intercede. Any suggestions? Or should I try to ${inputs[15]} it myself with a ${inputs[16]}?</p> \
                                    <hr /> \
                                    <h3><strong>Patty O’Furniture</strong></h3> \
                                    <h4>${toTitleCase(inputs[0])} | Mar 20</h4> \
                                    <p>I saw it too! I saw them while I was taking my ${inputs[17]} out for his ${inputs[18]} on the way back from buying ${inputs[19]} at the farmer’s market. I have seen several ${inputs[20]} in the vicinity behaving ${inputs[21]} and I don’t think they live around here.</p> \
                                    <p>Can anyone share doorbell cam video? Maybe we can catch the ${inputs[22]} who is responsible for bringing all this ${inputs[23]} to our literal doorsteps!</p>` +
                                    '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                    '<button class="magic-button" id="restart-button">Start again?</button>';
                finishStepFour();
            }
            else if (selectedStory == "leaving") {
                step4.innerHTML = `<hr /> \
                                    <h3><strong>Why a botched order at Tartine was the final straw pushing one S.F. couple out of the city</strong></h3> \
                                    <p>Zoë Heidegger and Jorge Rabinowitz arrived in San Francisco from ${toTitleCase(inputs[0])} 18 months ago; she works in the ${inputs[1]} industry, he ${inputs[2]} small ${inputs[3]} for children.</p> \
                                    <p>They dreamed of eating ${inputs[4]} out of ${inputs[5]} bowls, wearing fleece vests and riding ${inputs[6]}. But it all went horribly wrong.</p> \
                                    <p>Instead, they were disgusted with streets littered with ${inputs[7]} and ${inputs[8]}; rampant ${inputs[9]}-use, and a ${inputs[10]} on every corner.</p> \
                                    <p>And then came the botched brunch order at Tartine. Instead of pain au jambon and a croque monsieur, they received ${inputs[11]}.</p> \
                                    <p>It was a devastating blow. And to make matters worse, they left it in the back seat of their car, where it was promptly ${inputs[12]} by ${inputs[13]}.</p> \
                                    <p>Rabinowitz called the ${inputs[14]}. They told him that they can’t do anything because that ${inputs[15]} won’t let them do their jobs.</p> \
                                    <p>Then his car was impounded by the Department of ${toTitleCase(inputs[16])}. And then the impound lot was designated a site of special cultural interest by the Historic Preservation Commission, and he was forbidden from ${inputs[17]} his car from a ${inputs[18]} architectural landmark. He was mandated to pay fines of $${stripDollarSigns(inputs[19])} a day.</p> \
                                    <p>And that was that. They talked about where they’ll go next. Maybe ${inputs[20]} or ${inputs[21]}. Somewhere where crime is against the law.</p> \
                                    <p>They won’t be back.</p>` +
                                    '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                    '<button class="magic-button" id="restart-button">Start again?</button>';
                finishStepFour();
            }

            else if (selectedStory == "outOfTown") {
                step4.innerHTML = `<hr /> \
                                    <h3><strong>Out-of-town publication discovers San Francisco</strong></h3> \
                                    <p>It’s a tale of two cities. It’s a city of very ${inputs[0]} people and very ${inputs[1]} people. A city of men ${inputs[2]} in their beards outside restaurants, selling ${inputs[3]} toast for $${stripDollarSigns(inputs[4])}. A city of ${inputs[5]} municipal buses ${inputs[6]} moving people and urine around town, and sleek black ${toTitleCase(inputs[7])} cars moving people and urine around town at a marginally ${inputs[8]} clip. \
                                    <p>The city where ${inputs[9]} miners flocked in ${inputs[10]} gave way to the Summer of ${toTitleCase(inputs[11])}, and hippies with ${inputs[12]} ${inputs[13]} gave way to ${inputs[14]} killers and glass high-rises and tech billionaires and Avocado Toast for $${stripDollarSigns(inputs[4])}.</p> \
                                    <p>Every city has a Tenderloin, and in San Francisco the Tenderloin is in ${toTitleCase(inputs[15])}. This is a realm of poverty and misery and ${inputs[16]}-use. It was 10 years ago, 20 years ago, 30 years ago, 40 years ago — but that’s not relevant to my story of today.</p> \
                                    <p>Then there’s the ${inputs[17]} and ${inputs[18]} Mission District. And there’s also … actually, all of San Francisco’s other neighborhoods, and the vast majority of its people, are irrelevant to any national story.</p> \
                                    <p>So, in the end, is San Francisco. ${inputs[19]} is the new ${inputs[20]}, says my ${toTitleCase(inputs[7])} driver, ${inputs[21]}, as we drive to the airport.</p>` +
                                    '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                    '<button class="magic-button" id="restart-button">Start again?</button>';
                finishStepFour();
            }
        });
    }

    ///
    /// THE FUNCTION PADDOCK
    ///

    // function for the clipboard button
    function copyToClipboard(copyButton) {
        copyButton.addEventListener("click", function() {
            var storyText = document.getElementById("step-4").innerText.slice(0, -30);
            navigator.clipboard.writeText(storyText);
        })
    };

    // function for the restart button
    function restartApp(copyButton) {
        copyButton.addEventListener("click", function() {
            storyDropdown.value = "empty";
            step2.innerHTML = "";
            step3.innerHTML = "";
            step4.innerHTML = "";
            document.getElementById("inner-container").scrollIntoView({behavior: 'auto'});
        })
    };

    // create input boxes after user selects a story
    function createInputBoxes(inputs) {
        step2.innerHTML = `<hr>
        <h3 class="step"><strong>Step 2: Fill in the blanks</strong></h3>
        <form>
            ${inputs.map(input => `
            <div class="form-group form-inline">
                <label for="${input}">${input}:</label>
                <input type="text" name="${input}" id="${input}" class="form-control">
            </div>
            `).join('')}
        </form>`;
        enterKeyTabs();

    }

    // function to add in all the stuff at the end of the story
    function finishStepFour() {
        step4.scrollIntoView({behavior: 'auto'});
        var copyButton = document.getElementById("copy-button");
        var restartButton = document.getElementById("restart-button");
        copyToClipboard(copyButton);
        restartApp(restartButton);
    }

    // function to capitalize the first letter of each word
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase();
        });
    }

    // function to flick between inputs with the enter key
    function enterKeyTabs() {
        var inputs = document.querySelectorAll('input[class="form-control"]');
        for (var i = 0; i < inputs.length; i++) {
            (function(i) {
                inputs[i].addEventListener('keydown', function(e) {
                    if (e.which == 13 && i < inputs.length - 1) {
                        inputs[i+1].focus();
                    }
                });
            })(i);
        }
    }

    // function to strip dollar signs from strings
    function stripDollarSigns(str) {
        return str.replace(/\$/g, '');
    }

  });