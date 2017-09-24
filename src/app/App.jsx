import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

const App = () => (
    <div>
        <Link to="/photo">Photo services</Link>
        <Link to="/travel">Travel blog</Link>
    </div>
)

export default App;
