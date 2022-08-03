"use strict";

// creazione chart
var ctx = document.getElementById('chartNewsSite').getContext('2d');
var ctx2 = document.getElementById('chartMonths').getContext('2d'); // setup 

var dataChartNewsSite = {
  labels: [],
  datasets: [{
    label: 'Articolo',
    data: [],
    backgroundColor: ['rgba(255, 26, 104, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(0, 0, 0, 0.2)'],
    borderColor: ['rgba(255, 26, 104, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(0, 0, 0, 1)'],
    borderWidth: 2,
    hoverOffset: 10
  }]
};
var dataChartMonths = {
  labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  datasets: [{
    label: 'Articolo',
    data: [],
    backgroundColor: ['rgba(255, 26, 104, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(0, 0, 0, 0.2)'],
    borderColor: ['rgba(255, 26, 104, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(0, 0, 0, 1)', 'rgba(255, 26, 104, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
    borderWidth: 2,
    hoverOffset: 10
  }]
}; // config 

var configChartNewsSite = {
  type: 'pie',
  data: dataChartNewsSite,
  options: {
    responsive: true,
    layout: {},
    plugins: {
      datalabels: {
        formatter: function formatter(value, context) {
          return context.chart.data.labels[context.dataIndex];
        }
      },
      labels: {
        render: 'percentage',
        fontColor: dataChartNewsSite.datasets[0].borderColor,
        fontStyle: 'bolder',
        position: 'outside',
        textMargin: 15,
        fontSize: 20
      },
      title: {
        display: true,
        text: 'Provenienza articoli per autore',
        fontSize: 40,
        padding: 40
      },
      legend: {
        text: 'Legenda',
        position: 'bottom',
        labels: {
          fontcolor: '#000',
          padding: 40
        }
      }
    }
  },
  plugins: [ChartDataLabels]
};
var configChartMonths = {
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
        position: 'outside',
        textMargin: 15,
        fontSize: 20
      },
      title: {
        display: true,
        text: 'Numero articoli per autore per ogni mese dell\'anno',
        fontSize: 40,
        padding: 40
      },
      legend: {
        text: 'Legenda',
        position: 'bottom',
        labels: {
          fontcolor: '#000',
          padding: 40
        }
      }
    }
  },
  plugins: [ChartDataLabels]
}; // avvio chart

var chartNewsSite = new Chart(document.getElementById('chartNewsSite'), configChartNewsSite);
var chartMonths = new Chart(document.getElementById('chartMonths'), configChartMonths); // primo grafico - percentuale articoli per autore per fetch

var pubblications = null;
var autori = [];

(function _callee() {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.spaceflightnewsapi.net/v3/articles"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          pubblications = _context.sent;
          pubblications.forEach(function (pubblication) {
            //creo array di autori
            if (autori.indexOf(pubblication.newsSite) === -1) {
              autori.push(pubblication.newsSite);
            }
          });
          dataChartNewsSite.labels = autori;
          autori.forEach(function (autore) {
            var counter = 0;
            pubblications.forEach(function (pub) {
              if (pub.newsSite == autore) counter++;
            });
            var rapporto = counter / pubblications.length * 100;
            dataChartNewsSite.datasets[0].data.push(rapporto);
          });
          chartNewsSite.update();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
})(); // secondo grafico - numero articoli per mese per autore


(function _callee2() {
  var mesi, _i, _mesi, res, num_art;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mesi = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          _i = 0, _mesi = mesi;

        case 2:
          if (!(_i < _mesi.length)) {
            _context2.next = 14;
            break;
          }

          mese = _mesi[_i];
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("https://api.spaceflightnewsapi.net/v3/articles/count?publishedAt_gt=2021-".concat(mese, "&newsSite_contains=2")));

        case 6:
          res = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(res.json());

        case 9:
          num_art = _context2.sent;
          dataChartMonths.datasets[0].data.push(num_art);

        case 11:
          _i++;
          _context2.next = 2;
          break;

        case 14:
          chartMonths.update();

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
})(); // let grafici = document.querySelectorAll('canvas')
// for (let graf of grafici)
//     graf.addEventListener('click', (e) => {
//         chartNewsSite.update()
//         chartMonths.update()
// })