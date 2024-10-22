// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize the Pym.js child, which will automatically handle resizing
//     var pymChild = new pym.Child();
// });

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Pym.js to manage the iframe
    var pymParent = new pym.Parent('propResults', 'https://missionlocal.github.io/interactives/2024-nov-ballots-results/', {
        'id': 'ballotResults',
        'padding': 20  // Adding padding to prevent bottom content from getting cut off
    });

    // Optionally, listen for window resize events to ensure iframe resizes correctly
    window.addEventListener('resize', function () {
        pymParent.sendHeight();  // Force Pym.js to recalculate the iframe height
    });
});
