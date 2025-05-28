'use strict';

// --------------------
// Element toggler
// --------------------
const toggleClass = (el, cls) => el?.classList.toggle(cls);

// --------------------
// Sidebar toggle
// --------------------
const sidebar      = document.querySelector('[data-sidebar]');
const sidebarBtn   = document.querySelector('[data-sidebar-btn]');
sidebarBtn?.addEventListener('click', () => toggleClass(sidebar, 'active'));

// --------------------
// Dropdown (custom select)
// --------------------
const selectBtn    = document.querySelector('[data-select]');
const selectList   = document.querySelector('.select-list');
const selectValue  = document.querySelector('[data-select-value]');
const selectItems  = document.querySelectorAll('[data-select-item]');

// If dropdown exists, wire it up:
if (selectBtn && selectList && selectValue) {
  // 1) Open/close on button click
  selectBtn.addEventListener('click', () => selectBtn.classList.toggle('active'));

  // 2) Close when clicking outside
  document.addEventListener('click', e => {
    if (!selectBtn.contains(e.target) && !selectList.contains(e.target)) {
      selectBtn.classList.remove('active');
    }
  });

  // 3) When an item is clicked
  selectItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category?.toLowerCase() || 'all';
      selectValue.textContent = item.textContent;
      selectBtn.classList.remove('active');
      applyFilter(category);
      // update large-screen filter buttons if any
      updateFilterButtons(category);
    });
  });
}

// --------------------
// Filter buttons (for wider screens)
// --------------------
const filterBtns = document.querySelectorAll('[data-filter-btn]');
let lastFilterBtn = filterBtns[0];

function updateFilterButtons(category) {
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category?.toLowerCase() === category);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category?.toLowerCase() || btn.innerText.toLowerCase();
    selectValue && (selectValue.textContent = btn.innerText);
    applyFilter(category);
    lastFilterBtn?.classList.remove('active');
    btn.classList.add('active');
    lastFilterBtn = btn;
  });
});

// --------------------
// Core filtering logic
// --------------------
const filterItems = document.querySelectorAll('[data-filter-item]');
function applyFilter(selectedValue) {
  filterItems.forEach(card => {
    const cat = card.dataset.category?.toLowerCase();
    const visible = selectedValue === 'all' || selectedValue === cat;
    card.classList.toggle('active', visible);
  });
}

// --------------------
// Contact form validation
// --------------------
document.addEventListener('DOMContentLoaded', () => {
  const form      = document.querySelector('[data-form]');
  const inputs    = document.querySelectorAll('[data-form-input]');
  const submitBtn = document.querySelector('[data-form-btn]');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    inputs.forEach(i => {
      if (!i.value.trim()) {
        i.style.borderColor = 'red';
        valid = false;
      } else {
        i.style.borderColor = '#ccc';
      }
    });

    if (valid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    } else {
      alert('Please fill in all fields correctly.');
    }
  });
});

// --------------------
// Page navigation
// --------------------
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages    = document.querySelectorAll('[data-page]');

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    pages.forEach((page, i) => {
      const show = link.innerText.toLowerCase() === page.dataset.page;
      page.classList.toggle('active', show);
      navLinks[i].classList.toggle('active', show);
    });
    window.scrollTo(0, 0);
  });
});
