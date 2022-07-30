// fetch lista articoli

(async () => {
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=15");
    articoli = await response.json();
    const opzioni = []
    articoli.forEach(articolo => {
        let riga = document.createElement("tr")
        riga.setAttribute("data-site", articolo.newsSite)
        riga.innerHTML = `
            <td><img src="${articolo.imageUrl}" alt="${articolo.title}"/></td>
            <td><h2>${articolo.title}</h2></td>
            <td><a href="${articolo.url}" target="_blank"/>${articolo.url}</a></td>
            <td><p>${(articolo.publishedAt).substring(0,10)}</p></td>
        `
        document.querySelector('tbody').append(riga)

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
    // let lista = document.querySelectorAll('tbody tr:not(tr:first-of-type)')
    // for (let i of lista) {i.style.display = "table-row"}
    // Array.from(lista)
    // .filter(art => art.dataset.site !== e.target.value)
    // .forEach(art => art.style.display = "none")


    // da fixare il reset


    let lista = document.querySelectorAll('tbody tr:not(tr:first-of-type)')
    for (let i of lista) {i.style.display = "table-row"}
    for (let i of lista) {
        if (i.dataset.site !== e.target.value && i.dataset.site !== 'reset') {i.style.display = "none"}
        if (e.target.value == 'reset') {
            i.style.display = "table.row"
            console.log(i)
        }
        else {i.style.display = "table.row"}
    }
})
    