// start everything off once the page has loaded
document.addEventListener("DOMContentLoaded", function() {

    //set my variables
    var pymChild = new pym.Child();
    var storyDropdown = document.getElementById("stories-dropdown");
    var step2 = document.getElementById("step-2")
    var step3 = document.getElementById("step-3")
    var step4 = document.getElementById("step-4")

    // define the contents of step 2 for each story
    var inputs_nextdoor = ['S.F. neighborhood (include "the" if necessary)',
        'Group of people',
        'Street name',
        'Verb ending in -ing',
        'Physical activity',
        'Organization',
        'Amount of time you last waited at the DMV',
        'Name of politician',
        'Small-ish noun',
        'Architectural element',
        'Place in San Francisco',
        'Movement verb, present tense',
        'Noun, plural',
        'Verb, present tense',
        'Tool',
        'Favorite animal',
        'Movement verb, present tense',
        'Small noun, plural',
        'Bigger noun, plural',
        'Adverb ending in -ly',
        'Rude description of person',
        'Noun, something unpleasant']

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
        'Town/city',
        'Another town/city']

    var inputs_outOfTown = ['Adjective',
    'Opposite of the preceding adjective',
    'Bodily function ending in -ing',
    'Fruit',
    'Price of your shoes',
    'Adjective',
    'Adverb ending in -ly',
    'German word',
    'Periodic table element',
    'Important year',
    'Emotion',
    'Adjective',
    'Bodypart, plural',
    'Creepy adjective',
    'Animal, plural',
    'S.F. neighborhood (include "the" if necessary)',
    'Substance',
    'Random adjective',
    'Another random adjective',
    'Name of East Bay City',
    'New York City Borough',
    'First name of dictator']

    var step3Contents = '<hr /> \
                        <h3 class="step"><strong>Step 3: Generate your story</strong></h3> \
                        <button class="magic-button" id="generate-button">Write our sensational article</button> \
                        <div id="validation-message"></div>'

    // when the user selects a story, update the contents of step 2
    storyDropdown.addEventListener('change', () => {
        var selectedStory = storyDropdown.value;
        if (selectedStory == "empty") {
            step2.innerHTML = "";
            step3.innerHTML = "";
            step4.innerHTML = "";
        }
        else {
            if (selectedStory == "nextdoor") {
                createInputBoxes(inputs_nextdoor);
            }
            if (selectedStory == "leaving") {
                createInputBoxes(inputs_leaving);
            }
            if (selectedStory == "outOfTown") {
                createInputBoxes(inputs_outOfTown);
            }
            step3.innerHTML = step3Contents;
            generateButton(selectedStory);
        }
        delay(500).then(() => pymChild.sendHeight());
    });

    ///
    /// THE FUNCTION PADDOCK
    ///

    // function to deal with button click
    function generateButton(selectedStory) {
        var generateButton = document.getElementById("generate-button");
        generateButton.addEventListener('click', () => {
            let allFilled = true;
            var textboxes = document.querySelectorAll('input[type="text"]');

            for (let i = 0; i < textboxes.length; i++) {
                if (textboxes[i].value === '') {
                  allFilled = false;
                  break;
                }
            }

            if (allFilled == true) {
                generateStory(selectedStory, textboxes);
            }

            if (allFilled == false) {
                document.getElementById("validation-message").innerHTML = '<p><em>Please fill in all the blanks before generating the story.</em></p>';
            }
        });
        delay(500).then(() => pymChild.sendHeight());
    }

    // function to generate the story
    function generateStory(selectedStory, textboxes) {
        document.getElementById("validation-message").innerHTML = "";
        var inputs = [];
        for (var i = 0; i < textboxes.length; i++) {
            inputs.push(textboxes[i].value);
        }

        if (selectedStory == "nextdoor") {
            text = `<hr /> \
                                <h3><strong>R. Mendozer</strong></h3> \
                                <h4>${toTitleCase(inputs[0])} | Mar 20</h4> \
                                <p>Hi everyone! I’m posting here to draw everyone’s attention to the ${inputs[1].toLowerCase()} looking into cars on ${toTitleCase(inputs[2])}.</p> \
                                <p>I’ve noticed them while ${inputs[3].toLowerCase()} on the way to ${inputs[4].toLowerCase()} every week, and even called the ${inputs[5]}. They took ${inputs[6].toLowerCase()} to show up and told me they can’t do anything because that ${toTitleCase(inputs[7])} won’t let them do their jobs.</p> \
                                <p>I’ve also noticed a ${inputs[8].toLowerCase()} in the ${inputs[9].toLowerCase()} near ${toTitleCase(inputs[10])}. I’m concerned that small ${inputs[11].toLowerCase()} could stumble across it and ${inputs[12].toLowerCase()} into it before a parent or guardian could intercede. Any suggestions? Or should I try to ${inputs[13].toLowerCase()} it myself with a ${inputs[14].toLowerCase()}?</p> \
                                <hr /> \
                                <h3><strong>Patty O’Furniture</strong></h3> \
                                <h4>${toTitleCase(inputs[0])} | Mar 20</h4> \
                                <p>I saw it too! I saw them while I was taking my ${inputs[15].toLowerCase()} out for his ${inputs[16].toLowerCase()} on the way back from buying ${inputs[17].toLowerCase()} at the farmer’s market. I have seen several ${inputs[18].toLowerCase()} in the vicinity behaving ${inputs[19].toLowerCase()} and I don’t think they live around here.</p> \
                                <p>Can anyone share doorbell cam video? Maybe we can catch the ${inputs[20].toLowerCase()} who is responsible for bringing all this ${inputs[21].toLowerCase()} to our literal doorsteps!</p>` +
                                '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                '<button class="magic-button" id="restart-button">Start again?</button>';
            if (i < text.length) {
                step4.innerHTML += text.charAt(i);
                i++;
                setTimeout(100); // Adjust typing speed by changing the delay here
            }
            //finishStepFour();
        }
        else if (selectedStory == "leaving") {
            step4.innerHTML = `<hr /> \
                                <h3><strong>Why a botched order at Tartine was the final straw pushing one S.F. couple out of the city</strong></h3> \
                                <p>Zoë Heidegger and Jorge Rabinowitz arrived in San Francisco from ${toTitleCase(inputs[0])} 18 months ago; she works in the ${inputs[1].toLowerCase()} industry, he ${inputs[2].toLowerCase()} small ${inputs[3].toLowerCase()} for children.</p> \
                                <p>They dreamed of eating ${inputs[4].toLowerCase()} out of ${inputs[5].toLowerCase()} bowls, wearing fleece vests and riding ${inputs[6].toLowerCase()}. But it all went horribly wrong.</p> \
                                <p>Instead, they were disgusted with streets littered with ${inputs[7].toLowerCase()} and ${inputs[8].toLowerCase()}; rampant ${inputs[9].toLowerCase()}-use, and a ${inputs[10].toLowerCase()} on every corner.</p> \
                                <p>And then came the botched brunch order at Tartine. Instead of pain au jambon and a croque monsieur, they received ${inputs[11].toLowerCase()}.</p> \
                                <p>It was a devastating blow. And to make matters worse, they left the ${inputs[11].toLowerCase()} in the back seat of their car, where it was promptly ${inputs[12].toLowerCase()} by ${inputs[13].toLowerCase()}.</p> \
                                <p>Rabinowitz called the ${inputs[14]}. They told him that they can’t do anything because that ${toTitleCase(inputs[15])} won’t let them do their jobs.</p> \
                                <p>Then his car was impounded by the Department of ${toTitleCase(inputs[16])}. And then the impound lot was designated a site of special cultural interest by the Historic Preservation Commission, and the car was sealed within.</p> \
                                <p>And that was that. They talked about where they’ll go next. Maybe ${toTitleCase(inputs[17])} or ${toTitleCase(inputs[18])}. Somewhere where crime is against the law.</p> \
                                <p>They won’t be back.</p>` +
                                '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                '<button class="magic-button" id="restart-button">Start again?</button>';
            finishStepFour();
        }
        else if (selectedStory == "outOfTown") {
            step4.innerHTML = `<hr /> \
                                <h3><strong>Out-of-town publication discovers San Francisco</strong></h3> \
                                <p>It’s a tale of two cities. It’s a city of very ${inputs[0].toLowerCase()} people and very ${inputs[1].toLowerCase()} people. A city of men ${inputs[2].toLowerCase()} in their beards outside restaurants, selling ${inputs[3].toLowerCase()} toast for $${stripDollarSigns(inputs[4])}. A city of ${inputs[5].toLowerCase()} municipal buses ${inputs[6].toLowerCase()} moving people and urine around town, and sleek black ${toTitleCase(inputs[7])} cars moving people and urine around town at a marginally faster clip. \
                                <p>The city where ${inputs[8]} miners flocked in ${inputs[9]} gave way to the Summer of ${toTitleCase(inputs[10])}, and hippies with ${inputs[11]} ${inputs[12]} gave way to ${inputs[13]} cults and glass high-rises and tech billionaires and ${inputs[3].toLowerCase()} toast for $${stripDollarSigns(inputs[4])}.</p> \
                                <p>Every city has a Tenderloin, and in San Francisco the Tenderloin is in ${toTitleCase(inputs[15])}. This is a realm of poverty and misery and ${inputs[16].toLowerCase()}-use. It was that way 10 years ago, 20 years ago, 30 years ago, 40 years ago — but that’s not relevant to my story of today.</p> \
                                <p>Then there’s the ${inputs[17].toLowerCase()} and ${inputs[18].toLowerCase()} Mission District. And there’s also … actually, all of San Francisco’s other neighborhoods, and the vast majority of its people, are irrelevant to any national story.</p> \
                                <p>So, in the end, is San Francisco. ${toTitleCase(inputs[19])} is the new ${toTitleCase(inputs[20])}, says my ${toTitleCase(inputs[7])} driver, ${toTitleCase(inputs[21])}, as we drive to the airport.</p>` +
                                '<button class="magic-button" id="copy-button">Copy to clipboard</button>' +
                                '<button class="magic-button" id="restart-button">Start again?</button>';
            finishStepFour();
        }
    }

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