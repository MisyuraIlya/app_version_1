import React from 'react';
import SideButton from './SideButton';
import InfoBanner from '../InfoBanner/InfoBanner';



const AgentLayout = ({children}) => {
    return (
        <div className='myLayout myDisplay'>
            <InfoBanner/>
            {children}
            <SideButton/>
        </div>
    );
};

export default AgentLayout;

