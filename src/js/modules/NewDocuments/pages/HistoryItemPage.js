import React, {useEffect} from 'react';
import useDocuments from '../store/DocumentsStore';
import DocumentCardList from '../components/DocumentCardList';
import DocsFilter from '../components/DocsFilter';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import DocsTotal from '../components/DocsTotal';
import HistoryCardList from '../components/HistoryCardList';
const HistoryItemPage = () => {
    const {loading, getOrderItems, setDocumentType} = useDocuments()
    
    const {id} = useParams()

    useEffect(() => {
        setDocumentType('historyItem')
        getOrderItems(id)
    },[])
    return (
        <div className='page-container history admin-history docs'>
            <div className="docs-sub-cont">
                {loading &&
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
                }
                <DocsFilter/>
                <HistoryCardList/>
                <DocsTotal/>
            </div>
        </div>
    );
};

export default HistoryItemPage;