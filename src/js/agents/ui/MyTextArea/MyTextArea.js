import React from 'react';

const MyTextArea = ({state,setState,placeholder,props}) => {
    return (
        <div className='TextArea'>
            <textarea placeholder={placeholder} value={state} onChange={(e) => setState(e.target.value)} {...props}/>
        </div>
    );
};

export default MyTextArea;