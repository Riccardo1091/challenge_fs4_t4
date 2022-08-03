//creazione calendario
let calendarEl = document.getElementById('calendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
  expandRows: true,
  slotMinTime: '08:00',
  slotMaxTime: '20:00',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  initialView: 'dayGridMonth',
  initialDate: '2022-08-03',
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  selectable: true,
  nowIndicator: true,
  dayMaxEvents: true, // allow "more" link when too many events
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
  const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=50");
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

