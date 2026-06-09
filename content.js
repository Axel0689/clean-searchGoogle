const CLEAR_BUTTON_ID = 'google-clear-history-btn';
const GOOGLE_RED = '#d93025';
const GOOGLE_RED_HOVER = '#b3261e';
const GOOGLE_GRAY = '#5f6368';
const GOOGLE_GREEN = '#188038';
const DELETE_DELAY_MS = 150;
const BUTTON_CHECK_INTERVAL_MS = 2000;
const CLICK_SEQUENCE = [
  'pointerover',
  'mouseover',
  'pointerdown',
  'mousedown',
  'pointerup',
  'mouseup',
  'click',
];

function injectClearButton() {
  if (document.getElementById(CLEAR_BUTTON_ID)) {
    return;
  }

  document.body.appendChild(createClearButton());
}

function createClearButton() {
  const button = document.createElement('button');
  button.id = CLEAR_BUTTON_ID;
  button.textContent = 'Svuota Ricerche';
  button.setAttribute('aria-label', 'Svuota ricerche Google');

  Object.assign(button.style, {
    position: 'fixed',
    bottom: '60px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: GOOGLE_RED,
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    zIndex: '999999',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.2s',
  });

  button.addEventListener('mouseover', () => setButtonColor(button, GOOGLE_RED_HOVER));
  button.addEventListener('mouseout', () => setButtonColor(button, GOOGLE_RED));
  button.addEventListener('click', clearHistory);

  return button;
}

function clearHistory() {
  const button = document.getElementById(CLEAR_BUTTON_ID);

  if (!button) {
    return;
  }

  const initialText = button.textContent;
  let deletedCount = 0;

  showCleaningState(button);

  function deleteNextSearch() {
    const deleteButton = findNextDeleteButton();

    if (!deleteButton) {
      showCompletionState(button, initialText, deletedCount);
      return;
    }

    clickElement(deleteButton);
    deletedCount += 1;

    setTimeout(deleteNextSearch, DELETE_DELAY_MS);
  }

  deleteNextSearch();
}

function findNextDeleteButton() {
  return findLeafDeleteButtons()[0];
}

function findLeafDeleteButtons() {
  const deleteButtons = findDeleteButtons();

  return deleteButtons.filter((button) => (
    !Array.from(button.children).some((child) => deleteButtons.includes(child))
  ));
}

function findDeleteButtons() {
  const possibleElements = document.querySelectorAll('span, a, div');

  return Array.from(possibleElements).filter(isDeleteButton);
}

function isDeleteButton(element) {
  const text = element.textContent?.trim().toLowerCase() ?? '';
  const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() ?? '';

  return text === 'elimina' || ariaLabel.includes('elimina');
}

function clickElement(element) {
  CLICK_SEQUENCE.forEach((eventType) => {
    element.dispatchEvent(new MouseEvent(eventType, {
      bubbles: true,
      cancelable: true,
      view: window,
      buttons: 1,
    }));
  });
}

function showCleaningState(button) {
  button.textContent = 'Pulizia...';
  setButtonColor(button, GOOGLE_GRAY);
}

function showCompletionState(button, initialText, deletedCount) {
  if (deletedCount === 0) {
    alert('Nessuna vecchia ricerca trovata.\n\nConsiglio: clicca sulla barra di ricerca per aprire la tendina prima di premere questo pulsante.');
    resetButton(button, initialText);
    return;
  }

  button.textContent = `${deletedCount} eliminate`;
  setButtonColor(button, GOOGLE_GREEN);

  setTimeout(() => resetButton(button, initialText), 2500);
}

function resetButton(button, text) {
  button.textContent = text;
  setButtonColor(button, GOOGLE_RED);
}

function setButtonColor(button, color) {
  button.style.backgroundColor = color;
}

injectClearButton();
setInterval(injectClearButton, BUTTON_CHECK_INTERVAL_MS);
