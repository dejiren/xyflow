import { useState, useEffect } from 'react';

import { isInputDOMNode } from '../utils';
import { KeyCode } from '../types';

type ModifierKey = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey';

export const getModifierKey = (keyCode?: KeyCode): ModifierKey | undefined => {
  switch (keyCode) {
    case 'Alt':
    case 18:
      return 'altKey';
    case 'Control':
    case 17:
      return 'ctrlKey';
    case 'Meta':
    case 91:
    case 92:
    case 224:
      return 'metaKey';
    case 'Shift':
    case 16:
      return 'shiftKey';
    default:
      return undefined;
  }
};

export default (keyCode?: KeyCode): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    if (typeof keyCode !== 'undefined') {
      const modifierKey = getModifierKey(keyCode);

      const downHandler = (event: KeyboardEvent) => {
        if (!isInputDOMNode(event) && (event.key === keyCode || event.keyCode === keyCode)) {
          event.preventDefault();

          setKeyPressed(true);
        }
      };

      const upHandler = (event: KeyboardEvent) => {
        if (!isInputDOMNode(event) && (event.key === keyCode || event.keyCode === keyCode)) {
          setKeyPressed(false);
        }
      };

      const resetHandler = () => setKeyPressed(false);
      const pointerEventOptions: AddEventListenerOptions = { capture: true };

      const pointerHandler = (event: MouseEvent) => {
        if (modifierKey && !event[modifierKey]) {
          setKeyPressed(false);
        }
      };

      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);

      if (modifierKey) {
        window.addEventListener('pointerdown', pointerHandler, pointerEventOptions);
      }

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
        window.removeEventListener('blur', resetHandler);

        if (modifierKey) {
          window.removeEventListener('pointerdown', pointerHandler, pointerEventOptions);
        }
      };
    }
  }, [keyCode, setKeyPressed]);

  return keyPressed;
};
