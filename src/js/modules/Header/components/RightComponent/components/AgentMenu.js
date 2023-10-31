import React from 'react';
import { useAuth } from '../../../../Auth/providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';

let from= moment().subtract(1, 'months').format('YYYY-MM-DD');
let to =  moment().format('YYYY-MM-DD');


const profileObj = [
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
        Link: `/documentPage?page=1&from=${from}&to=${to}`,
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
const AgentMenu = () => {
    const {isAgent} = useAuth()
    return (
        <>
            {true &&
            <>
                <div className="img icon">
                    <span className="material-symbols-outlined agentBackGround">menu</span>
                </div>
                <div className="about-cont-main">
                    <div className="about-sub-cont">
                        {profileObj?.map((item, key) => {
                            return (
                                <div key={key} className="about-row ">
                                    <NavLink to={item.Link}>
                                        <span className="material-symbols-outlined ">{item.Img}</span>
                                        <p>{item.Title}</p>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </>
            }
        </>
    );
};

export default AgentMenu;