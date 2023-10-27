import React from 'react';
import useCatalog from '../../../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AttributeCheckbox from './AttributeCheckbox';

const Filters = () => {
    const {attributes} = useCatalog()
    return (
        <>
        {attributes?.map((element,index) => {
                return(
                <div key={index} className="filter-cont">
                    <h2 className="filter-main_title">{element?.title}</h2>
                    <div className="filter-box-cont">
                      {element?.SubAttributes?.map((subElement,index2) => 
                        <AttributeCheckbox subElement={subElement} index2={index2}/>
                      )}
                    </div>
                </div>
                )
            })
        }   
        </>
    );
};

export default Filters;