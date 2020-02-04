// A function that generates the QR code, and adds it to the div when given the SSID and Password.
function generateCode(ssid, password) {

    // Setting the default authentication type to 'WPA'.
    let authType = 'WPA';

    // Process of inspecting the SSID and adding any escape characters if needed.
    // These characters need to be escaped (" ; : \)
    
    // Creating an character array from the password string.
    let passwordArray = password.split('');

    // Going through all the characters within the array, and storing the indexes if it is a special character.
    let specialIndexes = [];
    passwordArray.forEach(function (character, index) {
        if (character == '"' || character == ';' || character == ':') {
            specialIndexes.push(index);
        }
    });

    // Going through all the indexes now and adding the special characters - depending on the literal index of the special character index.
    specialIndexes.forEach(function(index, literalIndex) {
        passwordArray.splice(index + literalIndex, 0, '\\');
    });

    // Converting the password array back to a normal password again.
    password = passwordArray.join('');

    // Clearing the current QR code in the div.
    document.getElementById('qrcode').innerHTML = '';

    // Adding the new QR code to the div.
    jQuery('#qrcode').qrcode({
        width: 195,
        height: 195,
        text: `WIFI:S:${ssid};T:${authType};P:${password};`,
        foreground: "#232ed1",
        background: 'transparent'
    });

    // Setting the new SSID and Password to the card information.
    document.getElementById('ssidForm').textContent = ssid;
    document.getElementById('passwordForm').textContent = password;

}



// ------------------------------------------------------------------------------------------------------------------------------------
// ************************************************************************************************************************************
// ------------------------------------------------------------------------------------------------------------------------------------



// Clearing the SSID and Password textboxes when the window is reloaded.
document.getElementById('ssid').value = '';
document.getElementById('password').value = '';

// Displaying the default QR code when the browser is refreshed.
generateCode('MySSID', 'somepassword');

// When the button is clicked, get the SSID and Password from the textboxes.
document.getElementById('button').addEventListener('click', function(event) {
    // Retrieving the values entered by the user.
    let ssid = document.getElementById('ssid').value;
    let password = document.getElementById('password').value;

    // If the SSID and the Password fields are empty, show the default QR code.
    if (ssid != '') {
        // Returning the borders to normal.
        document.getElementById('ssid').style.border = '1px solid black';
        document.getElementById('password').style.border = '1px solid black';

        // Calling the function to generate the QR code.
        generateCode(ssid, password);

        // Bringing the card into view, for the mobile devices.
        document.getElementById('card').scrollIntoView({
            behavior: "smooth"
        });
    } else {
        // Displaying the QR code for the default SSID and Password.
        generateCode('MySSID', 'somepassword');

        // If there is any error with the input, the border of the input boxes turn red.
        document.getElementById('ssid').style.border = '1px solid red';
        document.getElementById('password').style.border = '1px solid red';
    }
});

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