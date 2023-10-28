import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import GalaxyVideo from '../../../../components/routs/GalaxyVideo';
const VideoSection = () => {
    return (
    <section id="page1-my" className="section entry-section">
        <GalaxyVideo /> 
        <div className="scroll-down-cont">
            <span className="material-symbols-outlined">mouse</span>
        </div>
        <div className={true? "showcase animated fadeInDown" : "showcase"}>
            <h1 className="h1-2">{'חליטות תה מיוחדות ומוצרי ומארזי חליטות תה מהודרים לקהל הפרטי והעסקי'}</h1>
            <NavLink to={'/category/catalog/0/0/0/1/0/'}>
                <div className="button-cls">
                    <p>{'לקטלוג המלא'}</p>
                </div>
            </NavLink>
        </div>
    </section>
    );
};

export default VideoSection;