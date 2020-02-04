// Process of being able to press 'Enter' and submit the form on any of the textboxes.
document.getElementById('ssid').addEventListener('keyup', function(event) {

    // If 'Enter' was pressed, then click the button.
    if (event.keyCode === 13) {
        document.getElementById('button').click();
    }

});

document.getElementById('password').addEventListener('keyup', function(event) {

    // If 'Enter' was pressed, then click the button.
    if (event.keyCode === 13) {
        document.getElementById('button').click();
    }

});

// Disabling right click on the whole webpage.
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});