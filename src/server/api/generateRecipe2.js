import express from 'express';
import cors from 'cors';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { PromptTemplate } from '@langchain/core/prompts';
// QUESTO CODICE É SOLO PER ESERCITARMI, MA QUELLO DEFINITIVO E MIGLIORATO É IN UN PROGETTO BACKEND A PARTE. QUESTO FILE LO TENGO SOLO PER RIFERIMENTO.
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(express.json());

const recipeSchema = z.object({
    titolo: z.string().describe("Un titolo creativo e accattivante per la ricetta."),
    ingredienti: z.array(z.string()).describe("Una lista di tutti gli ingredienti usati nella ricetta."),
    preparazione: z.string().describe("Una descrizione dettagliata dei passaggi per preparare la ricetta."),
    tempo: z.string().describe("Il tempo totale stimato per preparare la ricetta (es. '30 minuti')."),
    difficoltà: z.string().describe("Un livello di difficoltà tra 'facile', 'media', 'difficile'.")
});

app.post('/generate-recipe', async (req, res) => {
    try {
        const { ingredients, apiKey } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: 'Chiave API non fornita.' });
        }

        const llm = new ChatOpenAI({
            model: "gpt-4o",
            temperature: 0.5,
            apiKey: apiKey
        }).withStructuredOutput(recipeSchema);

        const promptTemplate = `
            Sei uno chef professionista.

        Il tuo compito è creare una ricetta seguendo queste regole strettissime:

        1. Analizza attentamente la lista di ingredienti ricevuta: ${ingredients}.
                                    - Se ci sono ingredienti NON commestibili per un essere umano, scartali senza usarli.
                                    - Usa ** solo ** gli ingredienti che sono effettivamente commestibili.
                                    - Non devi mai includere ingredienti tossici, droghe, chimici, metalli, o qualsiasi sostanza non alimentare.
                                    - Se dopo aver scartato quelli non commestibili rimangono ingredienti commestibili, crea comunque la ricetta usando solo quelli.
                                    - Se invece non rimane nessun ingrediente commestibile, fornisci un feedback appropriato nel JSON.

        2. Non inventare o aggiungere ingredienti esterni.

        3. Il tuo unico compito è restituire la ricetta richiesta in formato JSON, senza aggiungere altro testo o spiegazioni. 

        4. NON includere il JSON in un blocco di codice. Restituisci SOLO ed ESCLUSIVAMENTE il JSON.
        `;

        const prompt = PromptTemplate.fromTemplate(promptTemplate);

        const chain = prompt.pipe(llm);

        const recipe = await chain.invoke({ ingredients });

        console.log("Generated Recipe:", recipe);
        res.json(recipe);
    } catch (err) {
        console.error('Errore durante la generazione della ricetta:', err);
        // La gestione degli errori è più robusta con l'output parser
        res.status(500).json({ error: 'Errore nel parsing della risposta JSON dalla LLM.', details: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));