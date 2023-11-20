import { ref } from 'vue';

export function useRefresh() {
  const refreshKey = ref(0);
  const refresh = () => {
    refreshKey.value++;
  };

  return { refreshKey, refresh };
}
