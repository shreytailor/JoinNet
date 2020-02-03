// A function which creates a string that can be used to generate the QR code.
function generateString(ssid, password, hiddenStatus) {

    // Setting the default authentication type to 'WPA'.
    let authType = 'WPA';

    // Process of inspecting the SSID and adding any escape characters if needed.
    // These characters need to be escaped (" ; : \)
    let needsEscape = false;
    let specialCharacters = ['"', ';', ':']
    specialCharacters.forEach(function(character, index) {
        if (password.split('').includes(character)) {
            console.
        }
    });

}