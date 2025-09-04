import express from 'express';
import cors from 'cors';
import { OpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatMessage } from '@langchain/core/messages';
// TUTTO QUESTO CODICE É LA PRIMA FASE DALLA QUALE SONO PARTITO, MA VOLENDO UN JSON DI RITORNO NON POSSO USARE IL PROMPT TEMPLATE, QUINDI HO DOVUTO CAMBIARE APPROCCIO.
// LO LASCIO COMUNQUE COMMENTATO PER RIFERIMENTO FUTURO, MAGARI MI TORNA UTILE.

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());

app.post('/generate-recipe', async (req, res) => {
    try {
        const { ingredients, apiKey } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: 'Chiave API non fornita.' });
        }
        // PROMPT DI GENERAZIONE RICETTA
        const generationPromptTemplate = `Sei uno chef professionista.

                                    Il tuo compito è creare una ricetta seguendo queste regole strettissime:

                                        1. Analizza attentamente la lista di ingredienti ricevuta: ${ingredients}.
                                            - Se ci sono ingredienti non commestibili per un essere umano, scartali senza usarli.
                                            - Usa **solo** gli ingredienti che sono effettivamente commestibili.
                                            - Non devi mai includere ingredienti tossici, droghe, chimici, metalli, o qualsiasi sostanza non alimentare.
                                            - Se dopo aver scartato quelli non commestibili rimangono ingredienti commestibili, crea comunque la ricetta usando solo quelli.
                                            - Se invece non rimane nessun ingrediente commestibile, salta i punti successivi e passa direttamente al punto 8.

                                        2. Non inventare o aggiungere ingredienti esterni.

                                        3. Il tuo unico compito è restituire la ricetta richiesta in formato JSON, senza aggiungere altro testo o spiegazioni.

                                        4. NON includere MAI altro testo fuori dal JSON! Il tutto deve essere all'interno delle parentesi graffe senza NESSUNA aggiunta di testo libero al suo esterno.

                                        5. Rispondi **ESCLUSIVAMENTE** in formato JSON valido con questa struttura:
                                            
                                            {
                                                "titolo": "...",
                                                "ingredienti": ["...", "..."],
                                                "preparazione": "...",
                                                "tempo": "...",
                                                "difficoltà": "..."
                                            }
                                            Dove:
                                            - titolo: un titolo creativo e accattivante per la ricetta.
                                            - ingredienti: una lista di tutti gli ingredienti usati nella ricetta, presi solo dalla lista fornita.
                                            - preparazione: una descrizione dettagliata dei passaggi per preparare la ricetta.
                                            - tempo: il tempo totale stimato per preparare la ricetta (es. "30 minuti").
                                            - difficoltà: un livello di difficoltà tra "facile", "media", "difficile".
                                            Esempio di risposta JSON valida:
                                                {
                                                        "titolo": "Spigola alla salsiccia con broccoli",
                                                        "ingredienti": ["spigola", "sale", "salsiccia", "broccoli"],
                                                        "preparazione": "Mettere una pentola con dell'acqua sul fuoco e farla bollire. Prendere una padella e fa
                                                r rosolare le salsicce in olio bollente. Una volta che le salsicce sono dorate, aggiungere la spigola e far cuocer
                                                e per circa 5 minuti. Aggiungere una spruzzata di vino e far sfumare. Aggiungere i broccoli tagliati a pezzi e far
                                                cuocere per altri 5 minuti. Servire caldo.",
                                                        "tempo": "20 minuti",
                                                        "difficoltà": "media"
                                                }

                                        6. Devi SEMPRE includere tutte le sezioni richieste (titolo, ingredienti, preparazione, tempo, difficoltà).
                                        Non interrompere la risposta a metà: completa sempre il JSON.

                                        7. Vietato produrre testo libero fuori dal JSON.

                                        8. Se NON rimane alcun ingrediente commestibile, rispondi esattamente con:
                                            
                                            {
                                                "titolo": "Non posso creare una ricetta con questi ingredienti. Forniscimi altri ingredienti.",
                                                "ingredienti": [],
                                                "preparazione": "",
                                                "tempo": "",
                                                "difficoltà": ""
                                            }`;

        const llm = new OpenAI({
            apiKey,
            temperature: 0.5,
            maxTokens: 1000,
        });
        const generationPrompt = ChatPromptTemplate.fromMessages([
            new ChatMessage({ role: "system", content: generationPromptTemplate }),
            new ChatMessage({ role: "human", content: "{ingredients}" })
        ]);

        const generationChain = new LLMChain({
            llm,
            prompt: generationPrompt
        });

        const generationResponse = await generationChain.call({ ingredients });
        console.log('Generation response:', generationResponse.text);

        let recipe;
        try {
            recipe = JSON.parse(generationResponse.text);
        } catch (parseError) {
            console.error('Errore nel parsing della risposta JSON:', parseError);
            return res.status(500).json({ error: 'Errore nel parsing della risposta JSON dalla LLM.' });
        }

        /* PROMPT DI VALIDAZIONE RICETTA É UN CONTROLLO DI SICUREZZA ABBASTANZA INUTILE DATO CHE IL PRIMO PROMPT È GIÀ MOLTO RIGIDO.
           PERÒ FREGA CAZZI, MI STO ESERCITANDO CON DOPPIA CHIAMATA AL MODELLO, QUINDI LO LASCIO. */
        const validationPromptTemplate = `Sei un assistente esperto in sicurezza che controlla se una ricetta è sicura e commestibile per un umano.
 
                                     Ricetta da controllare:
                                     ${recipe}.
 
                                     Regole:
                                     - Se la ricetta contiene ingredienti pericolosi come ad esempio: droghe, sostanze tossiche, o NON alimentari → NON è valida.
                                     - In caso di ricetta NON valida, rispondi con un booleano false.
                                     - Se la ricetta è valida e sicura, rispondi con un booleano true.`;

        const llm2 = new OpenAI({
            apiKey,
            temperature: 0,
            maxTokens: 1000,
        });

        const validationPrompt = ChatPromptTemplate.fromMessages([
            new ChatMessage({ role: "system", content: validationPromptTemplate }),
        ]);

        const validationChain = new LLMChain({
            llm: llm2,
            prompt: validationPrompt
        });

        const recipeToValidate = JSON.stringify(recipe, null, 2);

        const validationResponse = await validationChain.call({ recipe: recipeToValidate });
        console.log('Validation response:', validationResponse.text);

        let isValid = validationResponse.text.trim().toLowerCase() === 'true';

        if (isValid) {
            res.json(recipe);
        } else {
            let validationFailure = {
                "titolo": "La ricetta non ha passato il controllo qualità: Contiene ingredienti pericolosi o non commestibili! Controlla meglio e riprovaci.",
                "ingredienti": [],
                "preparazione": "",
                "tempo": "",
                "difficoltà": ""
            };
            res.json(validationFailure);
        }

        res.json(recipe);
    } catch (err) {
        console.error('Errore durante la generazione della ricetta:', err);
        res.status(500).json({ error: 'Errore interno server' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
