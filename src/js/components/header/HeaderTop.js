import React, { Component, useState, useEffect, useContext } from "react";
import UserContext from '../../UserContext';
import { NavLink, useHistory } from "react-router-dom";
import LoginButton from './LoginButton';
import ProductCard from "../ProductCard";
import Preload from "../../tools/Preload";

let timeoutId;

const SearchHook = (params) => {

	const app =  useContext(UserContext);

	const [search, setSearch] = useState('');
	const [parts, setParts] = useState([]);
	const [preload, setPreload] = useState(true);

	useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    if (app.state.search) {
      app.toggleSearch();
      clear();
      console.log('clear');
    }
  }, [app.state.search]);

  const clear = () => {
    setSearch('');
    setParts([]);
  }

	const goInactive = word => {
		searchFunc(word);
	}

	const setWord = word => {
		clearTimeout(timeoutId);
		setSearch(word);
		timeoutId = setTimeout(() => goInactive(word), 500);
	}

	const searchFunc = async(word) => {
		setPreload(true);
		if (!word || word.length < 2) {
			setParts([]);
			setPreload(false);
			return false;
		}
		let val = {
			point: 'ProductItems',
			funcName: 'ProductSearch',
			word: word
		};
		try {
			const data = await app.ajax(val);
			setParts(data.items);
			setTimeout(() => setPreload(false), 100);
		} catch(err) { console.log('search'); }
	}

	const onBlur = (e) => {
		if (!e.target.value) {
			clear();
		}
	}

	const css = `
		.list-items {
			overflow-y: hidden !important;
			height: 80vh;
		}
	`;

	return(
		<div className="search">
			{preload ? <style>{ css }</style> : null}
			<div className="search-wrapp">
				<input
          required
					id="main_search"
					onChange={ e => setWord(e.target.value) }
					onBlur={ e => onBlur(e) }
					value={search}
					type="text"
					placeholder="חיפוש מוצר..."
				/>
				{search ?
					<img className="icon close" onClick={ e => setWord('') } src={globalFileServer + "icons/close.svg"} alt=""/>
				:
				<img className="icon" src={globalFileServer + 'icons/search-white.svg'} alt=""/>
				}
			</div>
      {parts.length || search ?
			<div className="list-items scrollbar flex-container">
				<h1 className="s-title">
					<span>חיפוש מוצרים...</span>
					<img onClick={ e => setWord('') } src={globalFileServer + 'icons/back.svg'} alt=""/>
				</h1>
				<Preload preload={preload} />
				{parts.map((element, index) => {
					return(
						<ProductCard item={element} key={index} />
					)
				})}
			</div>
      : null}
		</div>
	);
}

const HeaderTop = (params) => {

  const app = useContext(UserContext);

  return (
    <div className="top-header">
      <div className="top-header-w container flex-container">
        <div className="item">
          <ul>
            {app.whoIs().mobile ?
              <li onClick={params.toggleNav}>
                <img style={{width: '34px'}} src={globalFileServer + 'icons/nav.svg'} alt=""/>
              </li>
            : null}
            <li>
							<NavLink to="/wish-list">
	              <img className="icon" style={{marginLeft: '10px'}} src={globalFileServer + 'icons/favorit.svg'} alt=""/>
	              {!app.whoIs().mobile ?
	                <span>מועדפים</span>
	              : null}
							</NavLink>
            </li>
            {!app.whoIs().mobile ?
              <LoginButton />
            : null}
            {app.whoIs().type === 'user' && !app.whoIs().mobile ?
            <li>
              <NavLink to="/user-history">
                <span>הזמנות קודמות</span>
              </NavLink>
            </li>
            : null}
          </ul>
        </div>
        <div className="item">
          <div className="logo">
            <NavLink to="/">
              <img src={globalFileServer + 'logo.svg'} alt=""/>
            </NavLink>
          </div>
        </div>
        <div className="item">
          <ul>
            <li>
              <SearchHook />
            </li>
            <li className="toggleCart" id="toggleCart" data-quantity={app.state.products.length} onClick={params.toggleCart}>
              <img className="icon" src={globalFileServer + 'icons/cart-white.svg'} alt=""/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
