import React from 'react';

const Container = ({children}) => {
    return (
        <div className={localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super && !JSON.parse(localStorage.agent).IsMisrad) ? 'container agent-container flex-container break-display' : 'container agent-container '}>
            {children}
        </div>
    );
};

export default Container;