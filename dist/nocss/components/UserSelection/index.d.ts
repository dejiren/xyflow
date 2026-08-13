/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
import React from 'react';
import { KeyCode } from '../../types';
type UserSelectionProps = {
    selectionKeyPressed: boolean;
    selectionKeyCode?: KeyCode;
};
declare const _default: React.MemoExoticComponent<({ selectionKeyPressed, selectionKeyCode }: UserSelectionProps) => React.JSX.Element | null>;
export default _default;
