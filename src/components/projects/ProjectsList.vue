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
import { defineProps, computed, watch } from 'vue';
import ProjectItem from './ProjectItem.vue';
import useSearch from '@/hooks/search';

const props = defineProps(['user']);
// props.users： not ref, is proxy，reactive，不需要.value,
// props.users.projects: hard coded snapshot, not reactive, we need it to be reactive
// const { user } = toRefs(props);
// after toRefs, props.users: is ref, reactive, 需要.value
// users'property is proxy
const projects = computed(() => (props.user ? props.user.projects : []));
const {
  availableItems: availableProjects,
  updateSearch,
  enteredSearchTerm,
} = useSearch(projects, 'title');

watch(
  () => props.user,
  () => {
    updateSearch('');
    // console.log('toRefs(props).user', user); // objectRef
    // console.log('toRefs(props).user.value', user.value); // Proxy
    console.log('props.user', props.user); // Proxy
    // 传递给useSearch的第一个参数必须具有响应性，props.user有，但props.user.projects没有
    // props.user有，那根据props.user计算出来的projects也有
    // user.value有，那根据user.value计算出来的projects也有
  }
);

const hasProjects = computed(
  () => props.user.projects && availableProjects.value.length > 0
);
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
