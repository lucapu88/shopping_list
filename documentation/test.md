# ESEGUIRE TUTTI I TEST, SIA CYPRESS CHE VITEST, E SE PASSANO TUTTI PUSHA ALTRIMENTI NO

npm run push

# ESEGUIRE TUTTI I TEST, SIA CYPRESS CHE VITEST, E SE PASSANO TUTTI PUSHA ALTRIMENTI NO (se è stato fatto un commit con amend)

npm run push-amend

=> E2E:

# Eseguire test cypress con interfaccia grafica

npx cypress open

# Eseguire test cypress solo da terminale

npx cypress run

---

=> UNIT:

# Eseguire tutti i test unitari

npx vitest run

# Eseguire test unitari in modalità watch

npm run test

# Eseguire test unitari con UI

npm run test:ui

# Eseguire test unitari con coverage

npm run test:coverage

# Eseguire test unitario specifico

npm run test -- TodoStore
