import React, { useEffect, useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { base64ToFile } from '../../../../helpers/base64ToFile';
import MyCropper from '../../../../components/tools/MyCropper';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useProductsEditStore from '../../store/ProductsEditStore';
import { AdminProductService } from '../../services/products.service';
import { useModals } from '../../../Modals/provider/ModalsProvider';
const ProductsEditItem = ({element, index}) => {

    const [loading, setLoading] = useState(false)
    const {products,getProducts, uploadImage, setProducts,setSelectedProduct} = useProductsEditStore()
    const {gallery, setGallery} = useModals()
    const {categoryId} = useParams()
    
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "#f9f9f9" : "#fff",
        ...draggableStyle
    });

    const uploadImg = async (img) => {
        const convertFile = base64ToFile(img.img,img.fileName)
        const res = await AdminProductService.uploadImage(convertFile, 'product')
        const res2 = await AdminProductService.createNewImage({product: element["@id"] ,mediaObject: res['@id']})
        await getProducts(categoryId)
    }

    const unpublishHandle = async (productId, isPublished) => {
        const newProd = products.map((item) => {
            if(item.id === productId){
                item.isPublished = isPublished
            }
            return item
        })
        setProducts(newProd)
        await AdminProductService.updateProduct({id: productId ,isPublished})

    }


    return (
    <div key={index} id={"item_" + element?.id} className="item">
        <Draggable key={element.id} draggableId={element.id + ''} index={index}>
            {(provided, snapshot) => (
            <div
                className="item"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                <div className="flex-container">
                    <div className="col-lg-1 sort MyCenetred">
                        <span class="material-symbols-outlined">drag_indicator</span>
                    </div>
                    <div className="col-lg-1 for-img">
                        <div className={element?.imagePath?.imagePath ? "img-load active" : "img-load"}>
                            {element?.defaultImagePath && 
                                <img className="main-img" src={globalFileServer + 'product/' + element?.defaultImagePath}/>
                            }
                            <MyCropper
                                aspectRatio={16/16} 
                                itemId={element.id}
                                folder="product"
                                setPreload={() => setLoading(true)}
                                unsetPreload={() => setLoading(false)}
                                uploadImg={uploadImg}
                            />
                        </div>
                    </div>
                    <div className="col-lg-1 MyCenetred" style={{cursor:'pointer'}} onClick={() => {setGallery(true);setSelectedProduct(element)}}>
                        <span class="material-symbols-outlined">imagesmode</span>
                    </div>
                    <div className="col-lg-3 title">
                        <p>{element?.title}</p>
                    </div>
                    <div className="col-lg-2 title">
                        <p>{element?.sku}</p>
                    </div>
                    <div className="col-lg-3">
                        <div className="flex-container">
                            <div className="col-lg-3 status sale">
                                {/*  IMPELEMNT */}
                            </div>
                            <div className="col-lg-3 status sale">
                                {/*  IMPELEMNT */}
                            </div>
                            <div className="col-lg-3 status sale">
                                {/*  IMPELEMNT */}
                            </div>
                            <div className="col-lg-3 status">
                                {!element?.isPublished ?
                                    <div onClick={(e) => unpublishHandle(element.id, true)} className="input active">
                                        <span class="material-symbols-outlined" style={{color:'white',height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>done</span>
                                    </div>
                                :
                                <div onClick={(e) => unpublishHandle(element.id, false)} className="input">
                                    <span class="material-symbols-outlined" style={{color:'white',height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>close</span>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Draggable>
    </div>
    );
};

export default ProductsEditItem;