// QUESTO FILE è STATO GENERATO CON L'AIUTO DI CLAUDE AI

import { ref } from 'vue';
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const API_URL = import.meta.env.VITE_API_URL;


function getToken() {
  let token = localStorage.getItem('ricette_token');
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('ricette_token', token);
  }
  return token;
}

export function useGenerazioni() {
  const token = getToken();
  const generazioni = ref(0);
  const loading = ref(false);

  // Recupera generazioni disponibili
  async function fetchGenerazioni() {
    try {
      const res = await fetch(`${API_URL}/generazioni?token=${token}`);
      const data = await res.json();
      generazioni.value = data.generazioni ?? 0;
    } catch (err) {
      console.error('Errore fetch generazioni:', err);
    }
  }

  // Scala una generazione — restituisce true se ok, false se esaurite
  async function consumaGenerazione(dettaglio = 'Generazione ricetta') {
    const secondTodosStore = useSecondTodoStore();

    loading.value = true;
    try {
      const res = await fetch(`${API_URL}/usa-generazione`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, dettaglio })
      });

      const data = await res.json();
      if (!res.ok || !data.success) return false;
      window.localStorage.setItem('generazioni', data.generazioni);
      secondTodosStore.totalRecipes = data.generazioni;
      generazioni.value = data.generazioni;
      return true;
    } catch (err) {
      console.error('Errore usa generazione:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  return { token, generazioni, loading, fetchGenerazioni, consumaGenerazione };
}
