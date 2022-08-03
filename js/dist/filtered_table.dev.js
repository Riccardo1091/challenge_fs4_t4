"use strict";

// fetch lista articoli
(function _callee() {
  var response, opzioni;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=15"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          articoli = _context.sent;
          opzioni = [];
          articoli.forEach(function (articolo) {
            var riga = document.createElement("tr");
            riga.setAttribute("data-site", articolo.newsSite);
            riga.innerHTML = "\n            <td><p hidden>".concat(articolo.imageUrl, "</p><img src=\"").concat(articolo.imageUrl, "\" alt=\"").concat(articolo.title, "\"/></td>\n            <td><h2>").concat(articolo.title, "</h2></td>\n            <td><a href=\"").concat(articolo.url, "\" target=\"_blank\"/>").concat(articolo.url, "</a></td>\n            <td><p>").concat(articolo.publishedAt.substring(0, 10), "</p></td>\n        ");
            document.querySelector('tbody').append(riga); // popolamento select

            if (opzioni.indexOf(articolo.newsSite) === -1) {
              opzioni.push(articolo.newsSite);
              var opzione = document.createElement("option");
              opzione.value = articolo.newsSite;
              opzione.textContent = articolo.newsSite;
              document.getElementById('filter-newsSite').append(opzione);
            }
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
})(); // filtro select


document.getElementById('filter-newsSite').addEventListener('change', function (e) {
  var lista = document.querySelectorAll('tbody tr:not(tr:first-of-type)');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lista[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      i.classList.remove("hidden");
      if (i.dataset.site !== e.target.value) i.classList.add("hidden");

      if (e.target.value == 'reset') {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = lista[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _i = _step2.value;

            _i.classList.remove("hidden");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } // console.log(i.style.display);

    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}); // Creazione download lista filtrata

function tableToCSV(filename) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = document.querySelectorAll('tr td p')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var i = _step3.value;
      i.removeAttribute('hidden');
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var csv = [];
  var rows = document.querySelectorAll("table tr:not(.hidden)");
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = rows[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _i2 = _step4.value;

      var row = [],
          cols = _i2.querySelectorAll("td, th");

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = cols[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var j = _step6.value;
          row.push('"' + j.innerText + '"');
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      csv.push(row.join(","));
    } // Download CSV file

  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  downloadCSV(csv.join("\n"), filename);
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = document.querySelectorAll('tr td p')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _i3 = _step5.value;

      _i3.setAttribute('hidden', '');
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink; // CSV file

  csvFile = new Blob([csv], {
    type: "text/csv"
  }); // Download link

  downloadLink = document.createElement("a"); // File name

  downloadLink.download = filename; // Create a link to the file

  downloadLink.href = window.URL.createObjectURL(csvFile); // Hide download link

  downloadLink.style.display = "none"; // Add the link to DOM

  document.body.appendChild(downloadLink); // Click download link

  downloadLink.click();
}