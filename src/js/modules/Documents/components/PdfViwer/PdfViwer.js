import React from 'react';
import useDocuments from '../../store/DocumentsStore';

const PdfViwer = () => {
    const {loading, pdfViewer, linkDocument, setPdfViewer} = useDocuments()

    const download = () => {
        window.open(linkDocument, '_blank');
    }
    return (
        <div>
            <div className="my-modal pdf-viewer">
              <div className="modal-wrapper animated">
                <div className="close-cont">
                  <div
                    onClick={() => setPdfViewer(!pdfViewer)}
                    className="close">
                    <span className="material-symbols-outlined">close</span>
                  </div>
                  <div
                    onClick={() => download()}
                    className="pdf">
                    <span className="material-symbols-outlined">download</span>
                  </div>
                </div>
                <div className="tablePopUp docs">
                    {loading ?
                    <div className="spinner-wrapper">
                        <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                        </div>
                    </div>
                    : null}
                    <div  className={"pdf-container"}>
                        <iframe className='pdf-ele' src={linkDocument} ></iframe>
                    </div>
			    </div>
              </div>
              <div onClick={() => setPdfViewer(false)} className="overflow"></div>
            </div>
        </div>
    );
};

export default PdfViwer;