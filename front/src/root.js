import React from 'react';
import ReactDOM from 'react-dom';
import Checkin from './entry/checkin';
import SignUp from './entry/signup';

import Routes from './router';

//ReactDOM.render(<Checkin />, document.getElementById('ForYou'));
//ReactDOM.render(<SignUp />, document.getElementById('ForYou'));
ReactDOM.render(<Routes />, document.getElementById('ForYou'));

