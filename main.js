// A function which creates a string that can be used to generate the QR code.
function generateString(ssid, password) {

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

    // Returning the final string which can now be used to generate the QR code.
    return `WIFI:S:${ssid};T:${authType};P:${password};`;

}

// Displaying the default QR code when the browser is refreshed.
jQuery('#qrcode').qrcode({
    width: 195,
    height: 195,
    text: "WIFI:S:OnTheMoon;T:WPA;P:Mars2001;",
    foreground: "#232ed1"
});

// When the button is clicked, get the SSID and Password from the textboxes.
document.getElementById('button').addEventListener('click', function(event) {
    // Retrieving the values entered by the user.
    let ssid = document.getElementById('ssid').value;
    let password = document.getElementById('password').value;

    // Clearing the HTML of the 'qrcode' div.
    document.getElementById('qrcode').innerHTML = '';


    // If the SSID and the Password fields are empty, show the default QR code.
    if (ssid != '') {
        // Returning the borders to normal.
        document.getElementById('ssid').style.border = '1px solid black';
        document.getElementById('password').style.border = '1px solid black';

        // Creating the string which will be used to generate the QR code.
        let generatedString = generateString(ssid, password);

        // Generating the QR code.
        jQuery('#qrcode').qrcode({
            width: 195,
            height: 195,
            text: generatedString,
            foreground: "#232ed1"
        });

        // Setting the card's information to the new SSID and Password.
        document.getElementById('ssidForm').textContent = ssid;
        document.getElementById('passwordForm').textContent = password;

        // Bringing the card into view, for the mobile devices.
        document.getElementById('card').scrollIntoView({
            behavior: "smooth"
        });
    } else {
        // Displaying the QR code for the default SSID and Password.
        jQuery('#qrcode').qrcode({
            width: 195,
            height: 195,
            text: "WIFI:S:OnTheMoon;T:WPA;P:Mars2001;",
            foreground: "#232ed1"
        });

        // Setting the card's information to the default SSID and Password.
        document.getElementById('ssidForm').textContent = 'OnTheMoon';
        document.getElementById('passwordForm').textContent = 'Mars2001';

        // If there is any error with the input, the border of the input boxes turn red.
        document.getElementById('ssid').style.border = '1px solid red';
        document.getElementById('password').style.border = '1px solid red';
    }
});