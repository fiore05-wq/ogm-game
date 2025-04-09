document.addEventListener('DOMContentLoaded', (event) => {

    // Istanza dei modal Bootstrap
    const introModalEl = document.getElementById('introModal');
    const introModal = new bootstrap.Modal(introModalEl);

    const situationModalEl = document.getElementById('situationModal');
    const situationModal = new bootstrap.Modal(situationModalEl);
    const timeanddateModalEl = document.getElementById('timeanddateModal');
    const timeanddateModal = new bootstrap.Modal(timeanddateModalEl);

    // --- ELEMENTI DINAMICI ---
    const situationTitleEl = document.getElementById('situationModalLabel');
    const situationDateEl = document.getElementById('situationModalDate');
    const situationHourEl = document.getElementById('situationModalHour');
    const situationTextEl = document.getElementById('situationText');
    const choice1Btn = document.getElementById('choice1');
    const choice2Btn = document.getElementById('choice2');
    const choice3Btn = document.getElementById('choice3');

    // --- STATO DEL GIOCO (Esempio base) ---
    let currentStoryNode = 'start'; // Identificativo del nodo attuale

    // --- STRUTTURA DELLA STORIA (Esempio molto semplificato) ---
    // In un gioco reale, questa sarebbe più complessa, magari caricata da JSON
    const storyData = {
        '1': {
            title: "Supermercato",
            text: "È martedì sera. Sei appena tornato/a a casa dopo una lunga giornata di lavoro. La stanchezza si fa sentire e lo stomaco brontola. Apri il frigorifero: desolatamente vuoto, a parte qualche yogurt e una bottiglia d'acqua. Devi assolutamente fare un salto al supermercato sotto casa per comprare qualcosa per cena. Hai voglia di qualcosa di semplice: pasta al pomodoro.",
            choices: [
                { text: "Entri subito nel supermercato.", nextNode: '2' },
                { text: "Prendi un volantino offerto da dei volontari fuori dal supermercato.", nextNode: '3' },
                ],
            date:"15 maggio",
            hour:"18:30"  
        },
        '2': {
            title: "Il reparto sughi",
            text: "Entri nel supermercato, l'aria condizionata ti dà un minimo di sollievo. Ti dirigi spedito/a verso la corsia dei sughi pronti e della passata di pomodoro. Davanti a te ci sono decine di opzioni. Noti due tipi di passata in offerta:",
            choices: [
                { text: "Una passata di marca nota, prezzo molto conveniente, etichetta standard.", nextNode: '4' },
                { text: "Una passata biologica, con l'indicazione da agricoltura senza OGM , costa quasi il doppio.", nextNode: '5' },
            ],
            date:"15 maggio",
            hour:"18:30"
        },
        '3': {
            title: "Il volantino",
            text: "Ti fermi un attimo a leggere il volantino. È di un'associazione locale di consumatori e mette in guardia sui rischi legati al consumo di alimenti derivati da Organismi Geneticamente Modificati (OGM), citando studi sull'impatto ambientale e potenziali rischi per la salute a lungo termine. Parla anche della difficoltà di tracciare completamente gli OGM nella filiera alimentare, specialmente nei mangimi animali. La lettura ti lascia un po' pensieroso/a. Entri nel supermercato con queste nuove informazioni in testa.",
            choices: [
                { text: "Avanti", nextNode: '2' },
                ],
            date:"15 maggio",
            hour:"18:30"  
        },
        '4': {
            title: "La spesa",
            text: "Prendi la passata standard (Opzione A). È economica e veloce. Prendi anche un pacco di pasta e torni a casa. Prepari la cena in fretta, mangi davanti alla TV guardando le notizie. Il sugo è buono, normale. Non pensi più alla questione OGM per quella sera. La tua cena è stata semplice e senza troppi pensieri. Nei giorni successivi, continui a fare la spesa come sempre, badando più al prezzo e alla praticità.",
            choices: [
                { text: "Qualche giorno dopo, parlando con un amico/a che studia biologia, viene fuori l'argomento OGM e tu minimizzi dicendo che \\ tanto ormai è tutto così \\ .", nextNode: '6' },
                { text: "Qualche giorno dopo leggi un articolo online che collega l'uso massiccio di certi pesticidi (spesso usati con colture OGM resistenti) a problemi ambientali e ti fermi a riflettere.", nextNode: '7' }
                ],
            date:"",
            hour:""  
        },
        '5': {
            title: "La spesa",
            text: "Decidi di spendere un po' di più e prendi la passata biologica e senza OGM (Opzione B). Prendi anche della pasta, magari integrale per restare in tema \\ salutista \\, e torni a casa. Mentre cucini, pensi alla scelta fatta. Ti senti un po' più tranquillo/a riguardo a ciò che metti nel piatto, anche se il costo maggiore si fa sentire. La cena è buona e ti senti soddisfatto/a della tua scelta consapevole.",
            choices: [
                { text: "Questa scelta ti porta a voler approfondire l'argomento OGM, cercando attivamente informazioni online o libri", nextNode: '8' },
                { text: "inizi a comprare quasi esclusivamente prodotti biologici o con etichetta \\ senza OGM \\ senza informarti oltre", nextNode: '9' }
                ],
            date:"",
            hour:""  
        },
        '6': {
            title: "Finale 1",
            text: "Il tuo amico/a ti guarda un po' perplesso/a. Cerca di spiegarti che la questione è complessa, che ci sono differenze tra i vari OGM, alcuni potenzialmente utili (come quelli per produrre farmaci o con migliori proprietà nutritive), altri più controversi per l'impatto su biodiversità e uso di erbicidi. La tua scrollata di spalle chiude la conversazione. Continui la tua vita senza dare troppo peso alla questione, fidandoti del sistema alimentare così com'è. Forse un giorno cambierai idea, o forse no. La tua consapevolezza sugli OGM rimane superficiale.",
            choices: [
                { text: "Torna all'inizio", nextNode: '1' },
                { text: "Chiudi.", nextNode: 'end_game' }
                ],
            date:"",
            hour:""  
        },
        '7': {
            title: "L'articolo",
            text: "L'articolo ti colpisce. Si parla di moria di api, di contaminazione delle acque, di \\ super-erbacce \\ resistenti agli erbicidi. Colleghi queste informazioni alla discussione sui cibi OGM letta sul volantino (#3) o semplicemente inizi a porti delle domande sulla sostenibilità del modello agricolo dominante. Decidi che vuoi saperne di più. Non vuoi diventare un/a esperto/a, ma almeno capire meglio cosa c'è dietro le etichette.",
            choices: [
                { text: "Inizi a cercare documentari o articoli scientifici divulgativi sull'argomento.", nextNode: '8' },
                { text: "Decidi di provare a cambiare le tue abitudini, cercando prodotti a km 0 o da piccoli produttori locali, sperando così di evitare indirettamente gli OGM.", nextNode: '10' }
                ],
            date:"",
            hour:""  
        },
        '8': {
            title: "La ricerca",
            text: "Inizi a navigare online, leggi articoli, guardi video e interviste. Scopri che il mondo degli OGM è incredibilmente complesso, questa ricerca ti rende più consapevole ma anche più confuso/a. Non ci sono risposte facili.",
            choices: [
                { text: "Questa complessità ti porta a pensare che una posizione \\ contro a prescindere \\ o \\ a favore a prescindere \\ sia troppo semplicistica, e decidi di valutare caso per caso.", nextNode: '11' },
                { text: "le informazioni sui rischi ambientali e sul potere delle multinazionali ti convincono ad adottare una posizione più nettamente contraria agli OGM in agricoltura.", nextNode: '12' }
                ],
            date:"",
            hour:""  
        },
        '9': {
            title: "Finale 2",
            text: "Ti senti sicuro/a delle tue scelte \\ bio \\ e \\ senza OGM \\. Al supermercato cerchi queste etichette, spendi di più ma ti senti dalla parte giusta. Un giorno, però, a cena da amici, si parla di un nuovo tipo di OGM sviluppato da un'università pubblica per rendere una pianta più resistente alla siccità, un problema grave nella tua regione. I tuoi amici ne discutono i potenziali benefici ambientali (meno acqua necessaria). Tu rimani fermo/a sulla tua posizione: \\ OGM è OGM, è innaturale e potenzialmente dannoso \\. La discussione si arena sulla tua chiusura. Continui sulla tua strada, convinto/a della bontà assoluta del \\ naturale \\ e del \\ bio \\, forse perdendo l'occasione di comprendere le sfumature della ricerca scientifica.",
            choices: [
                { text: "Torna all'inizio", nextNode: '1' },
                { text: "Chiudi", nextNode: 'end_game' }
                ],
            date:"",
            hour:""  
        },
        '10': {
            title: "Finale 3",
            text: "Inizi a frequentare mercati contadini o Gruppi di Acquisto Solidale (GAS). Parli direttamente con chi coltiva la terra. Scopri un mondo fatto di piccole aziende, spesso biologiche o in conversione, che cercano di usare metodi sostenibili. Ti piace questo contatto diretto e la sensazione di supportare un'economia locale e più rispettosa dell'ambiente. Indirettamente, eviti molti prodotti industriali che potrebbero contenere OGM o derivati (specialmente tramite mangimi). Questa scelta cambia non solo la tua spesa, ma anche il tuo modo di cucinare e di vedere il cibo. Ti senti parte di una piccola comunità che fa scelte diverse. ",
            choices: [
                { text: "Torna all'inizio", nextNode: '1' },
                { text: "Chiudi", nextNode: 'end_game' }
                ],
            date:"",
            hour:""  
        },
        '11': {
            title: "Finale 4",
            text: "Hai capito che giudicare gli OGM come un blocco unico è sbagliato. Inizi a informarti specificamente sui diversi tipi e applicazioni. Magari saresti favorevole a un OGM che riduce l'uso di acqua o che produce farmaci salvavita, ma rimani scettico/a verso quelli legati a erbicidi potenti o che favoriscono monopoli economici. La tua posizione diventa più sfumata e critica. Quando si parla dell'argomento, sei in grado di portare argomentazioni più dettagliate, distinguendo tra le diverse tecnologie e i loro impatti. Non hai una risposta definitiva, ma uno strumento critico per valutare le informazioni che incontri.",
            choices: [
                { text: "Torna all'inizio", nextNode: '1' },
                { text: "Chiudi", nextNode: 'end_game' }
                ],
            date:"",
            hour:""  
        },
        '12': {
            title: "Finale 5",
            text: "Le informazioni che hai raccolto ti hanno convinto che, al di là dei potenziali benefici di alcuni specifici OGM, i rischi ambientali, sociali (controllo del mercato dei semi) e la mancanza di trasparenza a lungo termine siano troppo alti, specialmente per l'uso in agricoltura alimentare su vasta scala. Decidi di supportare attivamente le campagne per un'agricoltura senza OGM, magari firmando petizioni, partecipando a incontri informativi o scegliendo sempre e comunque prodotti garantiti senza OGM e supportando l'agricoltura biologica. La tua diventa una scelta non solo alimentare, ma anche politica.",
            choices: [
                { text: "Torna all'inizio", nextNode: '1' },
                { text: "Chiudi", nextNode: 'end_game' }
                ],
            date:"",
            hour:""  
        },
        // ... altri nodi della storia
        'game_over_example': {
             title: "Fine prematura",
             text: "Una scelta sbagliata ti ha portato a un vicolo cieco. L'avventura finisce qui.",
             choices: [
                 { text: "Ricomincia dall'inizio.", nextNode: '1' }, // Opzione per riavviare
                 { text: "Chiudi.", nextNode: 'end_game' }, // Opzione fittizia per terminare
                 { text: "", nextNode: ''} // Nasconde la terza scelta se non serve
            ]
        }
    };

    // --- FUNZIONI DI GIOCO ---

    // Funzione per mostrare una situazione specifica
    function showSituation(nodeId) {
        const node = storyData[nodeId];
        if (!node) {
            console.error("Nodo storia non trovato:", nodeId);
            // Gestire magari con un nodo di errore generico?
            showSituation('game_over_example'); // Esempio di gestione errore
            return;
        }

        currentStoryNode = nodeId; // Aggiorna lo stato

        // Aggiorna il contenuto del modal Situazione
        situationTitleEl.textContent = node.title || "Situazione";
        situationDateEl.textContent = node.date;
        situationHourEl.textContent = node.hour;
        situationTextEl.textContent = node.text || "Cosa fai?";

        // Aggiorna le scelte
        updateChoiceButton(choice1Btn, node.choices[0]);
        updateChoiceButton(choice2Btn, node.choices[1]);
        updateChoiceButton(choice3Btn, node.choices[2]);

        // Aggiorna il diagramma ad albero (LOGICA MANCANTE)
        updateTreeDiagram(nodeId);

        // Mostra il modal della situazione
        situationModal.show();
    }

    // Funzione helper per aggiornare un bottone di scelta
    function updateChoiceButton(button, choiceData) {
        if (choiceData && choiceData.text && choiceData.nextNode) {
            button.textContent = choiceData.text;
            button.setAttribute('data-choice', choiceData.nextNode); // Associa il prossimo nodo
            button.style.display = ''; // Mostra il bottone
        } else {
            button.style.display = 'none'; // Nascondi se non c'è scelta valida
        }
    }

    // Funzione (placeholder) per aggiornare il diagramma ad albero
    function updateTreeDiagram(currentNodeId) {
        console.log("Aggiornamento diagramma ad albero per il nodo:", currentNodeId);
        // QUI VA LA LOGICA COMPLESSA PER DISEGNARE/AGGIORNARE L'ALBERO
        // - Trovare il nodo nell'albero
        // - Evidenziarlo come corrente
        // - Assicurarsi che i suoi predecessori siano visibili e connessi
        // - Potrebbe richiedere una libreria JS (D3.js, GoJS, Vis.js, ecc.)
        // - O manipolazione diretta di SVG/Canvas
        const treeBg = document.getElementById('tree-diagram-bg');
        // Esempio base: cambia leggermente lo sfondo per dare un feedback
        treeBg.style.filter = `hue-rotate(${Math.random() * 360}deg) opacity(0.1)`;
    }

    // --- EVENT LISTENERS ---

    // Mostra il modal introduttivo all'avvio
    introModal.show();

    // Gestore per il bottone "Inizia l'Avventura"
    document.getElementById('startGameBtn').addEventListener('click', () => {
        // Il data-bs-dismiss="modal" chiude già l'intro modal
        // Mostra la prima situazione
        showSituation('1');
    });

    // Gestore per i bottoni di scelta (usando event delegation)
    situationModalEl.addEventListener('click', (event) => {
        // Verifica se il click è su un bottone di scelta valido
        const choiceButton = event.target.closest('.btn[data-choice]');
        if (choiceButton) {
            const nextNodeId = choiceButton.getAttribute('data-choice');
            if (nextNodeId && nextNodeId !== 'end_game') {
                 // Il data-bs-dismiss="modal" chiude il modal corrente
                 // Mostra la situazione successiva dopo una piccola pausa (per far vedere la chiusura)
                 setTimeout(() => {
                     showSituation(nextNodeId);
                 }, 300); // Breve ritardo
            } else if (nextNodeId === 'end_game') {
                 // Logica per terminare o mostrare una schermata finale
                 console.log("Gioco terminato.");
                 // Potresti nascondere il modal o reindirizzare, etc.
            }
        }
    });

});
