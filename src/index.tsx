import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import { Header } from './components/Header';
import StudentGrid from './components/StudentGrid';
import Summary from './components/Summary';
import { store } from './store/store';

class Index extends React.PureComponent {
  render() {
    return (
      <div className ="container">
        <Header />
        <div>
          <Summary/>
          <StudentGrid/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store = {store}>
    <Index/>
  </Provider>,
  document.getElementById('app')
);
