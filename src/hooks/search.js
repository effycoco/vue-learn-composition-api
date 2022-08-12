import { ref, computed, watch } from 'vue';
export default function (items, searchProp) {
  const enteredSearchTerm = ref('');
  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }
  const activeSearchTerm = ref('');

  watch(enteredSearchTerm, (val) => {
    setTimeout(() => {
      if (val === enteredSearchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });

  const availableItems = computed(() => {
    if (activeSearchTerm.value) {
      return items.value.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    }
    return items.value;
  });
  return {
    availableItems,
    updateSearch,
    enteredSearchTerm,
  };
}
