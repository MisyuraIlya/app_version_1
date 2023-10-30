import React, {useEffect} from 'react';
import useDocuments from '../store/DocumentsStore';
import DocumentCardList from '../components/DocumentCardList';
import DocsFilter from '../components/DocsFilter';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const DocumentsItemPage = () => {
    // const {loading, getOrderItems} = useDocuments()
    
    // const {id} = useParams()

    // useEffect(() => {
    //     getOrderItems(id)
    // },[])
    console.log('asdasdasdas')
    return (
        <div className='page-container history admin-history docs'>
            <div className="docs-sub-cont">
                {/* {loading &&
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
                } */}
                {/* <DocsFilter/> */}
                {/* <DocumentCardList/> */}
                {/* <DocsTotal/> */}
            </div>
        </div>
    );
};

export default DocumentsItemPage;