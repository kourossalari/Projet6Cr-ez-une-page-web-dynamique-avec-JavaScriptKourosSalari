async function testRecuperationTravaux() {
    // Vérifie bien que c'est le port 5678 (celui du backend)
    const url = "http://localhost:5678/api/works";
    
    try {
        const reponse = await fetch(url);
        
        console.log("Statut de la réponse :", reponse.status); // Doit être 200

        if (reponse.ok) {
            const travaux = await reponse.json();
            console.log("Succès ! Nombre de travaux récupérés :", travaux.length);
            console.table(travaux); 
        } else {
            console.error("Le serveur a répondu mais avec une erreur :", reponse.status);
        }
    } catch (erreur) {
        console.error("Erreur de connexion : Vérifie que le Backend est lancé sur le port 5678");
    }
}

testRecuperationTravaux();