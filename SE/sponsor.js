document.querySelectorAll('.contact-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    const tooltipText = icon.getAttribute('title');
    icon.setAttribute('data-tooltip', tooltipText);
    icon.removeAttribute('title');
  });

  icon.addEventListener('mouseleave', () => {
    icon.setAttribute('title', icon.getAttribute('data-tooltip'));
    icon.removeAttribute('data-tooltip');
  });
});