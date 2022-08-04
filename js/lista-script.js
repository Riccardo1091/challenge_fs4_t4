// fetch lista articoli
(async () => {
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=25");
    articoli = await response.json();
    const opzioni = []
    articoli.forEach(articolo => {
        let riga = document.createElement("tr")
        riga.setAttribute("data-site", articolo.newsSite)
        riga.innerHTML = `
            <td><p hidden>${articolo.imageUrl}</p><img src="${articolo.imageUrl}" alt="${articolo.title}"/></td>
            <td><h2>${articolo.title}</h2></td>
            <td><a href="${articolo.url}" target="_blank"/>${articolo.url}</a></td>
            <td><p>${(articolo.publishedAt).substring(0,10)}</p></td>
        `
        document.querySelector('#arts tbody').append(riga)

        // popolamento select
        if (opzioni.indexOf(articolo.newsSite) === -1) {
            opzioni.push(articolo.newsSite)
            let opzione = document.createElement("option")
            opzione.value = articolo.newsSite
            opzione.textContent = articolo.newsSite
            document.getElementById('filter-newsSite').append(opzione)
        }
    })
  })()

// filtro select
document.getElementById('filter-newsSite').addEventListener('change', (e) => {
    let lista = document.querySelectorAll('#arts tbody tr:not(tr:first-of-type)')
    for (let i of lista) {
        i.classList.remove("hidden")
        if (i.dataset.site !== e.target.value) i.classList.add("hidden")
        if (e.target.value == 'reset') for (let i of lista) i.classList.remove("hidden")
        // console.log(i.style.display);
    }
})

// Creazione download lista filtrata
function tableToCSV(filename) {
    for (let i of document.querySelectorAll('#art_table tr td p')) {i.removeAttribute('hidden')}
    let csv = [];
    let rows = document.querySelectorAll("#art_table tr:not(.hidden)")
    for (let i of rows) {
        let row = [], cols = i.querySelectorAll("#art_table td, #art_table th")
    for (let j of cols)
        row.push('"' + j.innerText + '"')
    csv.push(row.join(","));        
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
    for (let i of document.querySelectorAll('#art_table tr td p')) {i.setAttribute('hidden', '')}
}

function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}