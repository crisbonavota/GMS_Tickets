import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

declare global {
  interface Window {
    renderTimetrack: (containerId: string) => void;
    unmountTimetrack: (containerId: string) => void;
  }
}

window.renderTimetrack = (containerId) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(containerId)
  );
};

window.unmountTimetrack = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) {
    return;
  }

  ReactDOM.unmountComponentAtNode(el);
};