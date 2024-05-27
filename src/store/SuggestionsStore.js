import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';

export const useSuggestionsStore = defineStore('suggestions', {
  state: () => ({
    languages: useLanguageStore(),
    todosStore: useAddModifyDeleteTodosStore(),
    suggestionsModal: false,
    suggestionsList: []
  }),
  getters: {},
  actions: {
    toggleSuggestionsModal() {
      this.suggestionsModal = !this.suggestionsModal;
    },
    checkAndSetSuggestionsLanguage(catName) {
      const categoryName = catName.toLowerCase();
      // ------------------------------------------------------------- INGLESE
      if (this.languages.langEnglish) {
        switch (categoryName) {
          case 'vegetables':
            this.suggestionsList = ["Carrots", "Tomatoes", "Potatoes", "Onions", "Zucchini", "Bell peppers", "Cucumbers", "Eggplants", "Spinach", "Lettuce", "Broccoli", "Cauliflower", "Asparagus", "Green beans", "Celery", "Fennel", "Radishes", "Swiss chard", "Cabbage", "Pumpkin"];
            break;

          case 'meat':
            this.suggestionsList = ["Chicken", "Beef", "Pork", "Cotechino", "Sausage", "Lamb", "Duck", "Veal", "Rabbit", "Mortadella", "Salami", "Cooked ham", "Prosciutto", "Bresaola", "Turkey breast", "Chicken breast", "Bacon", "Chicken breast", "Chicken thigh", "Chicken drumstick", "Chicken wings", "Beef fillet", "Beef sirloin", "Beef rib", "Beef steak", "T-bone steak", "Beef tenderloin", "Pork fillet", "Pork ribs", "Pork loin", "Pork shoulder", "Pork neck", "Pork shank", "Pork chops", "Pork lard", "Pork jowl"];
            break;

          case 'fish':
            this.suggestionsList = ["Salmon", "Tuna", "Cod", "Trout", "Sea Bream", "Sea Bass", "Sole", "Flounder", "Swordfish", "Cuttlefish", "Black Cod", "Anchovy", "Langoustine", "Shrimp", "Squid", "Mussels", "Clams", "Lobster", "Crab", "Sardines"];
            break;

          case 'fruit':
            this.suggestionsList = ["Apples", "Bananas", "Oranges", "Grapes", "Strawberries", "Lemons", "Pears", "Kiwi", "Peaches", "Pineapples", "Mangoes", "Melons", "Tangerines", "Cherries", "Limes", "Avocado", "Raspberries", "Grapefruits", "Apricots", "Pomegranates"];
            break;

          case 'sweets':
            this.suggestionsList = ["Sugar", "Icing sugar", "Baking powder", "Chocolate", "Vanilla", "Fresh fruit", "Whipped cream", "Gelatin", "Cocoa powder", "Cornstarch", "Corn syrup", "Yogurt", "Jam", "Glaze", "Tiramisu", "Millefeuille", "Cheesecake", "Jam", "Nutella", "Honey"];
            break;

          case 'dairy products':
            this.suggestionsList = ["Mozzarella", "Milk", "Butter", "Cheddar cheese", "Yogurt", "Cream", "Ricotta cheese", "Parmesan cheese", "Parmesan cheese", "Gorgonzola cheese", "Cream cheese", "Swiss cheese", "Goat cheese", "Brie cheese", "Taleggio cheese", "Pecorino cheese"];
            break;

          case 'starchy':
            this.suggestionsList = ["Wheat flour", "Corn flour", "Rye flour", "Pasta", "Spaghetti", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Rice", "Bread", "Whole wheat bread", "Multigrain bread", "Rolls", "Biscuits", "Crackers", "Corn tortillas", "Cereals", "Oat flour", "Gnocchi", "Risotto", "Polenta", "Couscous"];
            break;

          case 'drinks':
            this.suggestionsList = ["Still water", "Sparkling water", "Fruit juice", "Coca cola", "Pepsi", "Orangeade", "Iced tea", "Bottled coffee", "Fruit juice", "Beer", "Red wine", "White wine", "Rosé wine", "Sparkling wine", "Prosecco", "Bitter", "Limoncello", "Vodka", "Gin", "Rum", "Whisky", "Tequila", "Aperol", "Spritz", "Campari"];
            break;

          case 'frozen foods':
            this.suggestionsList = ["Pizza", "Minestrone soup", "French fries", "Oven chips", "Nuggets", "Chicken croquettes", "Potato croquettes", "Mini calzones", "Ascolana olives", "Mozzarella croquettes", "Frozen fish", "Fillet", "Ice cream", "Ice pops", "Sorbet", "Croissant", "Fish sticks", "Sfogliatelle", "Burritos", "Frozen cake", "Legume soup"];
            break;

          case 'spices':
            this.suggestionsList = ["Black pepper", "Chili powder", "Garlic powder", "Parsley flakes", "Cumin", "Turmeric", "Paprika", "Oregano", "Cinnamon", "Nutmeg", "Ground ginger", "Cloves"];
            break;

          case 'hygiene':
            this.suggestionsList = ["Shampoo", "Conditioner", "Soap", "Toilet paper", "Intimate wash", "Toothpaste", "Toothbrush", "Dental floss", "Toothpaste", "Mouthwash", "Deodorant", "Degreaser", "Sanitizer", "Laundry detergent", "Dish detergent", "Sponges", "Trash bags", "Cleansing wipes", "Body moisturizer", "Razors", "Shaving foam", "Aftershave", "Facial tissues", "Cotton swabs", "Nail polish", "Perfume or cologne"];
            break;

          case 'medications':
            this.suggestionsList = ["Paracetamol", "Ibuprofen", "Aspirin", "Mosquito cream", "Cortisone", "Eye drops", "Muscle pain cream", "Painkiller", "Laxatives", "Thermometer", "Gauze pads", "Plasters", "Chlorphenamine", "Fiber-based laxatives", "Cetirizine", "Legal Cannabis", "Viagra"];
            break;

          case 'stationery':
            this.suggestionsList = ["Matite", "Pennarelli", "Ruler", "Evidenziatori", "Penne", "Colori", "Gomme per cancellare", "Blocchi di carta", "Quaderni", "Album per disegno", "Correttori", "Forbici", "Righelli", "Colla", "Nastro adesivo", "Cartelle", "Cartoncino", "Graffette", "Pinzatrice", "Ricariche pinzatrice", "Post-it"];
            break;

          case 'babies':
            this.suggestionsList = ["Diapers", "Bibs", "Wet wipes", "Baby formula", "Baby bottles", "Pacifier", "Baby lotion", "Talcum powder", "Moisturizing cream", "Gentle cleanser", "Baby bath foam", "Thermometer", "Baby pasta", "Baby cheese", "Baby food puree", "Breast pump", "Soft toys", "Corner protectors for furniture", "Anti-suffocation pillow", "High chair", "Sunscreen", "Diaper rash cream", "Changing table", "Stroller", "Pram", "Teething gel"];
            break;

          case 'electronics':
            this.suggestionsList = ["USB cables", "Earphones", "Light bulbs", "Television", "Coffee machine", "Smartphone cases", "SD memory cards", "Power adapters", "Vacuum cleaner", "Washing machine", "Dishwasher", "Dryer", "Pizza oven", "Smartphone chargers", "Earphones", "Bluetooth speakers", "Mouse", "Keyboard", "Power bank", "Food processor", "Robot vacuum cleaner", "LED torches", "Calculator", "LED reading lamps", "Headphones with microphone", "Webcam", "Mousepad", "Fan", "USB hub", "Wired keyboards", "Cordless phones", "PC speakers", "Car smartphone mounts"];
            break;

          case 'pets':
            this.suggestionsList = ["Dry food for cats/dogs", "Kibbles", "Wet food cans for cats/dogs", "Cat litter", "Snacks for cats/dogs", "Dog leash", "Muzzle", "Collar for dogs/cats", "Rubber toys", "Pet carriers", "Food and water bowls", "Combs and brushes for grooming", "Parasite control products", "Flea collar", "Tick repellent", "Pet bed", "Shampoo", "Conditioner", "Cat litter sanitizers", "Chew toys", "Hamster litter boxes", "Feeders", "Waterers", "Bird food", "Cages", "Fish snacks", "Turtle food", "Sunflower seeds"];
            break;

          case 'work tools':
            this.suggestionsList = ["Flathead screwdriver", "Phillips screwdriver", "Hammer", "Adjustable wrench", "Pliers", "Scissors", "Saw", "Spirit level", "Chisel", "Utility knife", "Shears", "Measuring tape", "Meter", "Adhesive tape", "Insulating tape", "Cable ties", "Nails", "Screws", "Bolts", "Trowel", "Paintbrush", "Spatula", "Hex key"];
            break;

          case 'clothes':
            this.suggestionsList = ["T-shirt", "Shirt", "Tank top", "Polo shirt", "Underwear", "Shirt", "Sweater", "Sweatshirt", "Jacket", "Coat", "Trousers", "Jeans", "Shorts", "Skirts", "Dress", "Work suit", "Pajamas", "Underwear", "Socks", "Thermal shirt", "Hat", "Gloves", "Shoes", "Sneakers", "Lingerie", "Garter belt", "Fishnet stockings", "Bra", "Thong"];
            break;

          case 'toys':
            this.suggestionsList = ["Dolls", "Toy cars", "Puzzles", "Building blocks", "Play kitchen set", "Soccer balls", "Painting and coloring sets", "Board games", "Tricycles", "Pokemon cards", "Magic cards", "Garden toys", "Science kits", "Toy trains", "Board games", "Cards", "Bicycle", "Electric scooter", "Remote control car", "Game boy", "Play station", "Xbox"];
            break;

          case 'furniture/decor':
            this.suggestionsList = ["Sofa", "Table", "Coffee table", "Carpet", "Chair", "Floor lamp", "Table lamp", "Shelf", "Bedside table", "Bed", "Desk", "Wall shelves", "Mirror", "Coat rack", "TV stand", "Wardrobe", "Ottoman", "Vase", "Picture frame", "Umbrella stand", "Decorative cushions", "Wall clock", "Painting", "Doormat"];
            break;

          case 'household objects':
            this.suggestionsList = ["Cutlery", "Forks", "Knives", "Spoons", "Plates", "Glasses", "Cups", "Pots", "Pans", "Baking trays", "Kitchen utensils", "Can opener", "Cutting board", "Food containers", "Broom", "Mirror", "Towel"];
            break;

          case 'gardening':
            this.suggestionsList = ["Gardening gloves", "Trowel", "Pruning shears", "Watering cans", "Garden hoses", "Rake", "Plant stakes", "Pot", "Saucer", "Fertilizer", "Seeds", "Plant soil", "Bucket", "Sprayer", "Garden pickaxes"];
            break;

          case 'other':
            this.suggestionsList = ["Eggs", "Snacks", "Energy bars", "Packaged chips", "Pretzels", "Chocolates", "Popcorn", "Soy sauce", "Barbecue sauce", "Ketchup", "Mayonnaise", "Dried fruit", "Breakfast cereals", "Batteries", "Lighter", "Parchment paper", "Aluminum foil", "Candles", "Rubber bands", "String"];
            break;


          default:
            break;
        }

      }
      // ------------------------------------------------------------- ITALIANO
      if (this.languages.langIta) {
        switch (categoryName) {
          case 'vegetali':
            this.suggestionsList = ["Carote", "Pomodori", "Patate", "Cipolle", "Zucchine", "Peperoni", "Cetrioli", "Melanzane", "Spinaci", "Lattuga", "Broccoli", "Cavolfiore", "Asparagi", "Fagiolini", "Sedano", "Finocchi", "Ravanelli", "Bietole", "Cavolo", "Zucca"];
            break;

          case 'carne':
            this.suggestionsList = ["Pollo", "Manzo", "Maiale", "Cotechino", "Salsiccia", "Agnello", "Anatra", "Vitello", "Coniglio", "Mortadella", "Salame", "Prosciutto cotto", "Prosciutto crudo", "Bresaola", "Fesa di tacchino", "Fesa di pollo", "Bacon", "Petto di pollo", "Coscia di pollo", "Sovracoscia di pollo", "Ali di pollo", "Filetto di manzo", "Controfiletto di manzo", "Costata di manzo", "Bistecca di manzo", "Fiorentina di manzo", "Sottofiletto di manzo", "Filetto di maiale", "Costine di maiale", "Lonza di maiale", "Spalla di maiale", "Coppa di maiale", "Stinco di maiale", "Braciole di maiale", "Lardo di maiale", "Guanciale di maiale"];
            break;

          case 'pesce':
            this.suggestionsList = ["Salmone", "Tonno", "Merluzzo", "Trota", "Orata", "Branzino", "Sogliola", "Platessa", "Pesce spada", "Seppia", "Merluzzo nero", "Acciuga", "Scampi", "Gamberetti", "Calamari", "Cozze", "Vongole", "Aragosta", "Granchio", "Sardine"];
            break;

          case 'frutta':
            this.suggestionsList = ["Mele", "Banane", "Arance", "Uva", "Fragole", "Limoni", "Pere", "Kiwi", "Pesche", "Ananas", "Mango", "Melone", "Mandarini", "Ciliegie", "Limette", "Avocado", "Lamponi", "Pompelmi", "Albicocche", "Melograni"];
            break;

          case 'dolci':
            this.suggestionsList = ["Zucchero", "Zucchero a velo", "Lievito in polvere", "Cioccolato", "Vaniglia", "Frutta fresca", "Panna montata", "Gelatina", "Cacao in polvere", "Amido di mais", "Sciroppo di mais", "Yogurt", "Marmellata", "Glassa", "Tiramisù", "Millefoglie", "Cheesecake", "Marmellata", "Nutella", "Miele"];
            break;

          case 'latticini':
            this.suggestionsList = ["Mozzarella", "Latte", "Burro", "Formaggio cheddar", "Yogurt", "Panna", "Ricotta", "Formaggio grana", "Parmigiano reggiano", "Gorgonzola", "Formaggio Philadelphia", "Formaggio svizzero", "Formaggio di capra", "Brie", "Taleggio", "Pecorino"];
            break;

          case 'farinacei':
            this.suggestionsList = ["Farina di grano", "Farina di mais", "Farina di segale", "Pasta", "Spaghetti", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Riso", "Pane", "Pane integrale", "Pane ai cereali", "Panini", "Biscotti", "Crackers", "Tortillas di mais", "Cereali", "Farina di avena", "Gnocchi", "Risotto", "Polenta", "Couscous"];
            break;

          case 'bevande':
            this.suggestionsList = ["Acqua naturale", "Acqua frizzante", "Succo di frutta", "Coca cola", "Pepsi", "Aranciata", "Tè freddo", "Caffè in bottiglia", "Succo di frutta", "Birra", "Vino rosso", "Vino bianco", "Vino rosato", "Spumante", "Prosecco", "Amaro", "Limoncello", "Vodka", "Gin", "Rum", "Whisky", "Tewuila", "Aperol", "Spritz", "Campari"];
            break;

          case 'surgelati':
            this.suggestionsList = ["Gelato", "Ghiaccioli", "Pizza", "Minestrone", "Patatine fritte", "Patatine al forno", "Nuggets", "Crocchette di pollo", "Crocchette di patate", "Panzerottini", "Olive ascolane", "Crocchette di mozzarella", "Pesce surgelato", "Filetto", "Sorbetto", "Croissant", "Bastoncini di pesce", "Sfogliatelle", "Burritos", "Torta surgelata", "Minestra di legumi"];
            break;

          case 'spezie':
            this.suggestionsList = ["Pepe nero", "Peperoncino in polvere", "Aglio in polvere", "Prezzemolo in polvere", "Cumino", "Curcuma", "Paprika", "Origano", "Cannella", "Noce moscata", "Zenzero in polvere", "Chiodi di garofano"];
            break;

          case 'igiene':
            this.suggestionsList = ["Shampoo", "Balsamo", "Sapone", "Carta igienica", "Detergente intimo", "Dentifricio", "Spazzolino da denti", "Filo interdentale", "Dentifricio", "Collutorio", "Deodorante", "Sgrassatore", "Igienizzante", "Detersivo lavatrice", "Detersivo piatti", "Spugne", "Buste immondizia", "Salviettine detergenti", "Crema idratante per il corpo", "Rasoi", "Schiuma da barba", "Dopo barba", "Fazzoletti di carta", "Cotton fioc", "Smalto per unghie", "Profumo o colonia"];
            break;

          case 'farmaci':
            this.suggestionsList = ["Paracetamolo", "Ibuprofene", "Aspirina", "Pomata per zanzare", "Cortisone", "Collirio", "Pomata per dolori muscolari", "Antidolorifico", "Lassativi", "Termometro", "Garze", "Cerotti", "Clorfenamina", "Lassativi a base di fibra", "Cetirizina", "Cannabis Legale", "Viagra"];
            break;

          case 'cancelleria':
            this.suggestionsList = ["Matite", "Pennarelli", "Righello", "Evidenziatori", "Penne", "Colori", "Gomme per cancellare", "Blocchi di carta", "Quaderni", "Album per disegno", "Correttori", "Forbici", "Righelli", "Colla", "Nastro adesivo", "Cartelle", "Cartoncino", "Graffette", "Pinzatrice", "Ricariche pinzatrice", "Post-it"];
            break;

          case 'bimbi':
            this.suggestionsList = ["Pannolini", "Bavette", "Salviettine umidificate", "Latte in polvere", "Biberon", "Ciuccio", "Balsamo per la pelle", "Talco", "Crema idratante", "Detergente delicato", "Bagnetto schiuma", "Termometro", "Pastina", "Formaggino", "Omogeneizzati", "Tiralatte", "Giocattoli morbidi", "Proteggi-spigoli per mobili", "Cuscino anti-soffocamento", "Seggiolone", "Protezione solare", "Pomata per irritazioni", "Fasciatoio", "Passeggino", "Carrozzina", "Pomata per gengive"];
            break;

          case 'elettronica':
            this.suggestionsList = ["Cavi USB", "Auricolari", "Lampadine", "Televisore", "Macchina per caffè", "Custodie per smartphone", "Schede di memoria SD", "Adattatori di alimentazione", "Aspirapolvere", "Lavatrice", "Lavastoviglie", "Asciugatrice", "Fornetto pizza", "Caricabatterie per smartphone", "Auricolari", "Altoparlanti Bluetooth", "Mouse", "Tastiera", "Power bank", "Robot da cucina", "Robot aspirapolvere", "Torce a LED", "Calcolatrice", "Lampade da lettura a LED", "Cuffie con microfono", "Webcam", "Mousepad", "Ventilatore", "Hub USB", "Tastiere con filo", "Telefoni cordless", "Altoparlanti per PC", "Supporti per smartphone per auto"];
            break;

          case 'animali':
            this.suggestionsList = ["Cibo secco per gatti/cani", "Croccantini", "Scatolette di cibo umido per gatti/cani", "Lettiera per gatti", "Snack per gatti/cani", "Guinzaglio per cani", "Museruola", "Collare per cani/gatti", "Giochi di gomma", "Trasportini per animali", "Ciotole per cibo e acqua", "Pettini e spazzole per la cura del pelo", "Antiparassitari", "Collare per pulci", "Anti zecche", "Lettino", "Shampoo", "Balsamo", "Igienizzanti per la lettiera dei gatti", "Giochi per masticare", "Lettiere per Criceti", "Mangiatoie", "Abbeveratoio", "Cibo per uccelli", "Gabbiette", "Snack per pesci", "Cibo per tartaruga", "Semi di girasole"];
            break;

          case 'attrezzi':
            this.suggestionsList = ["Cacciavite piatto", "Cacciavite a croce", "Martello", "Chiave inglese", "Pinze", "Forbici", "Sega", "Livella a bolla d'aria", "Scalpello", "Taglierino", "Cesoia", "Nastro metrico", "Metro", "Nastro adesivo", "Nastro isolante", "Fascette", "Chiodi", "Viti", "Bulloni", "Cazzuola", "Pennello per pittura", "Spatola", "Chiave a brugola"];
            break;

          case 'vestiti':
            this.suggestionsList = ["T-shirt", "Maglietta", "Canottiera", "Polo", "Mutande", "Camicia", "Maglione", "Felpa", "Giacca", "Cappotto", "Pantaloni", "Jeans", "Pantaloncini", "Gonne", "Vestito", "Completo da lavoro", "Pigiama", "Intimo", "Calze", "Maglia termica", "Cappello", "Guanti", "Scarpe", "Scarpe da ginnastica", "Lingerie", "Reggi calze", "Calze a rete", "Reggiseno", "Perizoma"];
            break;

          case 'giocattoli':
            this.suggestionsList = ["Bambole", "Macchinine", "Puzzle", "Blocchi di costruzione", "Set da gioco da cucina", "Palloni da calcio", "Set di pittura e colori", "Giochi da tavolo", "Tricicli", "Carte pokemon", "Carte magic", "Giochi per l'orto", "Giochi scientifici", "Trenini", "Giochi di società", "Carte", "Bicicletta", "Motoretta elettrica", "Auto radiocomandata", "Game boy", "Play station", "Xbox"];
            break;

          case 'arredamento':
            this.suggestionsList = ["Divano", "Tavolo", "Tavolino", "Tappeto", "Sedia", "Lampada da terra", "Lampada da tavolo", "Scaffale", "Comodino", "Letto", "Scrivania", "Scaffali a muro", "Specchio", "Appendiabiti", "Mobile TV", "Armadio", "Pouf", "Vaso", "Cornice per foto", "Portaombrelli", "Cuscini decorativi", "Orologio da parete", "Quadro", "Zerbino"];
            break;

          case 'oggetti domestici':
            this.suggestionsList = ["Posate", "Forchette", "Coltelli", "Cucchiai", "Piatti", "Bicchieri", "Tazze", "Pentole", "Padelle", "Teglie da forno", "Mestoli", "Apriscatole", "Tagliere", "Contenitori per alimenti", "Scopa", "Specchio", "Asciugamano"];
            break;

          case 'giardinaggio':
            this.suggestionsList = ["Guanti da giardinaggio", "Zappetta", "Forbici da potatura", "Annaffiatoi", "Tubi da giardino", "Rastrello", "Paletti per le piante", "Vaso", "Sottovaso", "Concime", "Sementi", "Terreno per piante", "Secchio", "Spruzzatore", "Picconi da giardino"];
            break;

          case 'altro':
            this.suggestionsList = ["Uova", "Snack", "Barrette energetiche", "Patatine confezionate", "Salatini", "Cioccolatini", "Popcorn", "Salsa di soia", "Salsa barbecue", "ketchup", "Maionese", "Frutta secca", "Cereali per la colazione", "Pile", "Accendino", "Carta da forno", "Fogli di alluminio", "Candele", "Elastici", "Spago"];
            break;

          default:
            break;
        }

      }
      // ------------------------------------------------------------- SPAGNOLO
      if (this.languages.langSpanish) {
        switch (categoryName) {
          case 'verduras':
            this.suggestionsList = ["Zanahorias", "Tomates", "Patatas", "Cebollas", "Calabacines", "Pimientos", "Pepinos", "Berenjenas", "Espinacas", "Lechuga", "Brócoli", "Coliflor", "Espárragos", "Judías verdes", "Apio", "Hinojo", "Rábanos", "Acelgas", "Col", "Calabaza"];
            break;

          case 'carnes':
            this.suggestionsList = ["Pollo", "Ternera", "Cerdo", "Cotechino", "Salchicha", "Cordero", "Pato", "Ternera", "Conejo", "Mortadela", "Salami", "Jamón cocido", "Jamón crudo", "Bresaola", "Pechuga de pavo", "Pechuga de pollo", "Tocino", "Pechuga de pollo", "Muslo de pollo", "Contramuslo de pollo", "Alas de pollo", "Solomillo de ternera", "Lomo de ternera", "Costilla de ternera", "Bistec de ternera", "Chuleta de ternera", "Lomo de ternera", "Solomillo de cerdo", "Costillas de cerdo", "Lomo de cerdo", "Paletilla de cerdo", "Cuello de cerdo", "Codillo de cerdo", "Chuletas de cerdo", "Lardo de cerdo", "Carrillera de cerdo"];
            break;

          case 'pescado':
            this.suggestionsList = ["Salmón", "Atún", "Bacalao", "Trucha", "Dorada", "Branzino", "Lenguado", "Platija", "Pez espada", "Sepia", "Bacalao negro", "Anchoa", "Langostino", "Camarón", "Calamar", "Mejillones", "Almejas", "Langosta", "Cangrejo", "Sardinas"];
            break;

          case 'fruta':
            this.suggestionsList = ["Manzanas", "Plátanos", "Naranjas", "Uvas", "Fresas", "Limones", "Peras", "Kiwi", "Duraznos", "Piñas", "Mangos", "Melones", "Mandarinas", "Cerezas", "Limones", "Aguacate", "Frambuesas", "Toronjas", "Albaricoques", "Granadas"];
            break;

          case 'dulces':
            this.suggestionsList = ["Azúcar", "Azúcar glas", "Levadura en polvo", "Chocolate", "Vainilla", "Fruta fresca", "Nata montada", "Gelatina", "Cacao en polvo", "Maicena", "Jarabe de maíz", "Yogur", "Mermelada", "Glaseado", "Tiramisú", "Milhojas", "Tarta de queso", "Mermelada", "Nutella", "Miel"];
            break;

          case 'lácteos':
            this.suggestionsList = ["Mozzarella", "Leche", "Mantequilla", "Queso cheddar", "Yogur", "Nata", "Ricotta", "Queso parmesano", "Queso parmesano", "Queso gorgonzola", "Queso crema", "Queso suizo", "Queso de cabra", "Queso brie", "Queso taleggio", "Queso pecorino"];
            break;

          case 'harina':
            this.suggestionsList = ["Harina de trigo", "Harina de maíz", "Harina de centeno", "Pasta", "Espaguetis", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Arroz", "Pan", "Pan integral", "Pan multicereal", "Panecillos", "Galletas", "Crackers", "Tortillas de maíz", "Cereales", "Harina de avena", "Gnocchi", "Risotto", "Polenta", "Cuscús"];
            break;

          case 'bebidas':
            this.suggestionsList = ["Agua mineral", "Agua con gas", "Zumo de frutas", "Coca cola", "Pepsi", "Naranjada", "Té helado", "Café embotellado", "Zumo de frutas", "Cerveza", "Vino tinto", "Vino blanco", "Vino rosado", "Cava", "Prosecco", "Amaro", "Limoncello", "Vodka", "Ginebra", "Ron", "Whisky", "Tequila", "Aperol", "Spritz", "Campari"];
            break;

          case 'congelados':
            this.suggestionsList = ["Pizza", "Sopa minestrone", "Patatas fritas", "Patatas al horno", "Nuggets", "Croquetas de pollo", "Croquetas de patata", "Panzerottini", "Aceitunas ascolanas", "Croquetas de mozzarella", "Pescado congelado", "Filete", "Helado", "Polos", "Sorbete", "Croissant", "Palitos de pescado", "Sfogliatelle", "Burritos", "Tarta congelada", "Sopa de legumbres"];
            break;

          case 'especias':
            this.suggestionsList = ["Pimienta negra", "Pimentón", "Ajo en polvo", "Perejil en hojuelas", "Comino", "Cúrcuma", "Pimentón", "Orégano", "Canela", "Nuez moscada", "Jengibre molido", "Clavos de olor"];
            break;

          case 'higiene':
            this.suggestionsList = ["Champú", "Acondicionador", "Jabón", "Papel higiénico", "Limpieza íntima", "Pasta de dientes", "Cepillo de dientes", "Hilo dental", "Pasta de dientes", "Enjuague bucal", "Desodorante", "Desengrasante", "Desinfectante", "Detergente para la ropa", "Detergente para platos", "Esponjas", "Bolsas de basura", "Toallitas limpiadoras", "Hidratante corporal", "Maquinillas de afeitar", "Espuma de afeitar", "After shave", "Pañuelos faciales", "Hisopos de algodón", "Esmalte de uñas", "Perfume o colonia"];
            break;

          case 'medicamentos':
            this.suggestionsList = ["Paracetamol", "Ibuprofeno", "Aspirina", "Crema para mosquitos", "Cortisona", "Colirio", "Crema para el dolor muscular", "Analgésico", "Laxantes", "Termómetro", "Gasas", "Apósitos", "Clorfenamina", "Laxantes a base de fibra", "Cetirizina", "Cannabis legal", "Viagra"];
            break;

          case 'papelería':
            this.suggestionsList = ["Lápices", "Marcadores", "Regla", "Resaltadores", "Bolígrafos", "Pinturas", "Gomas de borrar", "Bloques de papel", "Cuadernos", "Álbumes para dibujo", "Correctores", "Tijeras", "Reglas", "Pegamento", "Cinta adhesiva", "Carpetas", "Cartulina", "Grapas", "Grapadora", "Recargas de grapas", "Notas Post-it"];
            break;

          case 'niños':
            this.suggestionsList = ["Pañales", "Baberos", "Toallitas húmedas", "Fórmula para bebés", "Biberones", "Chupete", "Loción para bebés", "Talco", "Crema hidratante", "Limpiador suave", "Espuma de baño para bebés", "Termómetro", "Pasta para bebés", "Queso para bebés", "Puré de comida para bebés", "Extractor de leche", "Juguetes blandos", "Protectores de esquinas para muebles", "Almohada antiasfixia", "Trona", "Protector solar", "Crema para pañalitis", "Cambiador", "Cochecito", "Carriola", "Gel para la dentición"];
            break;

          case 'electrónica':
            this.suggestionsList = ["Cables USB", "Auriculares", "Bombillas", "Televisor", "Máquina de café", "Funda para smartphone", "Tarjetas de memoria SD", "Adaptadores de corriente", "Aspiradora", "Lavadora", "Lavavajillas", "Secadora", "Horno para pizza", "Cargadores de smartphone", "Auriculares", "Altavoces Bluetooth", "Ratón", "Teclado", "Batería externa", "Robot de cocina", "Robot aspirador", "Linternas LED", "Calculadora", "Lámparas de lectura LED", "Auriculares con micrófono", "Cámara web", "Mousepad", "Ventilador", "Concentrador USB", "Teclados con cable", "Teléfonos inalámbricos", "Altavoces para PC", "Soportes para smartphone para automóvil"];
            break;

          case 'animales':
            this.suggestionsList = ["Comida seca para gatos/perros", "Croquetas", "Latas de comida húmeda para gatos/perros", "Arena para gatos", "Snacks para gatos/perros", "Correa para perros", "Bozal", "Collar para perros/gatos", "Juguetes de goma", "Transportines para mascotas", "Cuencos para comida y agua", "Peines y cepillos para el cuidado del pelaje", "Productos para el control de parásitos", "Collar antipulgas", "Repelente de garrapatas", "Cama para mascotas", "Champú", "Acondicionador", "Desinfectantes para arena de gatos", "Juguetes para masticar", "Bandejas de arena para hámsters", "Comederos", "Bebederos", "Comida para pájaros", "Jaulas", "Snacks para peces", "Comida para tortugas", "Semillas de girasol"];
            break;

          case 'herramientas':
            this.suggestionsList = ["Destornillador de cabeza plana", "Destornillador Phillips", "Martillo", "Llave ajustable", "Alicates", "Tijeras", "Sierra", "Nivel de burbuja", "Cincel", "Cúter", "Tijeras de hojalatero", "Cinta métrica", "Metro", "Cinta adhesiva", "Cinta aislante", "Correas de cables", "Clavos", "Tornillos", "Pernos", "Paleta de albañil", "Brocha", "Espátula", "Llave Allen"];
            break;

          case 'ropa':
            this.suggestionsList = ["Camiseta", "Playera", "Camiseta de tirantes", "Polo", "Ropa interior", "Camisa", "Suéter", "Sudadera", "Chaqueta", "Abrigo", "Pantalones", "Jeans", "Shorts", "Faldas", "Vestido", "Traje de trabajo", "Pijama", "Ropa interior", "Calcetines", "Camiseta térmica", "Sombrero", "Guantes", "Zapatos", "Zapatillas", "Ropa interior femenina", "Liguero", "Medias de red", "Sostén", "Tanga"];
            break;

          case 'juguetes':
            this.suggestionsList = ["Muñecas", "Coches de juguete", "Rompecabezas", "Bloques de construcción", "Juego de cocina de juguete", "Balones de fútbol", "Sets de pintura y colores", "Juegos de mesa", "Triciclos", "Cartas Pokémon", "Cartas mágicas", "Juguetes de jardín", "Kits científicos", "Trenes de juguete", "Juegos de mesa", "Cartas", "Bicicleta", "Patinete eléctrico", "Coche de control remoto", "Game boy", "Play station", "Xbox"];
            break;

          case 'mobiliario':
            this.suggestionsList = ["Sofá", "Mesa", "Mesa de centro", "Tapete", "Silla", "Lámpara de pie", "Lámpara de mesa", "Estantería", "Mesita de noche", "Cama", "Escritorio", "Estanterías de pared", "Espejo", "Perchero", "Mueble de televisión", "Armario", "Puf", "Jarrón", "Marco de fotos", "Paragüero", "Cojines decorativos", "Reloj de pared", "Cuadro", "Felpudo"];
            break;

          case 'objetos domésticos':
            this.suggestionsList = ["Cubertería", "Tenedores", "Cuchillos", "Cucharas", "Platos", "Vasos", "Tazas", "Ollas", "Sartenes", "Bandejas para hornear", "Utensilios de cocina", "Abre latas", "Tabla de cortar", "Recipientes para alimentos", "Escoba", "Espejo", "Toalla"];
            break;

          case 'jardinería':
            this.suggestionsList = ["Guantes de jardinería", "Azada", "Tijeras de podar", "Regaderas", "Mangueras de jardín", "Rastrillo", "Estacas para plantas", "Maceta", "Plato para maceta", "Fertilizante", "Semillas", "Tierra para plantas", "Cubo", "Pulverizador", "Picos de jardín"];
            break;

          case 'otros':
            this.suggestionsList = ["Huevos", "Aperitivos", "Barras energéticas", "Patatas fritas envasadas", "Galletas saladas", "Chocolates", "Palomitas", "Salsa de soja", "Salsa barbacoa", "Ketchup", "Mayonesa", "Frutos secos", "Cereales para el desayuno", "Pilas", "Encendedor", "Papel de horno", "Papel de aluminio", "Velas", "Bandas elásticas", "Cuerda"];
            break;

          default:
            break;
        }
      }
    },
    addTip(tip) {
      this.todosStore.addTodo(tip);
      this.suggestionsModal = false;
    }
  }
});