import React from 'react';

const Heading = () => {
    return (
		<div className="heading" style={{paddingTop:'20px'}}>
			<div style={{alignItems: 'flex-end'}} className="flex-container">
				<div className="col-lg-1">
					<p>סדר</p>
				</div>
				<div className="col-lg-1">
					<p>תמונה</p>
				</div>
				<div className="col-lg-1">
					<p>גלריה</p>
				</div>
				<div className="col-lg-3 title">
					<p style={{textAlign: 'right'}}>כותרת</p>
				</div>
                <div className="col-lg-2 title">
					<p style={{textAlign: 'right'}}>מק״ט</p>
				</div>
                <div className="col-lg-1 title">
                    <p style={{textAlign: 'right'}}></p>
                </div>
				<div className="col-lg-3">
					<div style={{alignItems: 'flex-end'}} className="flex-container">

						<div className="col-lg-3">

						</div>
						<div className="col-lg-3">
 
						</div>

						<div className="col-lg-3">
							<p>סטאטוס</p>
						</div>
						<div className="col-lg-3">
      
						</div>
					</div>
				</div>
			</div>
		</div>
    );
};

export default Heading;