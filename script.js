document.addEventListener('DOMContentLoaded', function () {
  // --- Current Year for Footer ---
  const yearSpan = document.getElementById('currentYear')
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }

  // --- Modal Functionality ---
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]')
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]')
  const modalOverlays = document.querySelectorAll('.modal-overlay')

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalTrigger
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add('is-active')
        const firstFocusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (firstFocusableElement) {
          firstFocusableElement.focus()
        }
      }
    })
  })

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('is-active')
      const trigger = document.querySelector(`[data-modal-trigger="${modal.id}"]`)
      if (trigger) {
        trigger.focus()
      }
    }
  }

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-overlay')
      closeModal(modal)
    })
  })

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeModal(overlay)
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.is-active')
      if (activeModal) {
        closeModal(activeModal)
      }
    }
  })

  // --- Tab Functionality ---
  const tabNavs = document.querySelectorAll('.tab-nav')
  tabNavs.forEach((tabNav) => {
    const tabLinks = tabNav.querySelectorAll('.tab-link')
    tabLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        const currentTabNav = link.closest('.tab-nav')
        const currentTabContentWrapper = currentTabNav.nextElementSibling

        currentTabNav.querySelectorAll('.tab-link').forEach((tl) => tl.classList.remove('active'))
        if (currentTabContentWrapper) {
          currentTabContentWrapper.querySelectorAll('.tab-pane').forEach((tp) => tp.classList.remove('active'))
        }

        link.classList.add('active')
        const targetPaneId = link.dataset.tabTarget
        if (targetPaneId) {
          const targetPane = document.querySelector(targetPaneId)
          if (targetPane) {
            targetPane.classList.add('active')
          }
        }
      })
    })
  })

  // --- Dropdown Menu Functionality ---
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger')
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      const dropdown = trigger.closest('.dropdown')
      // Close other open dropdowns
      document.querySelectorAll('.dropdown.is-active').forEach((openDropdown) => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('is-active')
          const otherTrigger = openDropdown.querySelector('.dropdown-trigger')
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false')
        }
      })
      // Toggle current dropdown
      const isActive = dropdown.classList.toggle('is-active')
      trigger.setAttribute('aria-expanded', isActive.toString())
    })
  })

  document.addEventListener('click', (event) => {
    const openDropdowns = document.querySelectorAll('.dropdown.is-active')
    openDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-active')
        const trigger = dropdown.querySelector('.dropdown-trigger')
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false')
        }
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openDropdowns = document.querySelectorAll('.dropdown.is-active')
      openDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-active')
        const trigger = dropdown.querySelector('.dropdown-trigger')
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false')
          trigger.focus()
        }
      })
    }
  })

  // --- Accordion Functionality ---
  const accordionHeaders = document.querySelectorAll('.accordion-header')
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement
      const content = header.nextElementSibling
      const isActive = accordionItem.classList.toggle('is-active')
      header.setAttribute('aria-expanded', isActive.toString())

      if (isActive) {
        content.style.maxHeight = content.scrollHeight + 'px'
        setTimeout(() => {
          content.style.paddingTop = 'var(--accordion-item-padding-y)'
          content.style.paddingBottom = 'var(--accordion-item-padding-y)'
        }, 50)
      } else {
        content.style.maxHeight = '0'
        content.style.paddingTop = '0'
        content.style.paddingBottom = '0'
      }
    })
  })

  // --- Theme Toggle Functionality ---
  const themeToggleButton = document.getElementById('theme-toggle')
  const sunIcon = document.getElementById('theme-toggle-sun')
  const moonIcon = document.getElementById('theme-toggle-moon')
  const toggleText = document.getElementById('theme-toggle-text')
  const body = document.body

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode')
      sunIcon.style.display = 'inline-block'
      moonIcon.style.display = 'none'
      toggleText.textContent = 'Switch to Light Mode'
    } else {
      body.classList.remove('dark-mode')
      sunIcon.style.display = 'none'
      moonIcon.style.display = 'inline-block'
      toggleText.textContent = 'Switch to Dark Mode'
    }
    localStorage.setItem('glideui-theme', theme)
  }

  themeToggleButton.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark'
    applyTheme(newTheme)
  })

  // Initialize theme on page load
  const savedTheme = localStorage.getItem('glideui-theme')
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme) {
    applyTheme(savedTheme)
  } else if (prefersDark) {
    applyTheme('dark')
  } else {
    applyTheme('light') // Default to light if no preference
  }

  // --- Slider Value Display ---
  const slider1 = document.getElementById('slider-1')
  const sliderValue1 = document.getElementById('slider-value-1')
  if (slider1 && sliderValue1) {
    slider1.addEventListener('input', () => {
      sliderValue1.textContent = slider1.value
    })
  }

  // --- Snackbar/Toast Functionality ---
  const showSnackbarButton = document.getElementById('show-snackbar')
  const snackbar = document.getElementById('sample-snackbar')
  if (showSnackbarButton && snackbar) {
    let snackbarTimeout
    showSnackbarButton.addEventListener('click', () => {
      // Clear any existing timeout to prevent multiple overlapping timeouts
      clearTimeout(snackbarTimeout)

      snackbar.classList.add('is-active')

      // Hide snackbar after 3 seconds
      snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove('is-active')
      }, 3000)
    })
  }
})
