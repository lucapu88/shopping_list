<template>
	<div class="ads-container">
		<div id="SC_TBlock_885753"></div>
	</div>
</template>

<script>
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
		document.getElementById("SC_TBlock_885753").appendChild(configScript);

		const externalScript = document.createElement("script");
		externalScript.type = "text/javascript";
		externalScript.src = "//st-n.ads1-adnow.com/js/a.js";
		externalScript.async = true;
		document.getElementById("SC_TBlock_885753").appendChild(externalScript);
	},
};
</script>

<style scoped>
.ads-container {
	display: flex;
	justify-content: center;
}
#SC_TBlock_885753 {
	width: 90%;
	/* border: 1px solid black; */
	max-height: 150px;
	z-index: 10;
}
</style>
