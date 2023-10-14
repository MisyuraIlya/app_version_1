import React from 'react';

const FreeList = () => {
    return (
        <>
            {localStorage.freeProdsInCart ? JSON.parse(localStorage.freeProdsInCart).map((element, index) => {
                //let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.Products.CatalogNumber) : [];
                let unit = "יחידות";
                if (element.unitChosen == "1") {
                    unit = "חבילות";
                } else if (element.unitChosen == "2") {
                    unit = 'קילו';
                }
                return (
                    <tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.goToItemFunc(element)}>
                        
                        <th className="add-to-cart col-cont sticky-col">
                            <p className="freeProds">{element.Quantity + " " + unit}</p>
                        </th>
                        <th className="col-cont">
                            
                        </th>
                        <th className="col-cont">
                            <p>{element.Products.Title}</p>
                        </th>
                        <th className="col-cont">
                            {element.Products.Unit != "2" ?
                                <p>{element.Products.PackQuan}</p>
                                :
                                <p>ק״ג</p>
                            }
                        </th>
                        <th className="col-cont">
                            <p>{0}</p>
                        </th>
                        <th className="col-cont">
                            <p className="price">0</p>
                        </th>
                        <th className="col-cont"></th>
                        <th className="col-cont"></th>

                        <th className="col-cont">
                            <div className={"Discout-cont"}>
                                <p className="c1">{'מבצע'}</p>
                            </div>
                        </th>
                    </tr>
                );
            }) : null} 
        </>
    );
};

export default FreeList;