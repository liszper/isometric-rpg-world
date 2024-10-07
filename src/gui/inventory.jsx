import { h } from 'preact';
import { useState } from 'preact/hooks';

const InventorySlot = ({ item }) => (
  <div className="inventory-slot">
    {item && <img src={item.icon} alt={item.name} />}
  </div>
);

const EquipmentSlot = ({ type, item }) => (
  <div className={`equipment-slot ${type}`}>
    {item && <img src={item.icon} alt={item.name} />}
  </div>
);

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState(Array(40).fill(null));
  const [equippedItems, setEquippedItems] = useState({
    weapon: null,
    shield: null,
    helmet: null,
    armor: null,
    boots: null,
    gloves: null,
    belt: null,
    amulet: null,
    ring1: null,
    ring2: null,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleInventory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="inventory-trigger" onClick={toggleInventory}>
        {isOpen ? '>' : '<'}
      </button>
      <div className={`inventory-container ${isOpen ? 'open' : ''}`}>
        <div className="inventory-content">
          <div className="equipment-section">
            <EquipmentSlot type="weapon" item={equippedItems.weapon} />
            <EquipmentSlot type="helmet" item={equippedItems.helmet} />
            <EquipmentSlot type="shield" item={equippedItems.shield} />
            <EquipmentSlot type="armor" item={equippedItems.armor} />
            <EquipmentSlot type="gloves" item={equippedItems.gloves} />
            <EquipmentSlot type="belt" item={equippedItems.belt} />
            <EquipmentSlot type="boots" item={equippedItems.boots} />
            <EquipmentSlot type="amulet" item={equippedItems.amulet} />
            <EquipmentSlot type="ring1" item={equippedItems.ring1} />
            <EquipmentSlot type="ring2" item={equippedItems.ring2} />
          </div>
          <div className="inventory-grid">
            {inventoryItems.map((item, index) => (
              <InventorySlot key={index} item={item} />
            ))}
          </div>
          <div className="inventory-controls">
            <div className="control-button"></div>
            <div className="gold-display"></div>
            <div className="control-button"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Inventory };