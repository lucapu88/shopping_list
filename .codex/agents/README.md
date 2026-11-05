# Agente per la manutenzione delle dipendenze

`dependency-maintainer.toml` definisce un agente Codex locale al progetto con
il ruolo di senior full stack web developer, specializzato nello stack di
Shopping List. Eredita modello, strumenti e permessi della sessione principale.

Per usarlo, apri una sessione Codex in questo progetto e scrivi:

> Usa l'agente dependency-maintainer per controllare tutte le dipendenze e
> aggiornare le release stabili che non richiedono migrazioni. Per le altre,
> mostrami il piano e attendi il mio OK.

Per ottenere soltanto l'analisi:

> Usa dependency-maintainer solo per un report, senza installare o modificare file.

L'agente verifica registry e documentazione ufficiale a ogni esecuzione,
esclude le prerelease e analizza la compatibilità con il codice esistente.
Può modificare automaticamente le versioni in `package.json` e il lockfile;
ogni altra modifica necessaria richiede prima un piano con file, interventi e
motivazioni e poi l'approvazione esplicita dell'utente. Esegue build e test,
e ripristina il gruppo aggiornato se introduce errori.

La creazione del file non avvia controlli, aggiornamenti o esecuzioni periodiche.
Se la sessione corrente non rileva il nuovo agente, aprine una nuova nella stessa
cartella. In un client senza supporto agli agenti personalizzati, puoi chiedere
alla sessione principale di leggere il TOML e seguirne le istruzioni.

Formato e percorso seguono la
[documentazione ufficiale OpenAI sugli agenti personalizzati](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents).
