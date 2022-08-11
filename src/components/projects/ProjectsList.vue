<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <ul v-if="hasProjects">
      <project-item
        v-for="prj in availableProjects"
        :key="prj.id"
        :title="prj.title"
      ></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue';
import ProjectItem from './ProjectItem.vue';

const props = defineProps(['user']);

const enteredSearchTerm = ref('');
function updateSearch(val) {
  enteredSearchTerm.value = val;
}
watch(
  () => props.user,
  () => {
    enteredSearchTerm.value = '';
  }
);

const activeSearchTerm = ref('');

watch(enteredSearchTerm, (val) => {
  setTimeout(() => {
    if (val === enteredSearchTerm.value) {
      activeSearchTerm.value = val;
    }
  }, 300);
});

const availableProjects = computed(() => {
  if (activeSearchTerm.value) {
    return props.user.projects.filter((prj) =>
      prj.title.includes(activeSearchTerm.value)
    );
  }
  return props.user.projects;
});

const hasProjects = computed(
  () => props.user.projects && availableProjects.value.length > 0
);
// 在脚本中使用props 不需要加.value
// 在脚本中使用ref和computedRef, 需要加.value
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
