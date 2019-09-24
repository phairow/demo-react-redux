import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { simpleAction } from './actions/simpleAction';

function App({ dispatch, result }) {
  const [greeting, setGreeting] = useState(
    'Hello Function Component!'
  );

  let simpleActionClickHandler = (event) => {
    setGreeting('test this')
    dispatch(simpleAction());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={simpleActionClickHandler}>Test redux action</button>
<pre>
{
  JSON.stringify(simpleAction)
}
</pre>
<pre>
{
  JSON.stringify(result)
}
</pre>
      </header>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);