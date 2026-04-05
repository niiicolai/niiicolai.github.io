import { ref } from "vue";

const API_URL = "https://api-learn.bergandersen.com/api/v1";

async function paginate(page, limit) {
  const url = `${API_URL}/activity_paths?page=${page}&limit=${limit}&lang=en`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.json();
}

export function usePaginateActivities() {
  const activities = ref([]);
  const page = ref(1);
  const limit = ref(6);
  const pages = ref(1);
  const loading = ref(false);
  const error = ref(null);

  async function fetch() {
    loading.value = true;
    error.value = null;
    try {
      const result = await paginate(page.value, limit.value);
      activities.value = result.paths ?? [];
      pages.value = result.pages ?? 1;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function nextPage() {
    if (page.value >= pages.value) return;
    page.value++;
    await fetch();
  }

  async function prevPage() {
    if (page.value <= 1) return;
    page.value--;
    await fetch();
  }

  return { activities, page, pages, limit, loading, error, fetch, nextPage, prevPage };
}
