FILE CHE VENGONO IMPATTATI QUANDO SI CAMBIA LINGUA:

- Aggiungi button in Change-languages.vue
- LanguageStore.js tutto (occhio a languagesBtns)
- General-tutoriar-modal.vue un pò ovunque
- Empty-list.vue
- CategoriesStore.js in getCurrentLanguageCategories() e aggiungi le categorie
- SettingsStore.js in checkingUpdates()
- TodoStore.js in selectCategoryToAddItem() dentro const allCategories, e dentro if (this.addTodoInCategory.condition)
- Cartella suggestions: aggiungi tutte le stesse ed identiche cose per la lingua nuova
- Aggiungi la lingua nel componente Loading-or-updating
- Cercare ovunque nel codice le icone che ci sono nella cartella flags ed aggiungere anche quella in francese
