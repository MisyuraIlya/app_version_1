import React from 'react';
import { useAuth } from '../../../../Auth/providers/AuthProvider';

const AgentMenu = () => {
    const {isAgent} = useAuth()
    return (
        <>
            {true &&
            <>
                <div className="img icon">
                    <span className="material-symbols-outlined">menu</span>
                </div>
                <div className="about-cont-main">
                    <div className="about-sub-cont">
                        {/* {localStorage.agent && app.state.profileObj ? app.state.profileObj.map((item, key) => {
                            if(item.OnlyAgent){
                                let isGo = true;
                                if(item.OnlyAgentSuper && !JSON.parse(localStorage.agent).Super){
                                    isGo = false;
                                }
                                if(item.notForMisrad && JSON.parse(localStorage.agent).IsMisrad){
                                    isGo = false;
                                }
                                if(isGo){
                                    return (
                                        <div key={key} className="about-row">
                                            <NavLink onClick={aboutContClose} to={item.Link + app.state.lang}>
                                                <span className="material-symbols-outlined">{item.Img}</span>
                                                <p>{app.state.lang == 'he' ? item.Title : item.TitleEng}</p>
                                            </NavLink>
                                        </div>
                                    )
                                }
                                
                            }
                        }) : null} */}
                    </div>
                </div>

            </>
            }
        </>
    );
};

export default AgentMenu;