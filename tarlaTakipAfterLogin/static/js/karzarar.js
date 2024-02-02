function generatePDF(tarlaId) {
    var element = document.getElementById('karZararTablosu');
    
    var tableRowDiv = document.createElement('div');
    tableRowDiv.innerHTML = element.outerHTML;

    var tableRows = tableRowDiv.querySelectorAll('tr');
    for (var i = 1; i < tableRows.length; i++) {
        if (tableRows[i].querySelector('td:first-child').textContent !== tarlaId.toString()) {
            tableRows[i].remove();
        }
    }

    var opt = {
        margin: 10,
        filename: 'KarZararRaporu.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf(tableRowDiv, opt);
}