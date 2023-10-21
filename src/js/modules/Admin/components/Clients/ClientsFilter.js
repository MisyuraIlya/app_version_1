import React from 'react';
import useClientStore from '../../store/ClientsStore';

const ClientsFilter = () => {
    const {totalClients} = useClientStore()
    return (
        <div className="filter flex-container">
            <div className="col-lg-2">
                    <p onClick={() => this.updateUserList.bind(this, this.state.activeTab)}>
                        <img src={globalFileServer + 'icons/back-new.svg'} />
                        <span>חזור</span>
                    </p>
                    <p>{'נמצאו ' + totalClients + ' לקוחות'}</p>
            </div>
            {/* {this.state.activeTab != "approved" && this.state.activeTab != "waitForApprove" ?
            <div style={{display: 'flex'}} className="col-lg-10">
                <div className="col-lg-4">
                    {!this.state.back ?
                        <div className="search">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionSelected={this.onSuggestionSelected}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                highlightFirstSuggestion={true}
                            />
                        </div>
                    : null}

                </div>

                <div className="col-lg-7">
                    <ul className="filter-ul" style={{backgroundImage: 'url(' + globalFileServer + '/icons/filter.svg)'}}>
                        <li className={this.state.activeTab == "all" ? "active" : null} onClick={this.updateUserList.bind(this, "all")}>
                            <span>הכל</span>
                        </li>
                    </ul>
                </div>
            </div> : null} */}
        </div>
    );
};

export default ClientsFilter;