import ReactDOM from "react-dom";
import React, {Component, Fragment, useState, useEffect, useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import SweetAlert from 'sweetalert2';
import { element } from "prop-types";

let timeoutId;

const SearchHookFindUser= params =>
	{
		const [search, setSearch] = useState('');
		const [searchMode, setSearchMode] = useState(0);
		const [preload, setPreload] = useState('');

		useEffect(() => {
			setSearch(params.initSearchVal.ClientName);
			return () => {
				clearTimeout(timeoutId);
			}
		}, []);

		const goInactive = word => {
			params.searchPhpFunc(word, searchMode);
		}
		const setWord = word => {
			clearTimeout(timeoutId);
			setSearch(word);
			timeoutId = setTimeout(() => goInactive(word), 500);
			if (word == "") {
				goInactive(word);
			}
		}
		const setMode = mode => {
			setSearchMode(mode);
			setSearch("");
		}
		const emptySearch = () => {
			setWord('');
			//params.closeSearchMob();
		}
		const setSelectedValInSearch = (item) => {

			setSearch(item.Name);
			params.changeState(item);

		}
		const blurInputFunc = () =>{
			if(search==''){
				setSearch(params.initSearchVal.ClientName);
				let selectedUser = {
					'ExId': params.initSearchVal.ExId
				  }
				params.changeState(selectedUser);
			}
			
		}

		

		return (
			<div className="search-cont-main">
				{localStorage.user || localStorage.agent || localStorage.role ? 
					<div className="search-cont">
						<div className="input">
							<input
								onChange={e => setWord(e.target.value)}
								onBlur={() => setTimeout(blurInputFunc, 100)}
								value={search}
								type="text"
								placeholder={ "חיפוש"}
							/>
							{search == ""  ?
								<span className="material-symbols-outlined search-img">search</span>
								:
								<span className="material-symbols-outlined search-img"
									onClick={() => emptySearch()}>close</span>
							}

						</div>
						{search ?
							<div className="searchRes-cont">
								{params.preload ?
									<div className="spinner-wrapper search-header">
										<div className="spinner">
											<div className="bounce1"></div>
											<div className="bounce2"></div>
											<div className="bounce3"></div>
										</div>
									</div>
									: null}
								{params.searchProds && params.searchProds.length ? params.searchProds.map((item, key) => {
									if (key < 5) {
										return (
											<div key={key} className="searchRes-row flex-container"
												onClick={() => setSelectedValInSearch(item)}>
												<div className="content col-lg-12">
													<p className="catalog">{item.Name}</p>
												</div>
												
											</div>
										)
									}
								}) : null}

								{!params.searchProds  && (params.showNotFound || params.preload) ?
									<div className="all-res-cont not-found">
										<p>{"לא נמצאו תוצאות"}</p>
									</div>
									: null}
							</div>
							: null}
					</div>
				:null}
			</div>
		);
	}

export default SearchHookFindUser;
