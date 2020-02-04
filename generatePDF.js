// Click event listener for the download button.
document.getElementById('downloadButton').addEventListener('click', function(event) {

    html2canvas(document.getElementById('card')).then(function(canvas) {
        let image = canvas.toDataURL("image/png");
        image.backgroundColor = '#444444';
        
        let doc = new jsPDF({
            orientation: 'potrait',
            units: 'px',
            format: 'a4',
        });
        // doc.setFillColor(218, 218, 217, 0);
        // doc.rect(0, 0, 595.28, 841.89, "F");
        doc.addImage(image, 'PNG', 44.42, 51.47, 120, 159, 'Alias', 'NONE');
        doc.save('JoinNet - Network QR.pdf');
    });

});

// Click event listener for the print button.
document.getElementById('printButton').addEventListener('click', function(event) {
    alert('The print button was clicked.');
});