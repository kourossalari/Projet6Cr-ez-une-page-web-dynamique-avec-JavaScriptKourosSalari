function ajoutForumLogin() {
  const forumLogin = document.querySelector(".formulaire-login")

  forumLogin.addEventListener("submit", async (event) => {
    event.preventDefault()

    const log = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#password").value
    }

    try {
      const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(log)
      })

      const login = await reponse.json()
      
      if (login.token) {
        localStorage.setItem("token", login.token)
        console.log("Token stocké :", localStorage.getItem("token"))
        window.location.href = "http://127.0.0.1:5500/index.html"

      } else {
        alert("Email ou mot de passe incorrect")
        console.log("else")
      }

    } catch (error) {
      console.error("Erreur serveur :", error)
      alert("Erreur serveur, veuillez réessayer plus tard")
    }
  })
}

ajoutForumLogin()