import React from 'react';

const Tags = ({product}) => {
    return (
        <>
        <div className="flip-card">
            <div className="flip-card-inner">
                {product?.Discount &&
                    <p className="c-sale">{'מבצע'}</p>
                }
                {(product?.OnHand <= 0) &&
                    <p className="c-sale">{'אין מלאי'}</p>
                }


                {product?.Tags?.map((tagEle, tagInd) => {
                    return (
                        <p key={tagInd} className={tagEle.ColorCls}>{tagEle.WebTitle}</p>
                    )
                })}

                {product.LastOnHand &&
                    <p className="c4">{'אחרונים במלאי'}</p>
                }
            </div>
        </div>

        {product.RePrice && 
            <div className={"favorite-cont change_price_cont"}> 
                <span className="material-symbols-outlined">price_change</span>
            </div>
        }
        </>
    );
};

export default Tags;