import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';

declare global {
  interface Window {
    renderLogin: (containerId: string) => void;
    unmountLogin: (containerId: string) => void;
  }
}

window.renderLogin = (containerId) => {
  ReactDOM.render(<ChakraProvider><App /></ChakraProvider>, document.getElementById(containerId)
  );
};

window.unmountLogin = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) {
    return;
  }

  ReactDOM.unmountComponentAtNode(el);
};
