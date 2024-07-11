import {useContext} from 'react';
import {LayoutContext} from '../layout/layoutContext';

export const useLayout = () => useContext(LayoutContext);
