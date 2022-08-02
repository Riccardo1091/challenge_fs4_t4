// creazione chart
let ctx = document.getElementById('chartNewsSite').getContext('2d');
let ctx2 = document.getElementById('chartMonths').getContext('2d');

// setup 
const dataChartNewsSite = {
    labels: [],
    datasets: [{
        label: 'Articolo',
        data: [],
        backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 10
    }]
};

const dataChartMonths = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    datasets: [{
        label: 'Articolo',
        data: [],
        backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 10
    }]
};
// config 
const configChartNewsSite = {
    type: 'pie',
    data: dataChartNewsSite,
    options: {
        responsive: true,
        layout: {},
        plugins: {
            datalabels: {
                formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            },
            labels: {
                render: 'percentage',
                fontColor: dataChartNewsSite.datasets[0].borderColor,
                fontStyle: 'bolder',
                position:'outside',
                textMargin: 15,
                fontSize: 20
            },
            title:{
                display: true,
                text: 'Provenienza articoli per autore',
                fontSize: 40,
                padding: 40
            },
            legend: {
                text: 'Legenda',
                position:'bottom',
                labels:{
                    fontcolor:'#000',
                    padding: 40
                }
            },
        }
    }, plugins: [ChartDataLabels]
};

const configChartMonths = {
    type: 'pie',
    data: dataChartMonths,
    options: {
        responsive: true,
        layout: {},
        plugins: {
            // datalabels: {
            //     formatter: function(value, context) {
            //         return context.chart.data.labels[context.dataIndex];
            //     }
            // },
            labels: {
                render: 'linear',
                fontColor: dataChartMonths.datasets[0].borderColor,
                fontStyle: 'bolder',
                position:'outside',
                textMargin: 15,
                fontSize: 20
            },
            title:{
                display: true,
                text: 'Numero articoli per autore per ogni mese dell\'anno',
                fontSize: 40,
                padding: 40
            },
            legend: {
                text: 'Legenda',
                position:'bottom',
                labels:{
                    fontcolor:'#000',
                    padding: 40
                }
            },
        }
    }, plugins: [ChartDataLabels]
};
// avvio chart
const chartNewsSite = new Chart(document.getElementById('chartNewsSite'), configChartNewsSite);
const chartMonths = new Chart(document.getElementById('chartMonths'), configChartMonths);

// primo grafico - percentuale articoli per autore per fetch
let pubblications = null;
let autori = [];
(async () => {
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
    pubblications = await response.json();
    pubblications.forEach( pubblication => {  //creo array di autori
        if (autori.indexOf(pubblication.newsSite) === -1) {
            autori.push(pubblication.newsSite);
        }
    })
    dataChartNewsSite.labels = autori

    autori.forEach(autore => {
        let counter = 0
        pubblications.forEach(pub => {
            if (pub.newsSite == autore)
                counter++
        })
        const rapporto = counter/pubblications.length*100
        dataChartNewsSite.datasets[0].data.push(rapporto)   
    })
    chartNewsSite.update()
})();

// secondo grafico - numero articoli per mese per autore
(async () => {
    let mesi = ['01','02','03','04','05','06','07','08','09','10','11','12']
    for (mese of mesi) {
        const res = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/count?publishedAt_gt=2021-${mese}&newsSite_contains=2`);
        let num_art = await res.json()
        dataChartMonths.datasets[0].data.push(num_art)
    }
    chartMonths.update()
})();

// let grafici = document.querySelectorAll('canvas')
// for (let graf of grafici)
//     graf.addEventListener('click', (e) => {
//         chartNewsSite.update()
//         chartMonths.update()
// })