<script setup>
import { onMounted } from "vue";
import { usePaginateActivities } from "../composables/usePaginateActivities.js";

const { activities, page, pages, loading, error, fetch, nextPage, prevPage } = usePaginateActivities();

onMounted(() => fetch());
</script>

<template>
  <div class="card p-3 flex flex-col gap-3">
    <div>
      <h2 class="text-sm font-mono text-neutral-400 mb-1">// learning_activities</h2>
      <p class="text-xs text-neutral-500">Visit <a href="https://learn.bergandersen.com" target="_blank" rel="noopener noreferrer" class="link-accent">learn.bergandersen.com</a> for learning programming through structured activity paths covering web development, algorithms, and more.</p>
    </div>

    <div v-if="loading" class="text-sm text-neutral-500 font-mono">loading...</div>

    <div v-else-if="error" class="text-sm text-red-400 font-mono">{{ error }}</div>

    <ul v-else-if="activities.length" class="flex flex-col gap-2" role="list">
      <li v-for="activity in activities" :key="activity._id">
        <a
          :href="`https://learn.bergandersen.com/path/${activity._id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col gap-1 border border-neutral-800 rounded-md p-2 hover:border-neutral-600 transition-colors"
        >
          <div class="flex items-start justify-between gap-2">
            <span class="text-sm font-semibold text-neutral-100">{{ activity.name }}</span>
            <span v-if="activity.difficulty" class="tag">{{ activity.difficulty }}</span>
          </div>
          <p v-if="activity.description" class="text-xs text-neutral-500 line-clamp-2">{{ activity.description }}</p>
          <span v-if="activity.publishedAt" class="text-xs text-neutral-600 font-mono">{{ new Date(activity.publishedAt).toLocaleDateString() }}</span>
        </a>
      </li>
    </ul>

    <p v-else class="text-sm text-neutral-500 font-mono">no activities found</p>

    <div v-if="pages > 1" class="flex items-center justify-between gap-2 pt-1">
      <button
        class="text-xs font-mono text-neutral-400 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        :disabled="page <= 1 || loading"
        @click="prevPage()"
      >← prev</button>
      <span class="text-xs font-mono text-neutral-600">{{ page }} / {{ pages }}</span>
      <button
        class="text-xs font-mono text-neutral-400 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        :disabled="page >= pages || loading"
        @click="nextPage()"
      >next →</button>
    </div>
  </div>
</template>
