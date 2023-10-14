import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink } from "react-router-dom";
import UserContext from '../../UserContext';

const AZBrands = params => {
  const [activeSort, setActiveSort] = useState(false);
  const [activeProdsPerPage, setActiveProdsPerPage] = useState(false);

  const app = useContext(UserContext);

//{'key':'Num','Title':'0-9'},
  let letterArr = [{'key':'0','Title':'הכל'},
                  {'key':'A','Title':'A'},{'key':'B','Title':'B'},{'key':'C','Title':'C'},
                  {'key':'D','Title':'D'},{'key':'E','Title':'E'},{'key':'F','Title':'F'},
                  {'key':'G','Title':'G'},{'key':'H','Title':'H'},{'key':'I','Title':'I'},
                  {'key':'J','Title':'J'},{'key':'K','Title':'K'},{'key':'L','Title':'L'},
                  {'key':'M','Title':'M'},{'key':'N','Title':'N'},{'key':'O','Title':'O'},
                  {'key':'P','Title':'P'},{'key':'Q','Title':'Q'},{'key':'R','Title':'R'},
                  {'key':'S','Title':'S'},{'key':'T','Title':'T'},{'key':'U','Title':'U'},
                  {'key':'V','Title':'V'},{'key':'W','Title':'W'},{'key':'X','Title':'X'},
                  {'key':'Y','Title':'Y'},{'key':'Z','Title':'Z'}
                  ]
	return(
    <div className="view-mode-cont brands">
      <div className="view-mode-rightcont">
        {letterArr.map((item, ind) => {
          return(
            <div className="letter-cont">
              <NavLink key={ind} to={'/brands/' + item.key + '/' + app.state.lang}>
              <p>{item.Title}</p>
              </NavLink>
            </div>
          )


        })}

      </div>
    </div>
	)
}

export default AZBrands;
