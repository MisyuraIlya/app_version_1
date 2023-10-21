import React, { useEffect, useState } from 'react';
import MyCropper from '../../../../components/tools/MyCropper';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCategories from '../../../Catalog/store/CategoriesStore';
import { AdminCatalogService } from '../../services/catalog.service';
import { useDebounce } from 'use-debounce';
import { base64ToFile } from '../../../../helpers/base64ToFile';
const CategoryEditItem = ({element}) => {
    const [loading, setLoading] = useState(false)
    const {categories,getCategories,setCategories} = useCategories()
    const [title, setTitle] = useState(element.title)
    const [valueDebounced] = useDebounce(title, 1000);
    const {parentId, subId} = useParams()
    const uploadImg = async (img) => {
        const convertFile = base64ToFile(img.img,img.fileName)
        const res = await AdminCatalogService.uploadImage(convertFile, 'category')
        const res2 = await AdminCatalogService.updateCategory({id: element.id ,MediaObject: res['@id']})
        await getCategories()
    }

    const unpublishHandle = async (categoryId, isPublished) => {
        const newCat = categories.map((item) => {
            if(item.id === categoryId){
                item.isPublished = isPublished
            }
            return item
        })
        setCategories(newCat)
        await AdminCatalogService.updateCategory({id: categoryId ,isPublished})

    }

    const handleLink = () => {
        console.log('parentId, subId',parentId, subId)
        if(parentId != '0' && subId == '0') {
            return "/category-edit/" + parentId + "/" + element.id
        } else if(parentId != '0' && subId != '0') {
            return "/products-edit/" + element.id
        } else {
            return "/category-edit/" + element.id + "/0" 
        }
    }

    useEffect(() => {
        if(valueDebounced){
            AdminCatalogService.updateCategory({id: element.id ,title:valueDebounced})
        }
    },[valueDebounced])


    return (
    <div className="flex-container">
        <div className="col-lg-1 enter MyCenetred">
        <NavLink to={handleLink()} onClick={() => handleLink()}>
            <span class="material-symbols-outlined googleIconHover">move_item</span>
        </NavLink>
        </div>
        <div className="col-lg-1 sort MyCenetred">
            <span class="material-symbols-outlined">drag_indicator</span>
        </div>
        <div className="col-lg-2 for-img">
            <div
            className={element?.MediaObject?.filePath ? "img-load active" : "img-load"}>
            {element?.MediaObject?.filePath && 
                <img
                    className="main-img"
                    src={globalFileServer + 'category/' + element?.MediaObject?.filePath}
                />
            }
            <MyCropper
                aspectRatio={16/16} 
                itemId={element.id}
                folder="categories"
                setPreload={() => setLoading(true)}
                unsetPreload={() => setLoading(false)}
                uploadImg={uploadImg}
            />
            {/* <CropperComponent img={element?.MediaObject?.filePath} chat={true} aspectRatio={16/16}/> */}
            </div>
        </div>
        <div className={"col-lg-1 title"}>
            <p>{element.id}</p>
        </div>
        <div className={"col-lg-3 title"}>
            <input
                type="text"
                placeholder="שם הקטגוריה"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="col-lg-1 status">
            {!element.isPublished ?
                <div onClick={() => unpublishHandle(element.id,true)} className="input active">
                    <span class="material-symbols-outlined" style={{color:'white',height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>done</span>
                </div>
            :
            <div onClick={() => unpublishHandle(element.id,false)} className="input MyCentered">
                <span class="material-symbols-outlined" style={{color:'white',height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>close</span>
            </div>
            }
        </div>
    </div>
    );
};

export default CategoryEditItem;