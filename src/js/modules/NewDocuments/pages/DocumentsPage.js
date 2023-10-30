import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import Pagination from '../../../SharedComponents/Pagination';
import useDocuments from '../store/DocumentsStore';
import DocsFilter from '../components/DocsFilter';
import DocsHead from '../components/DocsHead';
import { useDocumentsProvider } from '../provider/DocumentsProvider';
import DocumentList from '../components/DocumentList';

const DocumentsPage = () => {
    const {
        loading,
        totalPages,
        page,
        lastPage,
        nextPage,
        previousPage,
        showCalendar,
        choosedDate,

    } = useDocuments()
    const {handleCalendar} = useDocumentsProvider()
    return (
        <div className="page-container history admin-history docs ">
            <div className="docs-sub-cont">
                {loading ?
                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                : null}
                <Calendar
                    onChange={(date) => handleCalendar(date)}
                    value={new Date(choosedDate)}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={showCalendar ? 'active' : null}
                />
                <DocsHead/>
                <DocsFilter/>
                <DocumentList/>
                <Pagination totalPages={totalPages} page={page} lastPage={lastPage} nextPage={nextPage} previousPage={previousPage}/>
            </div>
        </div>
    );
};

export default DocumentsPage;