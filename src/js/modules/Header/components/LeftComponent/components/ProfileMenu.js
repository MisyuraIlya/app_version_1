import React from 'react';
import { useAuth } from '../../../../Auth/providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const ProfileMenu = () => {
    const {isAgent, user, isAdmin} = useAuth()
    let profileObj = [
        /*
        {
            Title: 'ראשי',
            TitleEng: 'Shopping List',
            Link: '/',
            Img: 'home',
            OnlyAgent: false,
            OnlyAgentSuper: false,
            OnlyDesktop:true
        },*/
        
        {
            Title: 'מסמכי לקוח',
            TitleEng: 'My Orders',
            Link: '/docsNew/1/',
            Img: 'storefront',
            OnlyAgent: false,
            OnlyAgentSuper: false,
            OnlyDesktop:false,
            notForMisrad:false
        },
        // {
        // 	Title: 'סל קבוע',
        // 	TitleEng: 'My Products',
        // 	Link: '/category/regular/0/0/0/1/0/',
        // 	Img: 'shopping_bag',
        // 	OnlyAgent: false,
        // 	OnlyAgentSuper: false,
        // 	OnlyDesktop:false,
        // 	notForMisrad:false
        // },
        // {
        // 	Title: 'מומלצים עבורך',
        // 	TitleEng: 'Recommended Products',
        // 	Link: '/category/recommended/0/0/0/1/0/',
        // 	Img: 'star',
        // 	OnlyAgent: false,
        // 	OnlyAgentSuper: false,
        // 	OnlyDesktop:false,
        // 	notForMisrad:false
        // },
        /*{
            Title: 'רשימות קניות',
            TitleEng: 'Shopping List',
            Link: '/shoppinglist/',
            Img: 'checklist',
            OnlyAgent: false
        },*/
        
        {
            Title: 'מסמכים לאישור',
            TitleEng: 'Approve Docs',
            Link: '/approveDoc/1/',
            Img: 'checklist_rtl',
            OnlyAgent: true,
            OnlyAgentSuper: true,
            OnlyDesktop:false,
            notForMisrad:true
        },
        {
            Title: 'מסמכים',
            TitleEng: 'Shopping List',
            Link: '/docsAgent/1/',
            Img: 'article',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false,
            notForMisrad:false
        },
        /*{
            Title: 'טיוטות',
            TitleEng: 'Shopping List',
            Link: '/agentDrafts/1/',
            Img: 'draft_orders',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false
        },*/
        {
            Title: 'טיוטות/הזמנות',
            TitleEng: 'Shopping List',
            Link: '/DocsHistoryAgent/1/',
            Img: 'article',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false,
            notForMisrad:false
        },
        /*{
            Title: 'גביה',
            TitleEng: 'Shopping List',
            Link: '/agentGviya/',
            Img: 'account_balance_wallet',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false
        },*/
        {
            Title: 'אחרונים במלאי',
            TitleEng: 'Shopping List',
            Link: '/category/lastOnHand/0/0/0/1/0/',
            Img: 'inventory_2',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false,
            notForMisrad:false
        },
        
        {
            Title: 'ביצועי סוכנים',
            TitleEng: 'Shopping List',
            Link: '/agent-statistics/1/',
            Img: 'support_agent',
            OnlyAgent: true,
            OnlyAgentSuper: true,
            OnlyDesktop:false,
            notForMisrad:true
        }
    ];

    return (
    <div id="MyProfileMenu-cont" className="MyProfileMenu-cont">
        <div className="MyProfileMenu-subcont">
            <div className="userDet-main-cont">
                <div className="userDet-sub-cont">
                    {isAdmin &&
                        <>
                            <p>{'אדמין'}</p>
                            <p className='line'></p>
                        </>
                        }
                    {isAgent ?
                        <>
                            <p className="profile-cube-title">סוכן</p>
                            {/* <p>{JSON.parse(localStorage.agent).Name}</p> */}
                        </>
                        : null}
                    {user ?
                        <div className="userDet-client-cont">
                            <p className="profile-cube-title">לקוח</p>

                            <p>{user.name}</p>
                            <p>{user.extId}</p>
                            {/* {app.state.selectedMode ? 
                                <>
                                    {app.state.selectedMode==1 ?
                                        <p className="actions-title">{"הזמנה"}</p>
                                    :null}
                                    {app.state.selectedMode==2 ?
                                        <p className="actions-title">{"ה.מחיר"}</p>
                                    :null}
                                    {app.state.selectedMode==3 ?
                                        <p className="actions-title" >{"החזרה"}</p>
                                    :null}
                                </>
                            :null} */}
                            
                        </div>
                    : null}
                </div>

                <div className="userDet-sub-cont">
                    { user ? 
                        <div className="btn-cont col">
                            <div className="logOutCont agent-actions" onClick={() => closeAndOpenActions()}>
                                <p>{'פעולות'}</p>
                            </div>
                        </div>
                    :null}
                    <div className="btn-cont col">
                        <div className="logOutCont" onClick={() => beforeLogOut()}>
                            <p>{user ? 'התנתק מלקוח' : 'התנתק'}</p>
                        </div>
                    </div>
                </div>
            </div>
            {user ?
                <>
                    <NavLink to={'/profile/'}>
                        <div className="MyProfile-row" onClick={() => close()}>
                            <span className="material-symbols-outlined search-img">{'person'}</span>
                            <p>{"אזור אישי"}</p>
                        </div>
                    </NavLink>
                    {user && profileObj?.map((item, key) => {
                        if(!isAgent){
                            return (
                                <NavLink key={key} to={item.Link}>
                                    <div key={key} className="MyProfile-row" onClick={() => close()}>
                                        <span className="material-symbols-outlined search-img">{item.Img}</span>
                                        <p>{ item.Title}</p>
                                    </div>
                                </NavLink>
                            )
                        }
                    })}
                </>
                : null}
        </div>
    </div>
    );
};

export default ProfileMenu;