import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

const App = () => {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7d40ef" />
    <Routes />
    </>
  );
};

export default App;