// QUESTO FILE è STATO GENERATO CON L'AIUTO DI CLAUDE AI

import { ref } from 'vue';
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  const settings = useSettingsStore();
  let token = localStorage.getItem('ricette_token');
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('ricette_token', token);
  }
  settings.yourToken = token;
  return token;
}

export function useGenerazioni() {
  const token = getToken();
  const generazioni = ref(0);
  const loading = ref(false);

  // Recupera generazioni disponibili
  async function fetchGenerazioni() {
    try {
      const secondTodosStore = useSecondTodoStore();
      const res = await fetch(`${API_URL}/generazioni?token=${token}`);
      const data = await res.json();
      generazioni.value = data.generazioni ?? 0;
      window.localStorage.setItem('generazioni', data.generazioni ?? 0);
      secondTodosStore.totalRecipes = data.generazioni ?? 0;
    } catch (err) {
      console.error('Errore fetch generazioni:', err);
    }
  }

  return { token, generazioni, loading, fetchGenerazioni, };
}
