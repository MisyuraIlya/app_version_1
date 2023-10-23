import React from 'react';

const AgentMyProfile = () => {
    return (
    <div className="Profilepage-subcont2 flex-container">
        <div className={"Profile-page-sub col-lg-12"}>
          <h1>{lang=='he' ? breadObject.Title : breadObject.TitleEng}</h1>
          <div className={"Profile-page-sub2"}>
            <div className="col-lg-12 box-cont box-cont-agent-mode">
              <div className="col">
                <p className="title">{lang=='he' ? 'שם': 'Name'}</p>
                <p className="value">{this.state.data.userFromDb.Name}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'איש קשר': 'Contact'}</p>
                <p className="value">{this.state.data.userFromDb.ContactName}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'מייל': 'Email'}</p>
                <p className="value">{this.state.data.userFromDb.Mail}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'ח.פ/ע.מ': 'Email'}</p>
                <p className="value">{this.state.data.userFromDb.Hp}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'טלפון': 'Phone'}</p>
                <p className="value">{this.state.data.userFromDb.Tel}</p>
              </div>
              <div className="col">
                 <p className="title">{lang=='he' ? 'עיר': 'City'}</p>
                 <p className="value">{this.state.data.userFromDb.Town}</p>
               </div>
               <div className="col col-longText">
                 <p className="title">{lang=='he' ? 'הערות': 'City'}</p>
                 <p className="value">{this.state.data.userFromDb.AddressJson}</p>
              </div>
            </div>
          </div>
        </div>
       
        <div className={"Profile-page-sub col-lg-12"}>
          <h1>{lang=='he' ? 'כספים' : breadObject.TitleEng}</h1>
          <div className={"Profile-page-sub2"}>
            <div className="col-lg-12 box-cont box-cont-agent-mode">
              
              <div className="col">
                <p className="title">{lang=='he' ? 'מחירון': 'City'}</p>
                <p className="value">{this.state.data.userFromDb.PriceListBase}</p>
              </div>
              <div className="col">
                 <p className="title">{lang=='he' ? 'ת.תשלום': 'City'}</p>
                 <p className="value">{this.state.data.userFromDb.PaymentMethod}</p>
              </div>
              {this.state.data.clientProfileObj &&
               <>
                 <div className="col">
                     <p className="title">{lang=='he' ? 'סך עסקאות': 'City'}</p>
                     <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.TotalOrderSum))}</p>
                 </div>
                 <div className="col">
                     <p className="title">{lang=='he' ? 'סל ממוצע': 'City'}</p>
                     <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.MonthlyAverage))}</p>
                 </div>
                 <div className="col">
                     <p className="title">{lang=='he' ? 'מכירות חודשי': 'City'}</p>
                     <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.TotalOrderSumCurrentMonth))}</p>
                 </div>
                 <div className="col">
                     <p className="title">{lang=='he' ? 'יעד חודשי': 'City'}</p>
                     <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.MonthlyObjective))}</p>
                 </div>
               </>
             }
              <div className="col">
                 <p className="title">{lang=='he' ? 'ערבות אישית':''}</p>
                 <p className="value">{this.state.data.userFromDb.Extra1 ? this.state.data.userFromDb.Extra1 : '-' }</p>
              </div>
              <div className="col">
                 <p className="title">{lang=='he' ? 'ביטוח אשראי':''}</p>
                 <p className="value">{this.state.data.userFromDb.Extra2 ? this.numberWithCommas(parseInt(this.state.data.userFromDb.Extra2)) : '-'}</p>
              </div>
             {this.state.data.clientProfileObj && this.state.data.clientProfileObj.Users ? 
               <>
                 <div className="col">
                   <p className="title">{lang=='he' ? 'יתרת חוב': 'Balance'}</p>
                   <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].Balance))}</p>
                 </div>
                 <div className="col alert">
                   <p className="title">{lang=='he' ? 'חוב בסיכון': 'Balance'}</p>
                   <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].Balance) + parseInt(this.state.data.clientCheqs.Sum)) }</p>
                 </div>
                 <div className="col">
                   <p className="title">{lang=='he' ? 'אובליגו': 'Obligo'}</p>
                   <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].MaxObligo))}</p>
                 </div>
                 <div className="col">
                   <p className="title">{lang=='he' ? 'אובליגו לניצול': 'Obligo'}</p>
                   <p className="value">{this.numberWithCommas( parseInt(this.state.data.clientProfileObj.Users[0].MaxObligo) + parseInt(this.state.data.clientProfileObj.Users[0].Balance) )}</p>
                 </div>
                 <div className="col">
                   <p className="title">{lang=='he' ? 'חובות פתוחים': 'Obligo'}</p>
                   <span className="material-symbols-outlined"
                         onClick={()=>this.getOpenDeptInvoices()}>account_balance_wallet</span>
                 </div>
                 <div className="col">
                   <p className="title">{lang=='he' ? 'שיקים לפרעון': 'Obligo'}</p>
                   <span className="material-symbols-outlined"
                       onClick={()=>this.getFutureCheqs()}>payments</span>
                 </div>
               </>
              :null}
              
            
            </div>

          </div>
        </div>
        {localStorage.agent && localStorage.user && !this.props.state.orderObject ? 
         <AgentActions props={this.props} lang={lang}/>
         :null}
       
    </div>
    );
};

export default AgentMyProfile;