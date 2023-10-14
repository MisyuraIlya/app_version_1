import React from 'react';
import { NavLink } from "react-router-dom";

const BreadCrumbs = () => {
    return (
		<div className="breadcrumbs bread-crumbs-glb-cont">
			<div className="breadcrumbs-container">
				<div className="">
					<ul>
						<li>
							<NavLink to="/"><span>{'בית'}</span></NavLink>
						</li>
						{/* {breadCrumbsNav.map((element, index) => {
							return(
								<li key={index}>
									{element.Link ?
										<NavLink to={element.Link + params.searchQuery}>{params.lang == 'he' ? element.Title : element.TitleEng}</NavLink>
										: <span>{params.lang == 'he' ? element.Title : element.TitleEng}</span>}
								</li>
							);
						})} */}
					</ul>
				</div>
			</div>
		</div>
    );
};

export default BreadCrumbs;