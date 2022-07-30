# challenge_fs4_t4
Challenge Hacking Week FS4

Creare una applicazione con un layout (responsive) composto in questo modo:

- aside con 3 voci (calendario, lista articoli, statistiche)
- container centrale che varia in base alla voce dell’aside scelta, quindi se scegliamo nell’aside calendario nel container centrale mostrerà il calendario, etc..

Sfruttare gli endpoint esposti al link [https://api.spaceflightnewsapi.net/v3/documentation](https://api.spaceflightnewsapi.net/v3/documentation) 

Mostrare quindi un calendario relativo alle pubblicazioni degli articoli e una tabella che mostra tutti gli articoli.

Il calendario deve essere realizzato con l’ausilio della libreria [https://fullcalendar.io/](https://fullcalendar.io/)

La tabella invece dovrà avere dei filtri che permetteranno appunto di riorganizzare i dati contenuti al suo interno.
Ad esempio la chiamata [https://api.spaceflightnewsapi.net/v3/articles](https://api.spaceflightnewsapi.net/v3/articles) ritorna un array di oggetti, ogni oggetto ha diverse proprietà. Tramite la proprietà “newsSite” generare un filtro (sotto forma di un elemento html SELECT) che abbia come opzioni i valori che può assumere newsSite nell’array ritornato.
I dati da esporre nella tabella per ogni articolo sono:

- immagine
- titolo
- url linkabile
- data pubblicazione

Aggiungere un bottone per esportare la lista di dati (filtrata o non) in formato CSV.

Creare una serie di statistiche con la libreria [https://www.chartjs.org/](https://www.chartjs.org/) che mostrino:

- un grafico a torta per % di provenienza dell’articolo (newsSite property)
- un grafico che mostri quante pubblicazioni sono fatte in ogni mese dell’anno da ogni autore (newsSite property)

PLUS: creare un bot discord, da testare su un server di proprietà del gruppo di lavoro, tramite la libreria [https://discord.js.org/](https://discord.js.org/#/) che accetta i comandi:

- /articles ⇒ ritorna gli ID tutti gli articoli
- /articles/authors ⇒ ritorna la lista di autori o della provenienza degli articoli (proprietà newsSite)
- /articles/{id} ⇒ ritorna il testo dell’articolo

Utilizzare [https://getbootstrap.com/](https://getbootstrap.com/) per il layout della pagina
