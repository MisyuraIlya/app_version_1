import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import GalaxyVideo from '../../../../components/routs/GalaxyVideo';
import { useAuth } from '../../../Auth/providers/AuthProvider';
const VideoSection = () => {
    const {user} = useAuth()
    return (
    <section id="page1-my" className="section entry-section">
        <GalaxyVideo /> 
        <div className={true? "showcase animated fadeInDown" : "showcase"}>
            <h1 className="h1-2">{'חליטות תה מיוחדות ומוצרי ומארזי חליטות תה מהודרים לקהל הפרטי והעסקי'}</h1>
            {user &&
            <NavLink to={'/client/catalog/1/0/0?page=1'}>
                <div className="button-cls">
                    <p>{'לקטלוג המלא'}</p>
                </div>
            </NavLink>
            }

        </div>
    </section>
    );
};

export default VideoSection;