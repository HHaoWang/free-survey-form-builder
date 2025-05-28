import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

export function useThemeMode() {
  const mode = ref<'auto' | 'dark' | 'light'>('auto');
  const browserPrefersTheme = ref<'dark' | 'light'>('light');
  const displayMode = computed(() => {
    // 如果用户设置了主题模式，则使用用户设置的模式
    if (mode.value !== 'auto') {
      return mode.value;
    }
    // 否则根据浏览器的主题模式自动设置
    return browserPrefersTheme.value;
  });

  /**
   * 修改html的主题模式
   * @param newMode 变更后的模式
   */
  const changeActualMode = (newMode: 'dark' | 'light') => {
    const isDarkMode = newMode === 'dark';

    document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '');
  };

  /**
   * 监听用户主题模式设置改变
   */
  watch(displayMode, changeActualMode);

  /**
   * 浏览器主题模式变化时通知store更新计算值
   */
  const onBrowserThemeModeBecomeDark = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    browserPrefersTheme.value = isDarkMode ? 'dark' : 'light';
  };

  onMounted(() => {
    //添加系统主题模式监听器
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onBrowserThemeModeBecomeDark);
    //首次打开时根据用户设置设置主题模式
    changeActualMode(displayMode.value);
  });
  onUnmounted(() => {
    //移除系统主题模式监听器
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onBrowserThemeModeBecomeDark);
  });
  return { displayMode };
}
