const FREQUENCY_TO_COLOR = {
    veryLow: '#FF0000',    // Red for very low frequencies
    low: '#FF7F00',        // Orange for low frequencies
    midLow: '#FFFF00',     // Yellow for mid-low frequencies
    mid: '#00FF00',        // Green for mid frequencies
    midHigh: '#0000FF',    // Blue for mid-high frequencies
    high: '#8B00FF'        // Violet for high frequencies
  };
  
  const WAVEFORM_TO_SHAPE = {
    sine: 'circle',
    square: 'square',
    sawtooth: 'triangle',
    triangle: 'diamond',
    drum: 'rectangle'
  };
  
  export function createVisualization(frequency, duration, waveform) {
    const container = document.getElementById('visualization-container') || createVisualizationContainer();
    const element = document.createElement('div');
    element.className = 'visualization-element';
    
    const shape = WAVEFORM_TO_SHAPE[waveform] || 'circle';
    element.classList.add(shape);
  
    const color = getColorForFrequency(frequency);
    element.style.backgroundColor = color;
  
    // Adjust size calculation for better visibility
    const size = Math.max(30, Math.min(80, frequency / 8));
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
  
    // Add a glow effect
    element.style.boxShadow = `0 0 10px ${color}`;
  
    element.style.transition = `opacity ${duration}s linear`;
    element.style.opacity = '0';
  
    container.appendChild(element);
    return element;
  }
  
  export function updateVisualization(element, startTime, duration, currentTime = null) {
    if (!element) return;
  
    const now = currentTime || getAudioContext().currentTime;
    const delay = Math.max(0, startTime - now);
  
    setTimeout(() => {
      element.style.opacity = '1';
      setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
          element.remove();
        }, duration * 1000);
      }, duration * 1000);
    }, delay * 1000);
  }
  
  function createVisualizationContainer() {
    const container = document.createElement('div');
    container.id = 'visualization-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    return container;
  }
  
  function getColorForFrequency(frequency) {
    if (frequency < 100) return FREQUENCY_TO_COLOR.veryLow;
    if (frequency < 200) return FREQUENCY_TO_COLOR.low;
    if (frequency < 350) return FREQUENCY_TO_COLOR.midLow;
    if (frequency < 500) return FREQUENCY_TO_COLOR.mid;
    if (frequency < 750) return FREQUENCY_TO_COLOR.midHigh;
    return FREQUENCY_TO_COLOR.high;
  }
  
  function getAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }