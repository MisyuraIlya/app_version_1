import React from 'react';
import useAdminOrders from '../../store/OrdersStore';

const OrdersFilter = () => {
    const {serach,setSearch} = useAdminOrders()
    return (
        <div className="for-calendar flex-container card">
            <div className="flex-container right-side-header col-lg-7">
                <div className={"flex-container col-lg-12 docs-agent-header-cls"}>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">מתאריך</p>
                            <button className="inline-cls" onClick={() => this.selectDate.bind(this,'from')}>
                                <span class="material-symbols-outlined googleHoverIcon" style={{fontSize:'30px'}}>calendar_month</span>
                            {/* <span>{this.state.date.toLocaleDateString('he-IL').split('.').join('/')}</span> */}
                            </button>
                        </div>
                    </div>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">לתאריך</p>
                            <button className="inline-cls" onClick={() => this.selectDate.bind(this,'to')}>
                                <span class="material-symbols-outlined googleHoverIcon" style={{fontSize:'30px'}}>calendar_month</span>
                            {/* <span>{this.state.toDate.toLocaleDateString('he-IL').split('.').join('/')}</span> */}
                            </button>
                        </div>
                    </div>
                    <div onClick={()=>this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params, this.state.search, this.state.docTypeSortChosen)} className="cal-cls searchBtn-cont">
                        <p>חפש</p>
                    </div>
                </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
                <div className="userInfo-cls flex-container">
                    <div className="left-side-comp header-btn-cont col-pay">
                        <div className="select-cont">
                            {/* <select id="selectPicker" value={this.state.docTypeSortChosen} onChange={(e) => this.setFilter(e)}>
                            {this.state.docFilterArr.map((ele, ind) => {
                                return (
                                <option key={ind} id={ele.Id} value={ele.Id}>{ele.Title}</option>
                                )
                            })}
                            </select> */}
                        </div>
                        <div className="clientsAgentSearchWrapper">
                            <div className="search-cont">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={serach}
                                    type="text"
                                    placeholder="חיפוש לקוח..."
                                />
                                {serach ?
                                    <span className="material-symbols-outlined search-img"
                                    onClick={() => setSearch('')}>close</span>
                                    :
                                    <span className="material-symbols-outlined search-img">search</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;