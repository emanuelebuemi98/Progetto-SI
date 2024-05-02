// Aggiunta dell'event listener al form per la gestione della registrazione
document.getElementById("registrationForm").addEventListener("submit", registrazioneUtente);

// Definizione della funzione per la gestione della registrazione
async function registrazioneUtente(event) {
    event.preventDefault(); // Evita il comportamento predefinito del form
  
    const nome = document.getElementById("nomeInput").value;
    const cognome = document.getElementById("cognomeInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
  
    // Payload JSON da inviare nella richiesta POST
    const payload = {
        nome: nome,
        cognome: cognome,
        email: email,
        password: password
    };
  
    try {
        // Effettua la richiesta POST per la registrazione
        const response = await fetch('http://localhost:8080/api/utente/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
  
        // Verifica se la risposta è OK (status 200)
        if (response.ok) {
            // Rimuovi eventuali messaggi di errore precedenti
            document.getElementById("registrationMessage").innerHTML = "";
            // Aggiungi un nuovo messaggio di successo
            const successMessage = document.createElement("p");
            successMessage.textContent = "Registrazione effettuata con successo";
            document.getElementById("registrationMessage").appendChild(successMessage);
        } else {
            // Gestione degli errori
            const errorMessage = await response.json();
            console.error('Errore:', errorMessage);
        }
    } catch (error) {
        console.error('Errore:', error);
    }
}