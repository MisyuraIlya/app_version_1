import React from 'react';
import { NavLink } from "react-router-dom";
import useDocuments from '../../store/DocumentsStore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DocsHead = () => {
    const {activeTab,setActiveTab} = useDocuments()
    const history = useHistory()

    const handleChange = (type) => {
        history.push(type)
        setActiveTab(type)
    }
    
    return (
        <div className="tabs-main-cont">
            <div className="tabs-main-subcont">
                <div className="tab-cont">
                    <div onClick={() => handleChange('/docsNew/1/he')}>
                        <p className={activeTab == '/docsNew/1/he' ? "active" : null} >{"מסמכים"}</p>
                    </div>
                </div>
                <div className="tab-cont">
                    <div onClick={() => handleChange('/docsHistory/1/he')}>
                        <p className={activeTab == '/docsHistory/1/he' ? "active" : null} >{"מסמכי Web"}</p>
                    </div>
                </div>
                <div className="tab-cont">
                    <div onClick={() => handleChange('/docsKarteset/1/he')}>
                        <p className={activeTab == '/docsKarteset/1/he' ? "active" : null} >{"כרטסת"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocsHead;