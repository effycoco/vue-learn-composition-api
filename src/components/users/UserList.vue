<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <div>
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">
        Sort Ascending
      </button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">
        Sort Descending
      </button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
      ></user-item>
    </ul>
  </base-container>
</template>

<script setup>
import UserItem from './UserItem.vue';
import { toRefs, defineProps } from 'vue';
import useSearch from '@/hooks/search';
import useSort from '@/hooks/sort';

const props = defineProps(['users']);
// props.users： not ref, is proxy，reactive，不需要.value
const { users } = toRefs(props);
// after toRefs, props.users: is ref, contain a  property which is proxy, reactive, 需要.value
const {
  availableItems: availableUsers,
  updateSearch,
  enteredSearchTerm,
} = useSearch(users, 'fullName');

console.log('props.users', props.users); // array
console.log('toRefs(props).users', users); // objectRef
console.log('toRefs(props).users.value', users.value); //array
const { sort, sorting, displayedUsers } = useSort(availableUsers);
// const sorting = ref(null);
// function sort(mode) {
//   sorting.value = mode;
// }
// const displayedUsers = computed(() => {
//   if (!sorting.value) {
//     return availableUsers.value;
//   }
//   return availableUsers.value.slice().sort((u1, u2) => {
//     if (sorting.value === 'asc' && u1.fullName > u2.fullName) {
//       return 1;
//     } else if (sorting.value === 'asc') {
//       return -1;
//     } else if (sorting.value === 'desc' && u1.fullName > u2.fullName) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });
// });
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
