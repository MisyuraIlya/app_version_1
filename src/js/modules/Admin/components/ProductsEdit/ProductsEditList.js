import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProductsEditItem from './ProductsEditItem';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useProductsEditStore from '../../store/ProductsEditStore';
import { AdminProductService } from '../../services/products.service';
const ProductsEditList = () => {

    const {products,setProducts,getProducts} = useProductsEditStore()
    const {lvl1,lvl2,lvl3} = useParams()

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#e5e5e5" : "#ddd",
    });

    const onDragEnd = async (result) => {
        if (!result.destination) {
         return;
        }
        const items = reorder(
            products,
            result.source.index,
            result.destination.index
        );
        setProducts(items)
        await AdminProductService.updateProduct({id: result.draggableId ,orden: result.destination.index})
    }

    useEffect(() => {
        getProducts(lvl1,lvl2,lvl3)
    },[])
    
    const  reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div className="items" {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {products.map((element, index) => {
                            return(
                                <ProductsEditItem element={element} index={index}/>
                            );
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ProductsEditList;