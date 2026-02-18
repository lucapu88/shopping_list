<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
</script>

<script>
export default {
	emits: ["importListEmitted"],
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			addNewTodo: useTodoStore(),
			settings: useSettingsStore(),
			textAreaHeight: 55,
			pasteListInfo: "pasteListInfo",
			listPasted: null,
			exportList: "exportList",
			pasteList: "pasteList",
			isExampleImgVisible: false,
		};
	},
	methods: {
		adjustTextareaHeight() {
			document.getElementById("text-area").style.height = `${this.textAreaHeight}px`;
		},
		startIncreasing() {
			if (this.textAreaHeight <= 405) {
				this.textAreaHeight += 50;
				this.adjustTextareaHeight();
			}
		},
		startDecreasing() {
			if (this.textAreaHeight >= 56) {
				this.textAreaHeight -= 50;
				this.adjustTextareaHeight();
			}
		},
		addListCopied() {
			if (!this.listPasted) {
				return;
			}
			this.listPasted = this.cleanText(this.listPasted);

			const listPastedToArray = this.listPasted
				.split("\n")
				.filter((el) => el !== "")
				.map((todo) => todo.replace(/\b-\b/g, "").trim());
			// .map((todo) => todo.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '').trim());
			listPastedToArray.forEach((td) => {
				this.addNewTodo.newTodo = td;
				this.addNewTodo.createCategory();
				this.addNewTodo.addTodo();
			});
			this.addNewTodo.duplicateFound = false; //Così non mostra la modale dei duplicati nel caso ci sono. Tanto dopo fa il reload
			this.$emit("importListEmitted", true);
			setTimeout(() => {
				location.reload();
			}, 1500);
		},
		cleanText(testo) {
			// Rimuove i : dai titoli delle sezioni (es. "VERDURA:" => "VERDURA")
			return testo.replace(/(^[A-ZÀÈÉÌÒÙ\s]+):(?=\r?\n)/gm, "$1");
		},
	},
};
</script>

<template>
	<div class="add-list-copied-container helper-settings">
		<ListIstructionAccordion show-list-instructions-input="pasteList" :istructions-text="languages.pasteListText.title" :select-deselect-arrow="settings.pasteList && settings.section === pasteList" :isSettings="true" />
		<template v-if="settings.pasteList && settings.section === pasteList">
			<div class="export-list-container mb-3">
				<li class="ms-3">
					<small>{{ languages.pasteListText.subtitle }}. </small>
					<small>{{ languages.infoCategoriesAlert }}</small>
					<div class="show-example">
						<p>{{ languages.importListExampleText }}:</p>
						<button class="show-btn" @click="isExampleImgVisible = true">
							{{ languages.show }}
						</button>
					</div>
					<ToggleTutorialButton :features="exportList" />
				</li>

				<div class="add-list-copied">
					<div class="increase-decrease-container">
						<button :class="{ 'retro-btn-border': theme.retroTheme }" @click="startDecreasing()" touch-action="none">
							<span class="import-arrow"> ^ </span>
						</button>
						<button :class="{ 'retro-btn-border': theme.retroTheme }" @click="startIncreasing()" touch-action="none">
							<span class="import-arrow reverse"> ^ </span>
						</button>
					</div>
					<textarea id="text-area" :class="{ 'add-list-textarea': !theme.retroTheme }" rows="2" v-model="listPasted"> </textarea>
					<button
						class="btn btn-light add-list-copied-btn p-0"
						:class="{
							'retro-btn-border': theme.retroTheme,
							'border-dark': !theme.retroTheme,
						}"
						@click="addListCopied()"
					>
						<small>{{ languages.importText }}</small>
					</button>
				</div>

				<Tutorial v-if="settings.video && settings.feature === exportList" :features="exportList" />
			</div>
		</template>

		<div class="modal" v-if="isExampleImgVisible">
			<div class="modal-cont">
				<button class="text-danger" @click="isExampleImgVisible = false">
					{{ languages.close }}
				</button>
				<img v-if="languages.langEnglish" src="@/img/languages/es-ing.webp" alt="" />
				<img v-if="languages.langIta" src="@/img/languages/es-ita.webp" alt="" />
				<img v-if="languages.langSpanish" src="@/img/languages/es-spa.webp" alt="" />
				<img v-if="languages.langFrench" src="@/img/languages/es-fra.webp" alt="" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.add-list-copied {
	display: grid;
	grid-template-columns: 9% 65% 20%;
	gap: 10px;
	margin-top: 0.3125rem;
}

.add-list-textarea {
	border-radius: 5px;
}

textarea {
	resize: vertical;
	min-height: 55px;
	max-height: 405px;
}

.increase-decrease-container {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.increase-decrease-container > button {
	margin: 0;
	padding: 0;
	border: 1px solid rgb(41, 41, 41);
	border-radius: 5px;
}
.increase-decrease {
	width: 15px;
	height: 10px;
}
.add-list-copied-btn {
	max-height: 55px;
}
.import-arrow {
	font-family: Sans-serif;
	font-weight: bold;
}
.reverse {
	display: inline-block;
	-webkit-transform: rotate(-180deg);
	transform: rotate(-180deg);
}
.show-example {
	display: grid;
	grid-template-columns: 75% 25%;
	gap: 5px;
	align-items: center;
	border: 1px solid;
	margin-top: 15px;
	margin-bottom: 10px;
	padding: 5px;
}
.show-btn {
	height: 30px;
}

.modal-cont {
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 95%;
	margin: 0 auto;
}
</style>
