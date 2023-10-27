import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AttributeCheckbox = ({subElement,index2}) => {

    const {location,push} = useHistory()
    const urlSearchParams = new URLSearchParams(location.search);
    const atts = urlSearchParams.get('attributes');
    const isExists = atts?.includes(subElement?.id)

    const handleFilter = () => {
        const urlSearchParams = new URLSearchParams(location.search);
        const atts = urlSearchParams.get('attributes');
        const attsArray = atts ? atts.split(',') : [];
        if (isExists) {
          const updatedAtts = attsArray.filter(id => id != subElement?.id);
          urlSearchParams.set('attributes', updatedAtts.join(','));
        } else {
          attsArray.push(subElement?.id);
          urlSearchParams.set('attributes', attsArray.join(','));
        }
        const updatedUrl = '?' + urlSearchParams.toString();
        push(location.pathname + updatedUrl);
    }


    return (
        <div key={index2} className="filter-row" onClick={()=>handleFilter()}>
            <div className={isExists ? "checkBox active" : "checkBox"}></div>
            <p>{subElement?.title}</p>
        </div>
    );
};

export default AttributeCheckbox;