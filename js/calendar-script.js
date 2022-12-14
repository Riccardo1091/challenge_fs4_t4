//creazione calendario
let calendarEl = document.getElementById('calendar');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
let calendar = new FullCalendar.Calendar(calendarEl, {
  expandRows: true,
  slotMinTime: '00:00',
  slotMaxTime: '23:59',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,listWeek',
    color: 'red'
  },
  initialView: 'dayGridMonth',
  initialDate: today,
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  selectable: true,
  nowIndicator: true,
  dayMaxEvents: true,
  eventColor: 'blue',
  eventBackgroundColor: 'lightgreen',
  eventTextColor:'black',
  eventDisplay: 'block', // allow "more" link when too many events
  eventClick: function(event) {
    if (event.event.url) {
      event.jsEvent.preventDefault();
      window.open(event.event.url, "_blank");
    }
  }
});
let events = [];

//fetch
let pubblications = [];
(async () => {
  const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=100");
  pubblications = await response.json();
  pubblications.forEach(pubblication => {
    const newEvent = [{
      title: pubblication.title,
      start: pubblication.publishedAt,
      url: pubblication.url
    }]
    calendar.addEventSource(newEvent);
  });
  //avvio calendario
  calendar.render();
})();

