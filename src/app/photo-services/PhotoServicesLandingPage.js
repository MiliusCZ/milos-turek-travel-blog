import React from 'react';
import './PhotoServicesLandingPage.css';
import facebook from './facebook.svg';

const PhotoServicesLandingPage = () => (
    <div className="app">
        <div className="content">
            <h1>www.milosturek.cz</h1>
            <p>
              Dobrý den, v současné době je nabídka fotografických služeb pozastavena.
            </p>
            <div className="contact">
                <a href="https://www.facebook.com/MilosTurekFotograf/"><img src={facebook} alt="FB" /><span>/MilosTurekFotograf</span></a>
            </div>
        </div>
    </div>
);

export default PhotoServicesLandingPage;
