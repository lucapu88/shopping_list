<script>
/*
 Ho fatto alcune prove inserendo banner pubblicitari e: o tua app già dispone di un pubblico molto elevato, 
 oppure devi accontentarti di sitarelli che propongono pubblicità da 4 soldi! non c'è una via di mezzo!
 Ho trovato https://beta.publishers.adsterra.com/websites che sembra un'alternativa abbastanza funzionante 
 MA purtroppo crea anche contenuti per adulti, anche se non spunti la casella! Dato che la mia app è dedicata ad un pubblico di qualsiasi età,
 preferisco evitare e per il momento non integro nessuna pubblicità fino a che non trovo qualcosa di veramente valido.
 
 Se stai leggendo e conosci qualcosa di valido, contattami grazie!

	mounted() {
		const script = document.createElement("script");
		script.async = true;
		script.setAttribute("data-cfasync", "false");
		script.src = "//pl25556349.profitablecpmrate.com/4d6a97ea883a5562589db8d649fe52ee/invoke.js";

		document.getElementById("container-4d6a97ea883a5562589db8d649fe52ee").appendChild(script);
}

<div id="container-4d6a97ea883a5562589db8d649fe52ee"></div>
*/

export default {
	mounted() {
		const configScript = document.createElement("script");
		configScript.type = "text/javascript";
		configScript.innerHTML = `
      (sc_adv_out = window.sc_adv_out || []).push({
          id: "885753",
          domain: "n.ads1-adnow.com",
          no_div: false
      });
    `;
		document.getElementById("ad-container").appendChild(configScript);

		const externalScript = document.createElement("script");
		externalScript.type = "text/javascript";
		externalScript.src = "//st-n.ads1-adnow.com/js/a.js";
		externalScript.async = true;
		document.getElementById("ad-container").appendChild(externalScript);
	},
};
</script>

<template>
	<div>
		<div id="SC_TBlock_885753" class="ads"></div>
	</div>
</template>

<style scoped>
.ads {
	width: 90%;
	height: 150px;
}
</style>
