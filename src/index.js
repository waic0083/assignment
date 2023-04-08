import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

class ErrorCatch extends React.Component {
  state = {
    hasError: false
  }
  componentDidCatch(error) {
    console.error(error);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const {hasError} = this.state;
    return hasError ? <div>Oops!<br/>Error page !</div> : this.props.children;
  }
}

root.render(
  <Provider store={store}>
    <ErrorCatch>
      <App />
    </ErrorCatch>
  </Provider>
);