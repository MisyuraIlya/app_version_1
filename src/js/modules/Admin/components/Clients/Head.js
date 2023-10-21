import React from 'react';

const Head = () => {
    return (
        <div className="heading">
            <div className="flex-container">
                <div className="col-lg-2">
                    <div className="wrapp">
                        <p>מס'</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="wrapp">
                        <p>לקוח</p>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="wrapp">
                        <p>סטאטוס</p>
                    </div>
                </div>
                <div className="col-lg-1">
                    <div className="wrapp">
                        <p>מידע</p>
                    </div>
                </div>
                <div className="col-lg-1">
                    <div className="wrapp">
                        <p>פעולות</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;