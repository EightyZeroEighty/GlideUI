<script>
    import { page } from '$app/stores';
  
    const mainLinks = [
      { href: '/', title: 'Introduction' },
      { href: '/typography', title: 'Typography' },
      { href: '/colors', title: 'Colors' },
      // ... more foundation links
    ];
  
    const componentLinks = [
      { href: '/buttons', title: 'Buttons' },
      { href: '/cards', title: 'Cards' },
      // ... more component links
    ];
  
    // A rune to compute the active status based on the current path
    const isActive = (path) => $derived(path === $page.url.pathname);
  </script>
  
  <nav class="sg-sidebar">
    <h2 class="sg-sidebar-title">GlideUI</h2>
    <ul>
      {#each mainLinks as link}
        <li>
          <a href={link.href} class:active={isActive(link.href)}>{link.title}</a>
        </li>
      {/each}
    </ul>
  
    <h3 class="sg-sidebar-subtitle">Components</h3>
    <ul>
      {#each componentLinks as link}
        <li>
          <a href={link.href} class:active={isActive(link.href)}>{link.title}</a>
        </li>
      {/each}
    </ul>
  </nav>
  
  <style>
    .sg-sidebar-subtitle {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-neutral-500);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: var(--space-l);
      margin-bottom: var(--space-s);
      padding-left: var(--space-s);
    }
  </style>