// script.js
document.addEventListener('DOMContentLoaded', function () {
    var pymChild = new pym.Child();

    // Optional: Listen for events to resize the iframe if needed
    pymChild.on('resize', function() {
        // Trigger a resize when necessary, if you have dynamic content
    });
});
