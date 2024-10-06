const createInventory = () => {
    const inventoryContainer = document.createElement('div');
    inventoryContainer.id = 'inventory';
    inventoryContainer.style.width = '190px';
    inventoryContainer.style.height = '260px';
    inventoryContainer.style.backgroundColor = '#3E3529';
    inventoryContainer.style.border = '2px solid #5D4E3C';
    inventoryContainer.style.padding = '5px';
    inventoryContainer.style.display = 'grid';
    inventoryContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    inventoryContainer.style.gap = '2px';
  
      // Prevent click-through
  inventoryContainer.addEventListener('mousedown', (event) => {
    event.stopPropagation();
  });

    // Create 28 inventory slots
    for (let i = 0; i < 28; i++) {
      const slot = document.createElement('div');
      slot.style.backgroundColor = '#5D4E3C';
      slot.style.aspectRatio = '1';
      inventoryContainer.appendChild(slot);
    }
  
    return inventoryContainer;
  };
  
  export { createInventory };