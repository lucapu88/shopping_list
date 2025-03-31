import { defineStore } from 'pinia';

export const useSpanishSuggStoreStore = defineStore('spanish', {
    state: () => ({
        verduras: ["Zanahorias", "Tomates", "Patatas", "Cebollas", "Calabacines", "Pimientos", "Pepinos", "Berenjenas", "Espinacas", "Lechuga", "Brócoli", "Coliflor", "Espárragos", "Judías verdes", "Apio", "Hinojo", "Rábanos", "Acelgas", "Col", "Calabaza"],

        carnes: ["Pollo", "Ternera", "Cerdo", "Cotechino", "Salchicha", "Cordero", "Pato", "Ternera", "Conejo", "Mortadela", "Salami", "Jamón cocido", "Jamón crudo", "Bresaola", "Pechuga de pavo", "Pechuga de pollo", "Tocino", "Hamburguesa de pollo", "Hamburguesa de pavo", "Hamburguesa de ternera", "Bacon", "Pechuga de pollo", "Muslo de pollo", "Contramuslo de pollo", "Alas de pollo", "Solomillo de ternera", "Lomo de ternera", "Costilla de ternera", "Bistec de ternera", "Chuleta de ternera", "Lomo de ternera", "Solomillo de cerdo", "Costillas de cerdo", "Lomo de cerdo", "Paletilla de cerdo", "Cuello de cerdo", "Codillo de cerdo", "Chuletas de cerdo", "Lardo de cerdo", "Carrillera de cerdo"],

        pescado: ["Salmón", "Atún", "Bacalao", "Trucha", "Dorada", "Branzino", "Lenguado", "Platija", "Pez espada", "Sepia", "Bacalao negro", "Anchoa", "Langostino", "Camarón", "Calamar", "Mejillones", "Almejas", "Langosta", "Cangrejo", "Sardinas"],

        fruta: ["Manzanas", "Plátanos", "Naranjas", "Uvas", "Fresas", "Limones", "Peras", "Kiwi", "Duraznos", "Piñas", "Mangos", "Melones", "Mandarinas", "Cerezas", "Limones", "Aguacate", "Frambuesas", "Toronjas", "Albaricoques", "Granadas"],

        dulces: ["Azúcar", "Azúcar glas", "Levadura en polvo", "Chocolate", "Vainilla", "Fruta fresca", "Nata montada", "Gelatina", "Cacao en polvo", "Maicena", "Jarabe de maíz", "Yogur", "Mermelada", "Glaseado", "Tiramisú", "Milhojas", "Tarta de queso", "Mermelada", "Nutella", "Miel"],

        lacteos: ["Mozzarella", "Leche", "Mantequilla", "Queso cheddar", "Yogur", "Nata", "Ricotta", "Queso parmesano", "Queso parmesano", "Queso gorgonzola", "Queso crema", "Queso suizo", "Queso de cabra", "Queso brie", "Queso taleggio", "Queso pecorino"],

        harina: ["Harina de trigo", "Harina de maíz", "Harina de centeno", "Pasta", "Espaguetis", "Penne", "Fusilli", "Rigatoni", "Linguine", "Farfalle", "Bucatini", "Arroz", "Pan", "Pan integral", "Pan multicereal", "Panecillos", "Galletas", "Crackers", "Tortillas de maíz", "Cereales", "Harina de avena", "Gnocchi", "Risotto", "Polenta", "Cuscús"],

        bebidas: ["Agua mineral", "Agua con gas", "Zumo de frutas", "Coca cola", "Pepsi", "Naranjada", "Té helado", "Café embotellado", "Zumo de frutas", "Cerveza", "Vino tinto", "Vino blanco", "Vino rosado", "Cava", "Prosecco", "Amaro", "Limoncello", "Vodka", "Ginebra", "Ron", "Whisky", "Tequila", "Aperol", "Spritz", "Campari"],

        congelados: ["Pizza", "Sopa minestrone", "Patatas fritas", "Patatas al horno", "Nuggets", "Croquetas de pollo", "Croquetas de patata", "Panzerottini", "Aceitunas ascolanas", "Croquetas de mozzarella", "Pescado congelado", "Filete", "Helado", "Polos", "Sorbete", "Croissant", "Palitos de pescado", "Sfogliatelle", "Burritos", "Tarta congelada", "Sopa de legumbres"],

        especias: ["Pimienta negra", "Pimentón", "Ajo en polvo", "Perejil en hojuelas", "Comino", "Cúrcuma", "Pimentón", "Orégano", "Canela", "Nuez moscada", "Jengibre molido", "Clavos de olor"],

        higiene: ["Champú", "Acondicionador", "Jabón", "Papel higiénico", "Limpieza íntima", "Pasta de dientes", "Cepillo de dientes", "Hilo dental", "Pasta de dientes", "Enjuague bucal", "Desodorante", "Desengrasante", "Desinfectante", "Detergente para la ropa", "Detergente para platos", "Esponjas", "Bolsas de basura", "Toallitas limpiadoras", "Hidratante corporal", "Maquinillas de afeitar", "Espuma de afeitar", "After shave", "Pañuelos faciales", "Hisopos de algodón", "Esmalte de uñas", "Perfume o colonia", "Toallas sanitarias"],

        medicamentos: ["Aspirina", "Estatinas", "Paracetamol", "Ibuprofeno", "Crema para mosquitos", "Cortisona", "Colirio", "Crema para el dolor muscular", "Analgésico", "Laxantes", "Termómetro", "Gasas", "Apósitos", "Clorfenamina", "Laxantes a base de fibra", "Cetirizina", "Cannabis legal", "Viagra"],

        papeleria: ["Lápices", "Marcadores", "Regla", "Resaltadores", "Bolígrafos", "Pinturas", "Gomas de borrar", "Bloques de papel", "Cuadernos", "Álbumes para dibujo", "Correctores", "Tijeras", "Reglas", "Pegamento", "Cinta adhesiva", "Carpetas", "Cartulina", "Grapas", "Grapadora", "Recargas de grapas", "Notas Post-it"],

        ninos: ["Pañales", "Baberos", "Toallitas húmedas", "Fórmula para bebés", "Biberones", "Chupete", "Loción para bebés", "Talco", "Crema hidratante", "Limpiador suave", "Espuma de baño para bebés", "Termómetro", "Pasta para bebés", "Queso para bebés", "Puré de comida para bebés", "Extractor de leche", "Juguetes blandos", "Protectores de esquinas para muebles", "Almohada antiasfixia", "Trona", "Protector solar", "Crema para pañalitis", "Cambiador", "Cochecito", "Carriola", "Gel para la dentición"],

        electronica: ["Cables USB", "Auriculares", "Bombillas", "Televisor", "Máquina de café", "Funda para smartphone", "Tarjetas de memoria SD", "Adaptadores de corriente", "Aspiradora", "Lavadora", "Lavavajillas", "Secadora", "Horno para pizza", "Cargadores de smartphone", "Auriculares", "Altavoces Bluetooth", "Ratón", "Teclado", "Batería externa", "Robot de cocina", "Robot aspirador", "Linternas LED", "Calculadora", "Lámparas de lectura LED", "Auriculares con micrófono", "Cámara web", "Mousepad", "Ventilador", "Concentrador USB", "Teclados con cable", "Teléfonos inalámbricos", "Altavoces para PC", "Soportes para smartphone para automóvil"],

        animales: ["Comida seca para gatos/perros", "Croquetas", "Latas de comida húmeda para gatos/perros", "Arena para gatos", "Snacks para gatos/perros", "Correa para perros", "Bozal", "Collar para perros/gatos", "Juguetes de goma", "Transportines para mascotas", "Cuencos para comida y agua", "Peines y cepillos para el cuidado del pelaje", "Productos para el control de parásitos", "Collar antipulgas", "Repelente de garrapatas", "Cama para mascotas", "Champú", "Acondicionador", "Desinfectantes para arena de gatos", "Juguetes para masticar", "Bandejas de arena para hámsters", "Comederos", "Bebederos", "Comida para pájaros", "Jaulas", "Snacks para peces", "Comida para tortugas", "Semillas de girasol"],

        herramientas: ["Destornillador de cabeza plana", "Destornillador Phillips", "Martillo", "Llave ajustable", "Alicates", "Tijeras", "Sierra", "Nivel de burbuja", "Cincel", "Cúter", "Tijeras de hojalatero", "Cinta métrica", "Metro", "Cinta adhesiva", "Cinta aislante", "Correas de cables", "Clavos", "Tornillos", "Pernos", "Paleta de albañil", "Brocha", "Espátula", "Llave Allen"],

        ropa: ["Camiseta", "Playera", "Camiseta de tirantes", "Polo", "Ropa interior", "Camisa", "Suéter", "Sudadera", "Chaqueta", "Abrigo", "Pantalones", "Jeans", "Shorts", "Faldas", "Vestido", "Traje de trabajo", "Pijama", "Ropa interior", "Calcetines", "Camiseta térmica", "Sombrero", "Guantes", "Zapatos", "Zapatillas", "Ropa interior femenina", "Liguero", "Medias de red", "Sostén", "Tanga"],

        juguetes: ["Muñecas", "Coches de juguete", "Rompecabezas", "Bloques de construcción", "Juego de cocina de juguete", "Balones de fútbol", "Sets de pintura y colores", "Juegos de mesa", "Triciclos", "Cartas Pokémon", "Cartas magic the gathering", "Juguetes de jardín", "Kits científicos", "Trenes de juguete", "Cartas", "Bicicleta", "Patinete eléctrico", "Coche de control remoto", "Game boy", "Play station", "Xbox"],

        mobiliario: ["Sofá", "Mesa", "Mesa de centro", "Tapete", "Silla", "Lámpara de pie", "Lámpara de mesa", "Estantería", "Mesita de noche", "Cama", "Escritorio", "Estanterías de pared", "Espejo", "Perchero", "Mueble de televisión", "Armario", "Puf", "Jarrón", "Marco de fotos", "Paragüero", "Cojines decorativos", "Reloj de pared", "Cuadro", "Felpudo"],

        objetosDomesticos: ["Cubertería", "Tenedores", "Cuchillos", "Cucharas", "Platos", "Vasos", "Tazas", "Ollas", "Sartenes", "Bandejas para hornear", "Utensilios de cocina", "Abre latas", "Tabla de cortar", "Recipientes para alimentos", "Escoba", "Espejo", "Toalla"],

        jardineria: ["Guantes de jardinería", "Azada", "Tijeras de podar", "Regaderas", "Mangueras de jardín", "Rastrillo", "Estacas para plantas", "Maceta", "Plato para maceta", "Fertilizante", "Semillas", "Tierra para plantas", "Cubo", "Pulverizador", "Picos de jardín"],

        comprarEnIntenet: ["En línea se puede comprar de todo, por lo que nos resultaría difícil hacer sugerencias, ya que cualquier cosa de las otras categorías se puede comprar en línea."],

        deporte: ["Zapatillas para correr", "Cinta de correr", "Balón de fútbol", "Balón de baloncesto", "Balón de voleibol", "Balón de rugby", "Pelotas de tenis", "Pelotas de golf", "Pelotas de ping pong", "Raqueta de tenis", "Raqueta de ping pong", "Palos de golf", "Guantes de boxeo", "Saco de boxeo", "Bicicleta de carretera", "Chándal", "Mancuernas", "Casco de ciclismo", "Gafas de natación", "Step aeróbico", "Cuerda para saltar", "Espinilleras de fútbol", "Bate de béisbol"],

        belleza: ["Labial", "Base de maquillaje", "Máscara de pestañas", "Delineador", "Polvo", "Rubor", "Esmalte de uñas", "Crema hidratante", "Tónico facial", "Limpiador facial", "Aceite para el cabello", "Shampoo", "Acondicionador", "Perfume", "Exfoliante corporal"],


        otros: ["Pabellones", "Huevos", "Aperitivos", "Bicarbonato", "Café en polvo", "Cápsulas de café/waffles", "Barras energéticas", "Patatas fritas envasadas", "Galletas saladas", "Chocolates", "Palomitas", "Salsa de soja", "Salsa barbacoa", "Ketchup", "Mayonesa", "Frutos secos", "Cereales para el desayuno", "Pilas", "Encendedor", "Papel de horno", "Papel de aluminio", "Velas", "Bandas elásticas", "Cuerda"],

        regalosDeNavidad: ["No creemos que podamos darle sugerencias para esta categoría, ya que es demasiado subjetiva.",
            "Sin embargo, sí podemos sugerirte que pases una feliz Navidad con tu familia, ya sea de sangre o no, ¡lo importante es ser feliz!",
            "Este es el mejor regalo... ¡FELIZ NAVIDAD!"],
    }),
    getters: {},
    actions: {}
});
