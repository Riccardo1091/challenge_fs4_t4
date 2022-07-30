// creazione chart
let ctx = document.getElementById('myChart').getContext('2d');
// setup 
const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Articolo',
        data: [10, 10, 20, 10, 20, 20, 10],
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
// config 
const config = {
    type: 'pie',
    data,
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
                fontColor: data.datasets[0].borderColor,
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
// avvio chart
const myChart = new Chart(document.getElementById('myChart'), config);