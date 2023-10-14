import React, { useEffect } from 'react';
import DocCardFilter from '../../components/DocCardFilter/DocCardFilter';
import DocsTotal from '../../components/DocsTotal/DocsTotal';
import DocCardList from '../../components/DocCardList/DocCardList';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import useDocuments from '../../store/DocumentsStore';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PdfViwer from '../../components/PdfViwer/PdfViwer';

const DocCard = () => {

    const {loading, GetDocumentItem, pdfViewer} = useDocuments()
    
    const {id} = useParams()

    useEffect(() => {
        GetDocumentItem(id)
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
                {pdfViewer &&
                    <PdfViwer/>            
                }
                <BreadCrumbs/>
                <DocCardFilter/>
                <DocCardList/>
                <DocsTotal/>
            </div>
        </div>
    );
};

export default DocCard;