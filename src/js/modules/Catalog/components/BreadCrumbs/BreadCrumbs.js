import React from 'react';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCatalog from '../../store/CatalogStore';
const BreadCrumbs = () => {
    const {lvl1, lvl2, lvl3, page, parent, type } = useParams() 
    const {categoriesLvl1,categoriesLvl2,categoriesLvl3} = useCatalog()
    let lvl1Title = null
    let lvl2Title = null
    let lvl3Title = null

    if(lvl1){
        lvl1Title = categoriesLvl1.filter((item) => item.Id == lvl1)[0]
    }
    if(lvl2) {
        lvl2Title = categoriesLvl2.filter((item) => item.Id == lvl2)[0]
    }
    if(lvl3) {
        lvl3Title = categoriesLvl3.filter((item) => item.Id == lvl3)[0]
    }

    return (
		<div className="breadcrumbs bread-crumbs-glb-cont">
			<div className="breadcrumbs-container">
				<div className="">
					<ul>
						<li>
							<NavLink to="/"><span>{'בית'}</span></NavLink>
						</li>
                        {lvl1Title &&
                            <li>
                                <NavLink to={`/category/catalog/${lvl1Title.Id}/0/0/1/0/he`}><span>{lvl1Title.Title}</span></NavLink>
                            </li>
                        }
                        {lvl2Title &&
                            <li>
                                <NavLink to={`/category/catalog/${lvl1Title.Id}/${lvl2Title.Id}/0/1/0/he`}><span>{lvl2Title.Title}</span></NavLink>
                            </li>
                        }
                        {lvl3Title &&
                            <li>
                                <NavLink to={`/category/catalog/${lvl1Title.Id}/${lvl2Title.Id}/${lvl3Title.Id}/1/0/he`}><span>{lvl3Title.Title}</span></NavLink>
                            </li>
                        }
					</ul>
				</div>
			</div>
		</div>
    );
};

export default BreadCrumbs;