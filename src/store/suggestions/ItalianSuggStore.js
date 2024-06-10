import { defineStore } from 'pinia';

export const useItalianSuggStoreStore = defineStore('italian', {
    state: () => ({

        vegetali: ["Carote", "Pomodori", "Patate", "Cipolle", "Zucchine", "Peperoni", "Cetrioli", "Melanzane", "Spinaci", "Lattuga", "Broccoli", "Cavolfiore", "Asparagi", "Fagiolini", "Sedano", "Finocchi", "Ravanelli", "Bietole", "Cavolo", "Zucca"],

        carne: ["Pollo", "Manzo", "Maiale", "Cotechino", "Salsiccia", "Agnello", "Anatra", "Vitello", "Coniglio", "Mortadella", "Salame", "Prosciutto cotto", "Prosciutto crudo", "Bresaola", "Fesa di tacchino", "Fesa di pollo", "Hamburger di pollo", "Hamburger di tacchino", "Hamburger di vitello", "Bacon", "Petto di pollo", "Coscia di pollo", "Sovracoscia di pollo", "Ali di pollo", "Filetto di manzo", "Controfiletto di manzo", "Costata di manzo", "Bistecca di manzo", "Fiorentina di manzo", "Sottofiletto di manzo", "Filetto di maiale", "Costine di maiale", "Lonza di maiale", "Spalla di maiale", "Coppa di maiale", "Stinco di maiale", "Braciole di maiale", "Lardo di maiale", "Guanciale di maiale"],

        pesce: ["Salmone", "Tonno", "Merluzzo", "Trota", "Orata", "Branzino", "Sogliola", "Platessa", "Pesce spada", "Seppia", "Merluzzo nero", "Acciuga", "Scampi", "Gamberetti", "Calamari", "Cozze", "Vongole", "Aragosta", "Granchio", "Sardine"],

        frutta: ["Mele", "Banane", "Arance", "Uva", "Fragole", "Limoni", "Pere", "Kiwi", "Pesche", "Ananas", "Mango", "Melone", "Mandarini", "Ciliegie", "Limette", "Avocado", "Lamponi", "Pompelmi", "Albicocche", "Melograni"],

        dolci: ["Zucchero", "Zucchero a velo", "Lievito in polvere", "Cioccolato", "Vaniglia", "Frutta fresca", "Panna montata", "Gelatina", "Cacao in polvere", "Amido di mais", "Sciroppo di mais", "Yogurt", "Marmellata", "Glassa", "Tiramisù", "Millefoglie", "Cheesecake", "Marmellata", "Nutella", "Miele"],

        latticini: ["Mozzarella", "Latte", "Burro", "Formaggio cheddar", "Yogurt", "Panna", "Ricotta", "Formaggio grana", "Parmigiano reggiano", "Gorgonzola", "Formaggio Philadelphia", "Formaggio svizzero", "Formaggio di capra", "Brie", "Taleggio", "Pecorino"],

        farinacei: ["Farina di grano", "Farina di mais", "Farina di segale", "Pasta", "Spaghetti", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Riso", "Pane", "Pane integrale", "Pane ai cereali", "Panini", "Biscotti", "Crackers", "Tortillas di mais", "Cereali", "Farina di avena", "Gnocchi", "Risotto", "Polenta", "Couscous"],

        bevande: ["Acqua naturale", "Acqua frizzante", "Succo di frutta", "Coca cola", "Pepsi", "Aranciata", "Tè freddo", "Caffè in bottiglia", "Succo di frutta", "Birra", "Vino rosso", "Vino bianco", "Vino rosato", "Spumante", "Prosecco", "Amaro", "Limoncello", "Vodka", "Gin", "Rum", "Whisky", "Tewuila", "Aperol", "Spritz", "Campari"],

        surgelati: ["Gelato", "Ghiaccioli", "Pizza", "Minestrone", "Patatine fritte", "Patatine al forno", "Nuggets", "Crocchette di pollo", "Crocchette di patate", "Panzerottini", "Olive ascolane", "Crocchette di mozzarella", "Pesce surgelato", "Filetto", "Sorbetto", "Croissant", "Bastoncini di pesce", "Sfogliatelle", "Burritos", "Torta surgelata", "Minestra di legumi"],

        spezie: ["Pepe nero", "Peperoncino in polvere", "Aglio in polvere", "Prezzemolo in polvere", "Cumino", "Curcuma", "Paprika", "Origano", "Cannella", "Noce moscata", "Zenzero in polvere", "Chiodi di garofano"],

        igiene: ["Shampoo", "Balsamo", "Sapone", "Carta igienica", "Detergente intimo", "Dentifricio", "Spazzolino da denti", "Filo interdentale", "Dentifricio", "Collutorio", "Deodorante", "Sgrassatore", "Igienizzante", "Detersivo lavatrice", "Detersivo piatti", "Spugne", "Buste immondizia", "Salviettine detergenti", "Crema idratante per il corpo", "Rasoi", "Schiuma da barba", "Dopo barba", "Fazzoletti di carta", "Cotton fioc", "Smalto per unghie", "Profumo o colonia"],

        farmaci: ["Aspirina", "Statina", "Paracetamolo", "Ibuprofene", "Pomata per zanzare", "Cortisone", "Collirio", "Pomata per dolori muscolari", "Antidolorifico", "Lassativi", "Termometro", "Garze", "Cerotti", "Clorfenamina", "Lassativi a base di fibra", "Cetirizina", "Cannabis Legale", "Viagra"],

        cancelleria: ["Matite", "Pennarelli", "Righello", "Evidenziatori", "Penne", "Colori", "Gomme per cancellare", "Blocchi di carta", "Quaderni", "Album per disegno", "Correttori", "Forbici", "Righelli", "Colla", "Nastro adesivo", "Cartelle", "Cartoncino", "Graffette", "Pinzatrice", "Ricariche pinzatrice", "Post-it"],

        bimbi: ["Pannolini", "Bavette", "Salviettine umidificate", "Latte in polvere", "Biberon", "Ciuccio", "Balsamo per la pelle", "Talco", "Crema idratante", "Detergente delicato", "Bagnetto schiuma", "Termometro", "Pastina", "Formaggino", "Omogeneizzati", "Tiralatte", "Giocattoli morbidi", "Proteggi-spigoli per mobili", "Cuscino anti-soffocamento", "Seggiolone", "Protezione solare", "Pomata per irritazioni", "Fasciatoio", "Passeggino", "Carrozzina", "Pomata per gengive"],

        elettronica: ["Cavi USB", "Auricolari", "Lampadine", "Televisore", "Macchina per caffè", "Custodie per smartphone", "Schede di memoria SD", "Adattatori di alimentazione", "Aspirapolvere", "Lavatrice", "Lavastoviglie", "Asciugatrice", "Fornetto pizza", "Caricabatterie per smartphone", "Auricolari", "Altoparlanti Bluetooth", "Mouse", "Tastiera", "Power bank", "Robot da cucina", "Robot aspirapolvere", "Torce a LED", "Calcolatrice", "Lampade da lettura a LED", "Cuffie con microfono", "Webcam", "Mousepad", "Ventilatore", "Hub USB", "Tastiere con filo", "Telefoni cordless", "Altoparlanti per PC", "Supporti per smartphone per auto"],

        animali: ["Cibo secco per gatti/cani", "Croccantini", "Scatolette di cibo umido per gatti/cani", "Lettiera per gatti", "Snack per gatti/cani", "Guinzaglio per cani", "Museruola", "Collare per cani/gatti", "Giochi di gomma", "Trasportini per animali", "Ciotole per cibo e acqua", "Pettini e spazzole per la cura del pelo", "Antiparassitari", "Collare per pulci", "Anti zecche", "Lettino", "Shampoo", "Balsamo", "Igienizzanti per la lettiera dei gatti", "Giochi per masticare", "Lettiere per Criceti", "Mangiatoie", "Abbeveratoio", "Cibo per uccelli", "Gabbiette", "Snack per pesci", "Cibo per tartaruga", "Semi di girasole"],

        attrezzi: ["Cacciavite piatto", "Cacciavite a croce", "Martello", "Chiave inglese", "Pinze", "Forbici", "Sega", "Livella a bolla d'aria", "Scalpello", "Taglierino", "Cesoia", "Nastro metrico", "Metro", "Nastro adesivo", "Nastro isolante", "Fascette", "Chiodi", "Viti", "Bulloni", "Cazzuola", "Pennello per pittura", "Spatola", "Chiave a brugola"],

        vestiti: ["T-shirt", "Maglietta", "Canottiera", "Polo", "Mutande", "Camicia", "Maglione", "Felpa", "Giacca", "Cappotto", "Pantaloni", "Jeans", "Pantaloncini", "Gonne", "Vestito", "Completo da lavoro", "Pigiama", "Intimo", "Calze", "Maglia termica", "Cappello", "Guanti", "Scarpe", "Scarpe da ginnastica", "Lingerie", "Reggi calze", "Calze a rete", "Reggiseno", "Perizoma"],

        giocattoli: ["Bambole", "Macchinine", "Puzzle", "Blocchi di costruzione", "Set da gioco da cucina", "Palloni da calcio", "Set di pittura e colori", "Giochi da tavolo", "Tricicli", "Carte pokemon", "Carte magic the gathering", "Giochi per l'orto", "Giochi scientifici", "Trenini", "Giochi di società", "Carte", "Bicicletta", "Motoretta elettrica", "Auto radiocomandata", "Game boy", "Play station", "Xbox"],

        arredamento: ["Divano", "Tavolo", "Tavolino", "Tappeto", "Sedia", "Lampada da terra", "Lampada da tavolo", "Scaffale", "Comodino", "Letto", "Scrivania", "Scaffali a muro", "Specchio", "Appendiabiti", "Mobile TV", "Armadio", "Pouf", "Vaso", "Cornice per foto", "Portaombrelli", "Cuscini decorativi", "Orologio da parete", "Quadro", "Zerbino"],

        oggettiDomestici: ["Posate", "Forchette", "Coltelli", "Cucchiai", "Piatti", "Bicchieri", "Tazze", "Pentole", "Padelle", "Teglie da forno", "Mestoli", "Apriscatole", "Tagliere", "Contenitori per alimenti", "Scopa", "Specchio", "Asciugamano"],

        giardinaggio: ["Guanti da giardinaggio", "Zappetta", "Forbici da potatura", "Annaffiatoi", "Tubi da giardino", "Rastrello", "Paletti per le piante", "Vaso", "Sottovaso", "Concime", "Sementi", "Terreno per piante", "Secchio", "Spruzzatore", "Picconi da giardino"],

        altro: ["Sale", "Uova", "Snack", "Caffè in polvere", "Caffè capsule/cialde", "Barrette energetiche", "Patatine confezionate", "Salatini", "Cioccolatini", "Popcorn", "Salsa di soia", "Salsa barbecue", "ketchup", "Maionese", "Frutta secca", "Cereali per la colazione", "Pile", "Accendino", "Carta da forno", "Fogli di alluminio", "Candele", "Elastici", "Spago"],

        regaliDiNatale: ["Non crediamo di riuscire a darvi suggerimenti per questa categoria poiché è troppo soggettiva.",
            "Possiamo però suggerirti di passare un felice Natale in famiglia, che sia famiglia di sangue o non, l’importante è esser felici!",
            "Questo è il miglior regalo… BUON NATALE!"],
    }),
    getters: {},
    actions: {}
});
