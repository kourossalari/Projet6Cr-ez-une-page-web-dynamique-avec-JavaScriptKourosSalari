const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".filters")
const token = localStorage.getItem("token")
const log = document.querySelector(".log")
const bandeau = document.querySelector(".bandeau")
const modif = document.querySelector(".modif")
const openBtn = document.querySelector(".js-modal")
const modal = document.querySelector("#modal")
const closeBtn = document.querySelector(".js-modal-close")
const modalWrapper = document.querySelector(".modal-wrapper")
const midModal = document.querySelector(".middle-modal")
const header1 = document.querySelector(".header1")
const modalWrapper2 = document.querySelector(".modalWrapper2")

fetch("http://localhost:5678/api/works")

.then(reponse => reponse.json())
.then(works => {
    console.log(works)
   afficherGallery(works)
   creerFiltre(works)
})

    function afficherGallery(works) {
    works.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        
        img.src = work.imageUrl

        figcaption.textContent = work.title

        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
        })
}

    function creerFiltre(works) {
        if(localStorage.getItem("token")) return ;

        const btnTous = document.createElement("button")
        btnTous.textContent = "Tous"
        filters.appendChild(btnTous)
        btnTous.classList.add("little-btn")
        btnTous.classList.add("active-btn")

        btnTous.addEventListener("click", () => {
        gallery.innerHTML = ""
        afficherGallery(works)
        setActiveBtn(btnTous)
        })

        const btnObjets = document.createElement("button")
        btnObjets.textContent = "Objets"
        filters.appendChild(btnObjets)
        btnObjets.classList.add("little-btn")

        btnObjets.addEventListener("click", () => {
            gallery.innerHTML = ""
             const worksObjets = works.filter(work => work.category.name === "Objets")
           
            afficherGallery(worksObjets)
            setActiveBtn(btnObjets)
        })

        const btnAppartements = document.createElement("button")
        btnAppartements.textContent = "Appartements"
        filters.appendChild(btnAppartements)
        btnAppartements.classList.add("midsize-btn")

        btnAppartements.addEventListener("click", () => {
            gallery.innerHTML = ""
             const worksAppartement = works.filter(work => work.category.name === "Appartements")
           
            afficherGallery(worksAppartement)
            setActiveBtn(btnAppartements)
        })

        const btnHR = document.createElement("button")
        btnHR.textContent = "Hotels & restaurants"
        filters.appendChild(btnHR)
        btnHR.classList.add("high-btn")
         
        btnHR.addEventListener("click", () =>{
            gallery.innerHTML = ""
            const worksHR = works.filter(work => work.category.name === "Hotels & restaurants")
            afficherGallery(worksHR)
            setActiveBtn(btnHR)
        })
    }

    function setActiveBtn(activeButton) {

    const buttons = filters.querySelectorAll("button")

    buttons.forEach(btn => {
        btn.classList.remove("active-btn")
    })

    activeButton.classList.add("active-btn")
}