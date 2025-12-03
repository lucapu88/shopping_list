PROCEDURA PER AGGIUNGERE ALTRE LISTE:

- Nel file SecondTodoStore.js aggiungere una nuova variabile booleana con il numero successivo all'ultima lista. Ad esempio se l'ultimo è eighthList, il successivo sarebbe ninth.
- Cerca una delle variabili uguali, tipo anche eighthList in tutto il file, e fai la stessa ed identica cosa per la nuova variabile.
- Nel metodo getAndPushListsNumber aggiungi un elemento todo all'array keys. Sostanzialmente è un copia e incolla cambiando numero.
- Aggiungi un'altra prop nel metodo createListsButtons al this.listButtons = [{...}]; uguale alle altre ma cambiando i nomi.

- Nel file TodoStore.js cerca l'ultima lista aggiunta (es.: eighthList) ed aggiungi ovunque c'è la stessa ed identica cosa ma con la nuova variabile della lista nuova.
- Nelle const singleTodoDeleted e multipleTodoDeleted aggiungi agli array nuovi elementi cambiando il numero con quello della nuova lista (es.: 'singleTodoDeleted-9' 'deletedTodos-9').

- Nel file Rename-list.vue stessa cosa, cerca l'ultima lista aggiunta e fai copia e incolla aggiungendo nuova lista con un numero in più.
