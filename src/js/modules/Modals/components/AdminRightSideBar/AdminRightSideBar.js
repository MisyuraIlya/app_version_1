import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const sidebarAdmin = [
    /*{
      Title: 'שיוך קטגוריות',
      Link: '/category-build/1',
      Img: 'list.svg',
      Password: false
    },*/
    {
      Title: 'ניהול מוצרים',
      Link: '/category-edit/0/0',
      Img: 'nav_prod.svg',
      Password: false
    },
      {
          Title: 'לקוחות',
          Link: '/clients',
          Img: 'clients.svg',
          Password: false,
      Pop: false
      }/*,
      {
          Title: 'אזורי חלוקה',
          Link: '/gis',
          Img: 'gps.svg',
          Password: false,
      Pop: false
      }*/,
      {
          Title: 'הודעות פרסומיות',
          Link: '/notification',
          Img: 'mail.svg',
          Password: false,
          Pop: false
      },
  
  /*  {box-shadow: 0px 8px 25px #b6b4b48c;
      border-radius: 8px;
  }
          Title: 'מחלקות',
          Link: '/deptEdit',
          Img: 'department.svg',
          Password: false
      },
    {
          Title: 'ניהול עובדים',
          Link: '/employee',
          Img: 'employees.svg',
          Password: false
      },
    {
      Title: 'ליקוט',
      Link: '/collector-step-three',
      Img: 'box.svg',
      Password: false
    },*/
      {
          Title: 'הזמנות',
          Link: '/approveDoc/1',
          Img: 'cart.svg',
          Password: false,
          Pop: false,
          isLang: true
      },
  //   {
  // 	 	Title: 'ניהול מבצעים',
  // 	 	Link: '/admin-sales',
  // 	 	Img: 'sales.svg',
  // 	 	Password: false,
  //     Pop: false
  // 	},
    /*{
      Title: 'ניהול מותגים',
      Link: '/brands-edit',
      Img: 'nav_prod.svg',
      Password: false
    },*/
  
  //   {
  // 		Title: 'סוכנים',
  // 		Link: '/agents',
  // 	 	Img: 'agent.svg',
  // 	 	Password: false
  // 	 },
          {
                  Title: 'דאשבורד',
                  Link: '/statistics/1',
                  Img: 'info.svg',
                  Password: false
          },
          {
                  Title: 'סטטיסטיקות',
                  Link: '/comprasion',
                  Img: 'info.svg',
                  Password: false
          }	 /*,
          {
                  Title: 'סטטיסטיקות סוכנים',
                  Link: '/agent-statistics/1',
                  Img: 'agent.svg',
                  Password: false
          }
  
  
    {
           Title: 'מידע',
           Link: '/admin-info',
           Img: 'info.svg',
           Password: false,
      Pop: false
      },
      {
          Title: 'עדכון מערכת',
          Link: '/admin-history',
          Img: 'sync.svg',
          Password: false,
      Pop: true
      }*/
  ];
const AdminRightSideBar = ({active, setActive}) => {
    return (
        <nav id="main"  data-class={'he'} className={active ? 'active' : null}>
            <div className="nav-cont" onClick={() => setActive(false)}></div>
            <ul>
                {sidebarAdmin?.map((element, index) => {
                    return(
                        <li key={index}>
                            <NavLink to={element.Link}>
                                <img src={globalFileServer + 'icons/menu/' + element.Img} />
                                <span>{element.Title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

        </nav>
    );
};

export default AdminRightSideBar;