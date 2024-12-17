import { defineStore } from 'pinia';

export const useEnglishSuggStoreStore = defineStore('english', {
    state: () => ({
        vegetables: ["Carrots", "Tomatoes", "Potatoes", "Onions", "courgettes", "Bell peppers", "Cucumbers", "Eggplants", "Spinach", "Lettuce", "Broccoli", "Cauliflower", "Asparagus", "Green beans", "Celery", "Fennel", "Radishes", "Swiss chard", "Cabbage", "Pumpkin"],

        meat: ["Chicken", "Beef", "Pork", "Cotechino", "Sausage", "Lamb", "Duck", "Veal", "Rabbit", "Mortadella", "Salami", "Cooked ham", "Prosciutto", "Bresaola", "Turkey breast", "Chicken breast", "Chicken burger", "Turkey burger", "Veal burger", "Bacon", "Chicken breast", "Chicken thigh", "Chicken drumstick", "Chicken wings", "Beef fillet", "Beef sirloin", "Beef rib", "Beef steak", "T-bone steak", "Beef tenderloin", "Pork fillet", "Pork ribs", "Pork loin", "Pork shoulder", "Pork neck", "Pork shank", "Pork chops", "Pork lard", "Pork jowl"],

        fish: ["Salmon", "Tuna", "Cod", "Trout", "Sea Bream", "Sea Bass", "Sole", "Flounder", "Swordfish", "Cuttlefish", "Black Cod", "Anchovy", "Langoustine", "Shrimp", "Squid", "Mussels", "Clams", "Lobster", "Crab", "Sardines"],

        fruit: ["Apples", "Bananas", "Oranges", "Grapes", "Strawberries", "Lemons", "Pears", "Kiwi", "Peaches", "Pineapples", "Mangoes", "Melons", "Tangerines", "Cherries", "Limes", "Avocado", "Raspberries", "Grapefruits", "Apricots", "Pomegranates"],

        sweets: ["Sugar", "Icing sugar", "Baking powder", "Chocolate", "Vanilla", "Fresh fruit", "Whipped cream", "Gelatin", "Cocoa powder", "Cornstarch", "Corn syrup", "Yogurt", "Jam", "Glaze", "Tiramisu", "Millefeuille", "Cheesecake", "Nutella", "Honey"],

        dairyProducts: ["Mozzarella", "Milk", "Butter", "Cheddar cheese", "Yogurt", "Cream", "Ricotta cheese", "Parmesan cheese", "Parmesan cheese", "Gorgonzola cheese", "Cream cheese", "Swiss cheese", "Goat cheese", "Brie cheese", "Taleggio cheese", "Pecorino cheese"],

        starchy: ["Wheat flour", "Corn flour", "Rye flour", "Pasta", "Spaghetti", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Rice", "Bread", "Whole wheat bread", "Multigrain bread", "Rolls", "Biscuits", "Crackers", "Corn tortillas", "Cereals", "Oat flour", "Gnocchi", "Risotto", "Polenta", "Couscous"],

        drinks: ["Still water", "Sparkling water", "Fruit juice", "Coca cola", "Pepsi", "Orangeade", "Iced tea", "Bottled coffee", "Fruit juice", "Beer", "Red wine", "White wine", "Rosé wine", "Sparkling wine", "Prosecco", "Bitter", "Limoncello", "Vodka", "Gin", "Rum", "Whisky", "Tequila", "Aperol", "Spritz", "Campari"],

        frozenFoods: ["Pizza", "Minestrone soup", "French fries", "Oven chips", "Nuggets", "Chicken croquettes", "Potato croquettes", "Mini calzones", "Ascolana olives", "Mozzarella croquettes", "Frozen fish", "Fillet", "Ice cream", "Ice pops", "Sorbet", "Croissant", "Fish sticks", "Sfogliatelle", "Burritos", "Frozen cake", "Legume soup"],

        spices: ["Black pepper", "Chili powder", "Garlic powder", "Parsley flakes", "Cumin", "Turmeric", "Paprika", "Oregano", "Cinnamon", "Nutmeg", "Ground ginger", "Cloves"],

        hygiene: ["Shampoo", "Conditioner", "Soap", "Toilet paper", "Intimate wash", "Toothpaste", "Toothbrush", "Dental floss", "Toothpaste", "Mouthwash", "Deodorant", "Degreaser", "Sanitizer", "Laundry detergent", "Dish detergent", "Sponges", "Trash bags", "Cleansing wipes", "Body moisturizer", "Razors", "Shaving foam", "Aftershave", "Facial tissues", "Cotton swabs", "Nail polish", "Perfume or cologne"],

        medications: ["Aspirin", "Statin", "Paracetamol", "Ibuprofen", "Mosquito cream", "Cortisone", "Eye drops", "Muscle pain cream", "Painkiller", "Laxatives", "Thermometer", "Gauze pads", "Plasters", "Chlorphenamine", "Fiber-based laxatives", "Cetirizine", "Legal Cannabis", "Viagra"],

        stationery: ["Pencils", "Markers", "Ruler", "Highlighters", "Pens", "Colors", "Erasers", "Notepads", "Notebooks", "Drawing albums", "Correction fluid", "Scissors", "Rulers", "Glue", "Adhesive tape", "Folders", "Cardstock", "Paper clips", "Stapler", "Stapler refills", "Post-it notes"],

        babies: ["Diapers", "Bibs", "Wet wipes", "Baby formula", "Baby bottles", "Pacifier", "Baby lotion", "Talcum powder", "Moisturizing cream", "Gentle cleanser", "Baby bath foam", "Thermometer", "Baby pasta", "Baby cheese", "Baby food puree", "Breast pump", "Soft toys", "Corner protectors for furniture", "Anti-suffocation pillow", "High chair", "Sunscreen", "Diaper rash cream", "Changing table", "Stroller", "Pram", "Teething gel"],

        electronics: ["USB cables", "Earphones", "Light bulbs", "Television", "Coffee machine", "Smartphone cases", "SD memory cards", "Power adapters", "Vacuum cleaner", "Washing machine", "Dishwasher", "Dryer", "Pizza oven", "Smartphone chargers", "Earphones", "Bluetooth speakers", "Mouse", "Keyboard", "Power bank", "Food processor", "Robot vacuum cleaner", "LED torches", "Calculator", "LED reading lamps", "Headphones with microphone", "Webcam", "Mousepad", "Fan", "USB hub", "Wired keyboards", "Cordless phones", "PC speakers", "Car smartphone mounts"],

        pets: ["Dry food for cats/dogs", "Kibbles", "Wet food cans for cats/dogs", "Cat litter", "Snacks for cats/dogs", "Dog leash", "Muzzle", "Collar for dogs/cats", "Rubber toys", "Pet carriers", "Food and water bowls", "Combs and brushes for grooming", "Parasite control products", "Flea collar", "Tick repellent", "Pet bed", "Shampoo", "Conditioner", "Cat litter sanitizers", "Chew toys", "Hamster litter boxes", "Feeders", "Waterers", "Bird food", "Cages", "Fish snacks", "Turtle food", "Sunflower seeds"],

        workTools: ["Flathead screwdriver", "Phillips screwdriver", "Hammer", "Adjustable wrench", "Pliers", "Scissors", "Saw", "Spirit level", "Chisel", "Utility knife", "Shears", "Measuring tape", "Meter", "Adhesive tape", "Insulating tape", "Cable ties", "Nails", "Screws", "Bolts", "Trowel", "Paintbrush", "Spatula", "Hex key"],

        clothes: ["T-shirt", "Shirt", "Tank top", "Polo shirt", "Underwear", "Shirt", "Sweater", "Sweatshirt", "Jacket", "Coat", "Trousers", "Jeans", "Shorts", "Skirts", "Dress", "Work suit", "Pajamas", "Underwear", "Socks", "Thermal shirt", "Hat", "Gloves", "Shoes", "Sneakers", "Lingerie", "Garter belt", "Fishnet stockings", "Bra", "Thong"],

        toys: ["Dolls", "Toy cars", "Puzzles", "Building blocks", "Play kitchen set", "Soccer balls", "Painting and coloring sets", "Board games", "Tricycles", "Pokemon cards", "Magic the gathering cards", "Garden toys", "Science kits", "Toy trains", "Board games", "Cards", "Bicycle", "Electric scooter", "Remote control car", "Game boy", "Play station", "Xbox"],

        furniture: ["Sofa", "Table", "Coffee table", "Carpet", "Chair", "Floor lamp", "Table lamp", "Shelf", "Bedside table", "Bed", "Desk", "Wall shelves", "Mirror", "Coat rack", "TV stand", "Wardrobe", "Ottoman", "Vase", "Picture frame", "Umbrella stand", "Decorative cushions", "Wall clock", "Painting", "Doormat"],

        householdObjects: ["Cutlery", "Forks", "Knives", "Spoons", "Plates", "Glasses", "Cups", "Pots", "Pans", "Baking trays", "Kitchen utensils", "Can opener", "Cutting board", "Food containers", "Broom", "Mirror", "Towel"],

        gardening: ["Gardening gloves", "Trowel", "Pruning shears", "Watering cans", "Garden hoses", "Rake", "Plant stakes", "Pot", "Saucer", "Fertilizer", "Seeds", "Plant soil", "Bucket", "Sprayer", "Garden pickaxes"],

        onlineShopping: ["Online you can buy anything, so we would find it difficult to make suggestions as anything in the other categories can be bought online."],

        other: ["Salt", "Eggs", "Snacks", "Bicarbonate", "Coffee powder", "Coffee capsules/waffles", "Energy bars", "Packaged chips", "Pretzels", "Chocolates", "Popcorn", "Soy sauce", "Barbecue sauce", "Ketchup", "Mayonnaise", "Dried fruit", "Breakfast cereals", "Batteries", "Lighter", "Parchment paper", "Aluminum foil", "Candles", "Rubber bands", "String"],

        christmasGifts: ["We do not think we can give you suggestions for this category as it is too subjective.",
            "However, we can suggest that you have a happy Christmas with your family. Whether it is a blood family or not, the important thing is to be happy!",
            "This is the best gift...HAPPY CHRISTMAS!"],
    }),
    getters: {},
    actions: {}
});