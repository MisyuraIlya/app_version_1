import React from 'react';
import useSelectedProduct from '../../../../store/SelectedProductStore';

const ProductRightSide = () => {
    const {chosenImg, allImages, selectedProd} = useSelectedProduct()
    return (
        <>
            {chosenImg ? 
            <>
                <span className="material-symbols-outlined span1" onClick={()=>this.shareImage()}>share</span>
                <span className="material-symbols-outlined span2" onClick={()=>this.openLink()}>link</span>
            </>
            :null}
            <img className="img  col-lg-12" 
                src={selectedProd.ImgPath ? selectedProd.ImgPath : globalFileServer + 'products/' + selectedProd.Img}
                onClick={()=> this.setState({imageModal: this.state.chosenImg})}
            />
            <div className="additional-img-cont col-lg-11">
                {allImages > 1 ?

                <AdditionalImg
                    items={this.state.allImages}
                    appProps={this.props}
                    appState={this.state}
                    setChosenImg={this.setChosenImg}
                />
                : null}
            </div>
        </>
    );
};

export default ProductRightSide;