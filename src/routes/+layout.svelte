<script>
    import { browser } from '$app/environment';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import '../app.css';
  
    // State for theme management using runes
    let isDarkMode = $state(false);
    let themeLink = $state(null);
  
    // Effect to apply the theme when isDarkMode changes
    $effect(() => {
      if (browser) {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('glideui-theme', isDarkMode ? 'dark' : 'light');
      }
    });
  
    // Effect to load the initial theme from localStorage or system preference
    $effect(() => {
      if (browser) {
        const savedTheme = localStorage.getItem('glideui-theme');
        if (savedTheme) {
          isDarkMode = savedTheme === 'dark';
        } else {
          isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
      }
    });
  
    // Function to create and manage the theme stylesheet link
    function switchTheme(themeName) {
      if (!browser) return;
      
      // Remove existing theme link if it exists
      const existingLink = document.head.querySelector('link[data-theme-link]');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
  
      // Create and append the new theme link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/themes/${themeName}.css`;
      link.setAttribute('data-theme-link', 'true');
      document.head.appendChild(link);
    }
    
    // Initial theme load
    $effect(() => {
        switchTheme('yellow'); // Default theme
    });
  
  </script>
  
  <div class="sg-wrapper">
    <Sidebar />
  
    <main class="sg-main">
      <slot />
    </main>
  </div>