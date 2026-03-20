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
   galleryModal(works)
})

if(token) {
    log.textContent = "logout"
    bandeau.style.display = "flex"
    modif.style.display = "flex"
    modif.style.gap = "10.42px"

    openGalleryModal()

    log.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.reload()
})
    

  closeBtn.addEventListener("click", closeModal)
    modal.addEventListener("click", closeModal)

  modalWrapper.addEventListener("click", (e) => {
    e.stopPropagation()
   })

   modalWrapper2.addEventListener("click", (e) => {
    e.stopPropagation()
   })

   buttonAddPictureModal()
}

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

    function openGalleryModal() {
    openBtn.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "flex"
    modal.setAttribute("aria-hidden", "false")
  })
    }

    function closeModal(e){
        modal.setAttribute("aria-hidden","true")
        resetInputPicture()

        setTimeout(() => {
    modal.style.display = "none"
  }, 300)
    }

    function galleryModal(works) {
    const midModal = document.querySelector(".middle-modal") || document.createElement("div");
    midModal.classList.add("middle-modal")
    midModal.innerHTML = ""

    works.forEach(work => {
        const figure = document.createElement("figure")
        const corbeille = document.createElement("img")
        const img = document.createElement("img")

        img.src = work.imageUrl
        corbeille.src = "/assets/images/corbeille.png"

        figure.appendChild(img)
        figure.appendChild(corbeille)
        midModal.appendChild(figure)

        corbeille.classList.add("icone-trash")

        corbeille.dataset.id = work.id

        corbeille.addEventListener("click", async (e) =>{

        const id = e.target.dataset.id
        const url = `http://localhost:5678/api/works/${id}`

        try {
            const del = await fetch(url, {
            method: "DELETE", 
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
       }})

       if(!del.ok) {
                alert("Erreur lors de la suppression")
                return
            }
                await refreshWorks()

        }catch(err) {
            console.log(err)
            alert("Impossible de supprimer votre photo")
        }
})
    })

    if (!modalWrapper.querySelector(".middle-modal")) {
        modalWrapper.appendChild(midModal)
    }
}

    async function refreshWorks() {

        const res = await fetch("http://localhost:5678/api/works")
        const works = await res.json()

        gallery.innerHTML = ""
        afficherGallery(works)
        galleryModal(works)
    }
 
    function resetInputPicture() {
        const bodyModal2P = document.querySelector(".bodyModal2 p")
        const labelImageInput = document.querySelector("#labelImageInput")
        const iconeBodyModal = document.querySelector("#iconeBodyModal")
        const imagePreview = document.querySelector("#previewImage")
        const inputSubmit = document.querySelector(".inputSubmit")
        const inputFile = document.querySelector("#imageInput")
        const inputTitle = document.querySelector("#Title")
        
        inputFile.value = ""

        inputTitle.value = ""

        imagePreview.src = ""
        imagePreview.style.display = "none"

        bodyModal2P.style.display = "block"
        labelImageInput.style.display = "flex"
        iconeBodyModal.style.display = "block"

        inputSubmit.style.background = "#A7A7A7"
    }
    
    function buttonAddPictureModal() {
        const buttonModal = document.querySelector(".envoiePhoto").addEventListener("click",(e) => {
            modalWrapper2.style.display = "block"
            modalWrapper.style.display = "none"
        
        const closeBtn = document.querySelector(".closeBtn")
        closeBtn.addEventListener("click", closeModal)
        modal.addEventListener("click", closeModal)
        const back = document.querySelector(".back")
        back.addEventListener("click", () => {
        modalWrapper2.style.display = "none"
        modalWrapper.style.display = "block"
    })

        addWorkForm()
        buttonImportPicture()
        })
    }

    function buttonImportPicture() {
        const bodyModal2P = document.querySelector(".bodyModal2 p")
        const bodyModal2 = document.querySelector(".bodyModal2")
        const labelImageInput = document.querySelector("#labelImageInput")
        const iconeBodyModal = document.querySelector("#iconeBodyModal")
        const imagePreview = document.querySelector("#previewImage")
        const inputSubmit = document.querySelector(".inputSubmit")
        const importPhoto = document.querySelector("#imageInput").addEventListener("change",(e) => {
        
        const files = e.target.files
        const file = files[0]

        if(files.length === 0) return
        
        if (file.size > 4_000_000) {
            alert("Le fichier est trop lourd")
            return
        }

        if(files.length > 0) {
            inputSubmit.style.background = "#1D6154"
        } 

        const url = URL.createObjectURL(file)
        imagePreview.src = url
        bodyModal2P.style.display = "none"
        labelImageInput.style.display = "none"
        iconeBodyModal.style.display = "none"
        imagePreview.style.display = "block"
        })
    }


    function addWorkForm() {
    const formModal2 = document.querySelector("#addWorkForm")

    formModal2.addEventListener("submit", async (e) => {
        e.preventDefault()

        const InputCategory = formModal2.querySelector("#category").value
        const inputTitle = formModal2.querySelector("#Title").value.trim()
        const importPhoto = formModal2.querySelector("#imageInput").files[0]

        if (inputTitle === "") {
            alert("Veuillez remplir un titre")
            return
        }
        
        if (!importPhoto) {
            alert("Veuillez ajouter une image")
            return
        }

        const formData = new FormData(formModal2)

        try {
            const res = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            if (!res.ok) {
                alert("Erreur lors de l'envoi de l'image")
                return
            }

            await refreshWorks()
            closeModal()
            modalWrapper2.style.display = "none"
            modalWrapper.style.display = "block"

            

        } catch(err) {
            console.log(err)
            alert("Impossible d'envoyer votre photo")
        }
    })
}