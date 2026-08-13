import { KeyCode } from '../types';
type ModifierKey = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey';
export declare const getModifierKey: (keyCode?: KeyCode) => ModifierKey | undefined;
declare const _default: (keyCode?: KeyCode) => boolean;
export default _default;
