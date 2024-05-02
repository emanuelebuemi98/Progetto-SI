// Aggiunta di un event listener al pulsante per l'invio dei dati
document.getElementById("getSingleUserDataButton").addEventListener("click", function () {
  // Ottengo l'email inserita dall'utente
  const email = document.getElementById("emailInput").value;
  // Chiamata alla funzione getDatiUtente con l'email inserita
  getDatiUtentePerEmail(email);
});

// Funzione per ottenere i dati dell'utente
async function getDatiUtentePerEmail(email) {
  try {
    // Effettua una chiamata GET all'endpoint 
    const response = await fetch(`http://localhost:8080/api/utente/showuser?email=${email}`);

    // Verifica che la risposta sia ok (status 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Estrae il JSON dalla risposta
    const dati = await response.json();
    // Stampa dei dati nell'elemento con id "response"
    //document.getElementById("response").innerHTML = JSON.stringify(dati);
    //stampa dei dati deel singolo utente tramite la lista --> funzione definita a parte
    createList([dati]);

  }
  catch (error) {
    // Gestisce eventuali errori
    console.error('Errore durante la chiamata REST:', error);
  }
}

// Aggiunta di un event listener al pulsante per l'invio dei dati
document.getElementById("getAllUsersDataButton").addEventListener("click", function () {
  // Chiamata alla funzione per ottenere tutti gli utenti
  getDatiUtenti();
});

// Funzione per ottenere tutti gli utenti
async function getDatiUtenti() {
  try {
    // Effettua una chiamata GET all'endpoint per ottenere tutti gli utenti
    const response = await fetch(`http://localhost:8080/api/utente/all`);

    // Verifica che la risposta sia ok (status 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Estrae il JSON dalla risposta
    const dati = await response.json();
    // Stampa dei dati nell'elemento con id "response"
    //document.getElementById("response").innerHTML = JSON.stringify(dati);
    //stampa dei dati di tutti gli utenti tramite la tabella--> funzione definita a parte
    createTable(dati);

  }
  catch (error) {
    // Gestisce eventuali errori
    console.error('Errore durante la chiamata REST:', error);
  }
}

// Funzione per creare una tabella HTML
function createTable(data) {
  // Ottieni l'elemento dove inserire la tabella
  const tableContainer = document.getElementById("responseTable");

  // Crea la tabella
  const table = document.createElement("table");
  table.classList.add("table");

  // Creazione dell'intestazione della tabella
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const headers = ["Nome", "Cognome", "Email", "Ruolo"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Creazione del corpo della tabella
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = item.nome;
    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = item.cognome;
    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    const roleCell = document.createElement("td");
    // Verifica se l'utente ha ruoli definiti
    if (item.ruoli.length > 0) {
      // Se sì, stampa le tipologie dei ruoli
      roleCell.textContent = item.ruoli.map(role => role.tipologia).join(", ");
    } else {
      // Se no, stampa un messaggio indicando che non ha ruoli definiti
      roleCell.textContent = "Nessun ruolo definito";
    }
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(roleCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Svuoto la tabella in modo da sovrascriverci sopra dopo il click
  tableContainer.innerHTML = "";

  // Aggiungi la tabella al contenitore
  tableContainer.appendChild(table);
}

// Funzione per creare una lista HTML con i dati dell'utente
function createList(data) {
  // Ottieni l'elemento dove inserire la lista
  const listContainer = document.getElementById("responseList");

  // Svuota il contenitore della lista
  listContainer.innerHTML = "";

  // Creazione della lista
  const ul = document.createElement("ul");
  ul.classList.add("list-group");

  // Itera sui dati dell'utente e crea un elemento di lista per ciascun campo
  data.forEach(item => {
    for (const key in item) {
      // Ignora i campi dell'array, ad esempio "ruoli"
      if (Array.isArray(item[key])) continue;

      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
      ul.appendChild(li);
    }
  });

  // Aggiungi la lista al contenitore
  listContainer.appendChild(ul);
}
