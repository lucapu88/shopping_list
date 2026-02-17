import { defineStore } from 'pinia';

export const useFrenchSuggStoreStore = defineStore('french', {
    state: () => ({
        legumes: ["Carottes", "Tomates", "Pommes de terre", "Oignons", "Courgettes", "Poivrons", "Concombres", "Aubergines", "Épinards", "Laitue", "Brocoli", "Chou-fleur", "Asperges", "Haricots verts", "Céleri", "Fenouil", "Radis", "Bette", "Chou", "Citrouille"],

        viande: ["Poulet", "Bœuf", "Porc", "Cotechino", "Saucisse", "Agneau", "Canard", "Veau", "Lapin", "Mortadelle", "Salami", "Jambon cuit", "Prosciutto", "Bresaola", "Poitrine de dinde", "Blanc de poulet", "Burger de poulet", "Burger de dinde", "Burger de veau", "Bacon", "Filet de bœuf", "Contre-filet de bœuf", "Côte de bœuf", "Steak de bœuf", "T-bone", "Filet de bœuf", "Filet de porc", "Côtes de porc", "Longe de porc", "Épaule de porc", "Cou de porc", "Jarret de porc", "Côtelettes de porc", "Lard de porc", "Joue de porc"],

        poisson: ["Saumon", "Thon", "Cabillaud", "Truite", "Daurade", "Bar", "Sole", "Limande", "Espadon", "Seiche", "Morue noire", "Anchois", "Langoustines", "Crevettes", "Calamars", "Moules", "Palourdes", "Homard", "Crabe", "Sardines"],

        fruit: ["Pommes", "Bananes", "Oranges", "Raisins", "Fraises", "Citrons", "Poires", "Kiwi", "Pêches", "Ananas", "Mangues", "Melons", "Mandarines", "Cerises", "Citrons verts", "Avocats", "Framboises", "Pamplemousses", "Abricots", "Grenades"],

        sucreries: ["Sucre", "Sucre glace", "Levure chimique", "Chocolat", "Vanille", "Fruits frais", "Crème chantilly", "Gélatine", "Cacao en poudre", "Fécule de maïs", "Sirop de maïs", "Yaourt", "Confiture", "Glaçage", "Tiramisu", "Millefeuille", "Cheesecake", "Nutella", "Miel"],

        laitages: ["Mozzarella", "Lait", "Beurre", "Fromage cheddar", "Yaourt", "Crème", "Ricotta", "Parmesan", "Gorgonzola", "Fromage frais", "Fromage suisse", "Fromage de chèvre", "Brie", "Taleggio", "Pecorino"],

        amidon: ["Farine de blé", "Farine de maïs", "Farine de seigle", "Pâtes", "Spaghetti", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Riz", "Pain", "Pain complet", "Pain multigrains", "Petits pains", "Biscuits", "Crackers", "Tortillas de maïs", "Céréales", "Farine d’avoine", "Gnocchis", "Risotto", "Polenta", "Couscous"],

        boissons: ["Eau plate", "Eau gazeuse", "Jus de fruits", "Coca cola", "Pepsi", "Orangeade", "Thé glacé", "Café en bouteille", "Bière", "Vin rouge", "Vin blanc", "Vin rosé", "Vin pétillant", "Prosecco", "Bitter", "Limoncello", "Vodka", "Gin", "Rhum", "Whisky", "Tequila", "Aperol", "Spritz", "Campari"],

        surgeles: ["Pizza", "Soupe minestrone", "Frites", "Pommes de terre au four", "Nuggets", "Croquettes de poulet", "Croquettes de pommes de terre", "Mini calzones", "Olives ascolane", "Croquettes de mozzarella", "Poisson surgelé", "Filet", "Glace", "Glaces à l’eau", "Sorbet", "Croissant", "Bâtonnets de poisson", "Sfogliatelle", "Burritos", "Gâteau surgelé", "Soupe de légumineuses"],

        epices: ["Poivre noir", "Piment en poudre", "Ail en poudre", "Persil séché", "Cumin", "Curcuma", "Paprika", "Origan", "Cannelle", "Muscade", "Gingembre moulu", "Clous de girofle"],

        hygiene: ["Shampooing", "Après-shampooing", "Savon", "Papier toilette", "Savon intime", "Dentifrice", "Brosse à dents", "Fil dentaire", "Bain de bouche", "Déodorant", "Dégraissant", "Désinfectant", "Lessive", "Liquide vaisselle", "Éponges", "Sacs poubelle", "Lingettes", "Crème hydratante", "Rasoirs", "Mousse à raser", "Après-rasage", "Mouchoirs", "Coton-tiges", "Vernis à ongles", "Parfum", "Serviettes hygiéniques"],

        medicaments: ["Aspirine", "Statine", "Paracétamol", "Ibuprofène", "Crème anti-moustique", "Cortisone", "Gouttes pour les yeux", "Crème musculaire", "Antidouleur", "Laxatifs", "Thermomètre", "Compresses", "Pansements", "Chlorphénamine", "Laxatifs à base de fibres", "Cétirizine", "Cannabis légal", "Viagra"],

        papeterie: ["Crayons", "Feutres", "Règle", "Surligneurs", "Stylos", "Couleurs", "Gommes", "Blocs-notes", "Cahiers", "Albums de dessin", "Correcteur", "Ciseaux", "Rubans adhésifs", "Colle", "Ruban adhésif", "Dossiers", "Carton épais", "Trombones", "Agrafeuse", "Recharges agrafeuse", "Post-it"],

        bebes: ["Couches", "Bavoirs", "Lingettes", "Lait infantile", "Biberons", "Tétine", "Lotion bébé", "Talc", "Crème hydratante", "Nettoyant doux", "Mousse de bain bébé", "Thermomètre", "Pâtes bébé", "Fromage bébé", "Purée bébé", "Tire-lait", "Peluche", "Protège-angles", "Oreiller anti-suffocation", "Chaise haute", "Crème solaire", "Crème pour érythème", "Table à langer", "Poussette", "Landau", "Gel dentition"],

        electronique: ["Câbles USB", "Écouteurs", "Ampoules", "Télévision", "Machine à café", "Coques de smartphone", "Cartes mémoire SD", "Adaptateurs secteur", "Aspirateur", "Lave-linge", "Lave-vaisselle", "Sèche-linge", "Four à pizza", "Chargeurs smartphone", "Écouteurs", "Haut-parleurs Bluetooth", "Souris", "Clavier", "Batterie externe", "Robot culinaire", "Robot aspirateur", "Lampes torches LED", "Calculatrice", "Lampes de lecture LED", "Casque avec micro", "Webcam", "Tapis de souris", "Ventilateur", "Hub USB", "Claviers filaires", "Téléphones sans fil", "Haut-parleurs PC", "Supports voiture smartphone"],

        animaux: ["Croquettes", "Croquettes", "Boîtes pour chats/chiens", "Litière pour chat", "Snacks pour chats/chiens", "Laisse", "Muselière", "Collier", "Jouets en caoutchouc", "Caisses de transport", "Gamelles", "Peignes et brosses", "Anti-parasites", "Collier anti-puces", "Anti-tiques", "Panier", "Shampooing", "Après-shampooing", "Désodorisant litière", "Jouets à mâcher", "Bac à litière hamster", "Distributeurs", "Abreuvoirs", "Nourriture oiseaux", "Cages", "Snacks poissons", "Nourriture tortues", "Graines de tournesol"],

        materiel: ["Tournevis plat", "Tournevis cruciforme", "Marteau", "Clé réglable", "Pince", "Ciseaux", "Scie", "Niveau", "Ciseau", "Cutter", "Sécateur", "Mètre ruban", "Mètre", "Ruban adhésif", "Ruban isolant", "Colsons", "Clous", "Vis", "Boulons", "Truelle", "Pinceau", "Spatule", "Clé hexagonale"],

        vetements: ["T-shirt", "Chemise", "Débardeur", "Polo", "Sous-vêtements", "Chemise", "Pull", "Sweat-shirt", "Veste", "Manteau", "Pantalon", "Jeans", "Short", "Jupe", "Robe", "Combinaison de travail", "Pyjama", "Sous-vêtements", "Chaussettes", "T-shirt thermique", "Chapeau", "Gants", "Chaussures", "Baskets", "Lingerie", "Porte-jarretelles", "Bas résille", "Soutien-gorge", "String"],

        jouets: ["Poupées", "Voitures miniatures", "Puzzles", "Blocs de construction", "Cuisine jouet", "Ballon de football", "Sets de peinture", "Jeux de société", "Tricycles", "Cartes Pokémon", "Cartes Magic", "Jeux de jardin", "Kits scientifiques", "Trains jouets", "Jeux de société", "Cartes", "Vélo", "Trottinette électrique", "Voiture télécommandée", "Game boy", "PlayStation", "Xbox"],

        meubles: ["Canapé", "Table", "Table basse", "Tapis", "Chaise", "Lampe sur pied", "Lampe de table", "Étagère", "Table de chevet", "Lit", "Bureau", "Étagères murales", "Miroir", "Portemanteau", "Meuble TV", "Armoire", "Pouf", "Vase", "Cadre", "Porte-parapluie", "Coussins décoratifs", "Horloge murale", "Tableau", "Paillasson"],

        maison: ["Couverts", "Fourchettes", "Couteaux", "Cuillères", "Assiettes", "Verres", "Tasses", "Casseroles", "Poêles", "Plaques de cuisson", "Ustensiles de cuisine", "Ouvre-boîtes", "Planche à découper", "Boîtes alimentaires", "Balai", "Miroir", "Serviette"],

        jardinage: ["Gants de jardinage", "Truelle", "Sécateur", "Arrosoirs", "Tuyaux d’arrosage", "Râteau", "Tuteurs", "Pot", "Soucoupe", "Engrais", "Graines", "Terreau", "Seau", "Pulvérisateur", "Pioche de jardin"],

        enLigne: ["En ligne, on peut acheter de tout, donc il serait difficile de faire des suggestions spécifiques car tout peut être acheté dans les autres catégories."],

        sportive: ["Chaussures de course", "Tapis de course", "Ballon de football", "Ballon de basket", "Ballon de volley", "Ballon de rugby", "Balles de tennis", "Balles de golf", "Balles de ping-pong", "Raquette de tennis", "Raquette de ping-pong", "Clubs de golf", "Gants de boxe", "Sacs de frappe", "Vélo de route", "Survêtement", "Haltères", "Casque de vélo", "Lunettes de natation", "Step", "Corde à sauter", "Protège-tibias football", "Batte de baseball"],

        beaute: ["Rouge à lèvres", "Fond de teint", "Mascara", "Eyeliner", "Poudre", "Blush", "Vernis à ongles", "Crème hydratante", "Tonique visage", "Nettoyant visage", "Huile capillaire", "Shampooing", "Après-shampooing", "Parfum", "Gommage corps"],

        autre: ["Sel", "Œufs", "Snacks", "Bicarbonate", "Café moulu", "Capsules de café", "Barres énergétiques", "Chips emballées", "Bretzels", "Chocolats", "Popcorn", "Sauce soja", "Sauce barbecue", "Ketchup", "Mayonnaise", "Fruits secs", "Céréales petit-déjeuner", "Piles", "Briquet", "Papier sulfurisé", "Papier aluminium", "Bougies", "Élastiques", "Ficelle"],

        cadeauxDeNoel: ["Nous ne pensons pas pouvoir donner des suggestions pour cette catégorie car elle est trop subjective.",
            "Cependant, nous vous souhaitons un joyeux Noël avec votre famille, qu’elle soit de sang ou de cœur.",
            "C’est le plus beau cadeau... JOYEUX NOËL !"],
    }),
    getters: {},
    actions: {}
});
