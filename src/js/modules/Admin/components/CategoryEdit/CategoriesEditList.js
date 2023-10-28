import React, { useState } from 'react';
import useCategories from '../../../Catalog/store/CategoriesStore';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import MyCropper from "../tools/MyCropper";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CropperComponent from '../../../../SharedComponents/CropperComponent';
import { AdminCatalogService } from '../../services/catalog.service';
import CategoryEditItem from './CategoryEditItem';
const CategoriesEditList = () => {
    const {categoriesAll,setCategories} = useCategories()
    const {lvl1, lvl2} = useParams()
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#e5e5e5" : "#ddd",
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "#f9f9f9" : "#fff",
        ...draggableStyle
    });

    const onDragEnd = async (result) => {
        if (!result.destination) {
          return;
        }

        const categoriesReorder = reorder(
            categoriesAll.filter((item) => item.lvlNumber === 1),
            result.source.index,
            result.destination.index
        );
        setCategories(categoriesReorder)
        await AdminCatalogService.updateCategory({id: result.draggableId ,orden: result.destination.index})

    
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleCategries = () => {
        if(lvl1 == '0') {
            return categoriesAll.filter((filtered) => filtered.lvlNumber === 1)
        } else if(lvl1 && lvl2 == '0') {
            const lvl2 = categoriesAll.filter((filtered) => filtered?.parent?.id == lvl1 && filtered.lvlNumber === 2)
            return lvl2
        } else if(lvl1 && lvl2) {
            const lvl3 = categoriesAll.filter((filtered) => filtered?.parent?.id == lvl2 && filtered.lvlNumber === 3)

            return lvl3
        }
    }

    return (
        <div className="items">
            <div className="heading">
                <div className="flex-container">
                    <div className="col-lg-1">
                        <p>כניסה</p>
                    </div>
                    <div className="col-lg-1">
                        <p>סדר</p>
                    </div>
                    <div className="col-lg-2">
                        <p>תמונה</p>
                    </div>
                    <div className="col-lg-1 product">
                        <p style={{textAlign: 'right'}}>מזהה</p>
                    </div>
                    <div className={"col-lg-3 product"}>
                        <p style={{textAlign: 'right'}}>כותרת</p>
                    </div>
                    <div className="col-lg-1">
                        <p>סטאטוס</p>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable"> 
                    {(provided, snapshot) => (
                        <div className="items" {...provided.innerRef} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                            {handleCategries().map((element, index) => {
                                return(
                                    <div key={index} id={"item_" + element.id} className="item">
                                        <Draggable key={element.id} draggableId={element.id + ''} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                            className="item"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                <CategoryEditItem element={element}/>
                                            </div>
                                        )}
                                        </Draggable>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default CategoriesEditList;