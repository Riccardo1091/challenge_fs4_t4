const showside = document.querySelector("#sidebarCollapse");
const sidebar = document.querySelector("#sidebar");
const options = document.querySelectorAll("#sidebar-options .list-unstyled .nav-item")


showside.addEventListener("click", ()=>{
    sidebar.classList.toggle("show-sidebar");
})

options.forEach( option =>{
    option.addEventListener("click", ()=>{
        sidebar.classList.remove("show-sidebar");
    })
})