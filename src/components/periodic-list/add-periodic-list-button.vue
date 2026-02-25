<script setup>
/* Questo file si dovrebbe chiamare Add-periodic-list-button.vue ma purtroppo se lo importo ovunque con la A maiuscola funziona, 
   mentre in Todo-row.vue invece si rompe perchè è scemo e per qualche motivo non riesce a importare un componente con la A maiuscola, 
   quindi per ora lo lascio così, ma se qualcuno sa come risolvere il problema è ben accetto */
</script>

<template>
	<button class="btn btn-outline-success bg-light rounded-circle btn-sm btn-add-periodic-list">
		<span>+</span>
	</button>
</template>

<style scoped>
.btn-add-periodic-list {
	width: 25px;
	height: 25px;
	padding: 0px 2px 0px 2px;
}
.btn-add-periodic-list > span {
	font-weight: bold;
	font-family: Arial;
}
</style>
