import React from 'react';
import { Provider } from 'mobx-react';
import RootStore from '../stores/RootStore';

const root = new RootStore();

const StoreProvider:React.FC = ({children}) =>  <Provider {...root}>{children}</Provider> 

export default StoreProvider;