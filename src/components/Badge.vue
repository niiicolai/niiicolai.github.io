<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false,
    default: null
  }
})

const colors = {
  yellow: 'bg-yellow-500 text-white',
  red: 'bg-red-600 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  purple: 'bg-purple-600 text-white',
  pink: 'bg-pink-500 text-white',
  gray: 'bg-gray-700 text-white',
}

const appliedClass = computed(() => {
  return colors[props.color] || 'bg-gray-300 text-black'
})
</script>

<template>
  <div :class="`p-1 rounded-lg ${appliedClass} text-xs inline-block`">
    <template v-if="url">
      <a :href="url" target="_blank" rel="noopener noreferrer" class="hover:underline">
        {{ text }}
      </a>
    </template>
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>
