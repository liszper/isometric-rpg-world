const createMinimap = () => {
    const minimapContainer = document.createElement('div');
    minimapContainer.id = 'minimap';
    minimapContainer.style.width = '190px';
    minimapContainer.style.height = '190px';
    minimapContainer.style.backgroundColor = '#000';
    minimapContainer.style.border = '2px solid #5D4E3C';
    minimapContainer.style.borderRadius = '50%';
    minimapContainer.style.overflow = 'hidden';
    minimapContainer.style.position = 'relative';
  
    // Placeholder for actual minimap implementation
    const minimapPlaceholder = document.createElement('div');
    minimapPlaceholder.textContent = 'Minimap';
    minimapPlaceholder.style.color = '#fff';
    minimapPlaceholder.style.display = 'flex';
    minimapPlaceholder.style.justifyContent = 'center';
    minimapPlaceholder.style.alignItems = 'center';
    minimapPlaceholder.style.width = '100%';
    minimapPlaceholder.style.height = '100%';
  
    minimapContainer.appendChild(minimapPlaceholder);
  
  // Prevent click-through
  minimapContainer.addEventListener('mousedown', (event) => {
    event.stopPropagation();
  });


    return minimapContainer;
  };
  
  export { createMinimap };