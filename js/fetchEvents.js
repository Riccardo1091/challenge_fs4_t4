// Questo modulo permette di poter fetchare gli eventi dall'API
const dataFetch = new CustomEvent('dataFetch');
let pubblications = null;

async function fetchPosts(){
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
    pubblications = await response.json();
    document.dispatchEvent(dataFetch);
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  // Istanziazione calendario
  let calendar = new FullCalendar.Calendar(calendarEl, {
    height: '100%',
    expandRows: true,
    slotMinTime: '08:00',
    slotMaxTime: '20:00',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialDate: '2022-07-01',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    nowIndicator: true,
    dayMaxEvents: true, // allow "more" link when too many events
  });

  let events = [];
  document.addEventListener("dataFetch", ()=>{
     pubblications.forEach(pubblication => {
       const newEvent = [{
         title: pubblication.title,
         start: pubblication.publishedAt
       }]  
       calendar.addEventSource(newEvent);
    });
  })
  calendar.render();
});

document.querySelector('#link_cal').addEventListener('click', fetchPosts);