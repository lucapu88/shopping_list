<script>
/*
 Ho fatto alcune prove inserendo banner pubblicitari e: o tua app già dispone di un pubblico molto elevato, 
 oppure devi accontentarti di sitarelli che propongono pubblicità da 4 soldi! non c'è una via di mezzo!
 Ho trovato https://beta.publishers.adsterra.com/websites che sembra un'alternativa abbastanza funzionante 
 MA purtroppo crea anche contenuti per adulti, anche se non spunti la casella! Dato che la mia app è dedicata ad un pubblico di qualsiasi età,
 preferisco evitare e per il momento non integro nessuna pubblicità fino a che non trovo qualcosa di veramente valido.
 
 Se stai leggendo e conosci qualcosa di valido, contattami grazie!
*/
export default {
	mounted() {
		const script = document.createElement("script");
		script.async = true;
		script.setAttribute("data-cfasync", "false");
		script.src = "//pl25556349.profitablecpmrate.com/4d6a97ea883a5562589db8d649fe52ee/invoke.js";

		document.getElementById("container-4d6a97ea883a5562589db8d649fe52ee").appendChild(script);
	},
};
</script>

<template>
	<div>
		<div id="container-4d6a97ea883a5562589db8d649fe52ee"></div>
	</div>
</template>
