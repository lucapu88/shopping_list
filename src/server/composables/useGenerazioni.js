import { ref } from 'vue';
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { auth } from "@/firebase.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useGenerazioni() {
  const generazioni = ref(0);
  const loading = ref(false);

  async function fetchGenerazioni() {
    const settings = useSettingsStore();
    const secondTodosStore = useSecondTodoStore();
    // Aspetta che Firebase ripristini la sessione
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((u) => {
        unsubscribe();
        resolve(u);
      });
    });

    if (!user) {
      generazioni.value = 0;
      secondTodosStore.totalRecipes = 0;
      return;
    }

    const uid = user.uid;
    settings.yourToken = uid;

    try {
      const res = await fetch(`${API_URL}/generazioni?token=${uid}`);
      const data = await res.json();

      generazioni.value = data.generazioni ?? 0;

      secondTodosStore.totalRecipes = data.generazioni ?? 0;
    } catch (err) {
      console.error('Errore fetch generazioni:', err);
    }
  }

  function getToken() {
    return auth.currentUser?.uid ?? null;
  }

  const waitingForPayment = ref(false);

  async function waitForGenerazioni(maxTentativi = 10, intervallo = 3000) {
    const secondTodosStore = useSecondTodoStore();
    waitingForPayment.value = true;

    for (let i = 0; i < maxTentativi; i++) {
      await fetchGenerazioni();
      if (secondTodosStore.totalRecipes > 0) {
        waitingForPayment.value = false;
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, intervallo));
    }
    waitingForPayment.value = false;
    return false;
  }


  return { generazioni, loading, fetchGenerazioni, getToken, waitForGenerazioni };
}