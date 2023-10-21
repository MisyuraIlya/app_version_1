import React from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';
import { getUserFromStorage } from '../../../../../../Auth/helpers/auth.helper';
import { useModals } from '../../../../../provider/ModalsProvider';

const ProductHistoryPurche = () => {
    const {selectedProd,getPurchesHistory,purchesHistoryData} = useSelectedProduct()
    const {setActiveTablePopUp} = useModals()

    const handleOpen = () => {
        setActiveTablePopUp(true)
        getPurchesHistory()
    }

    // const textx = `<style> p,div,li {margin:0cm;font-size:10.0pt;font-family:'Verdana';}</style> <P dir=rtl> <TABLE style=\"WIDTH: 269pt; BORDER-COLLAPSE: collapse\" cellSpacing=0 cellPadding=0 width=358 border=0> <COLGROUP> <COL style=\"WIDTH: 269pt; mso-width-source: userset; mso-width-alt: 13092\" width=358> <TBODY> <TR style=\"HEIGHT: 15.75pt\" height=21> <TD class=xl65 style=\"BORDER-TOP: #f0f0f0; HEIGHT: 15.75pt; BORDER-RIGHT: #f0f0f0; WIDTH: 269pt; BORDER-BOTTOM: #f0f0f0; BORDER-LEFT: #f0f0f0; BACKGROUND-COLOR: transparent\" dir=rtl height=21 width=358 align=right><FONT size=2 face=Arial>מתח עבודה:<SPAN style=\"mso-spacerun: yes\">&nbsp;</SPAN>18V&lt;br&gt;<BR>כושר קידוח:<SPAN style=\"mso-spacerun: yes\">&nbsp; </SPAN>מתכת – 10 מ\"מ, עץ – 25 מ\"מ&lt;br&gt;<BR>מהירות:<SPAN style=\"mso-spacerun: yes\">&nbsp;</SPAN>0-1800 סל\"ד&lt;br&gt;<BR>משקל:<SPAN style=\"mso-spacerun: yes\">&nbsp; </SPAN>1.6 ק\"ג&lt;br&gt;<BR>כדאי לדעת:<SPAN style=\"mso-spacerun: yes\">&nbsp; </SPAN>פוטר אוטומטי 10 מ\"מ &lt;br&gt;</FONT></TD></TR> <TR style=\"HEIGHT: 15.75pt\" height=21> <TD class=xl65 style=\"BORDER-TOP: #f0f0f0; HEIGHT: 15.75pt; BORDER-RIGHT: #f0f0f0; BORDER-BOTTOM: #f0f0f0; BORDER-LEFT: #f0f0f0; BACKGROUND-COLOR: transparent\" dir=rtl height=21 align=right><FONT size=2 face=Arial>מתח עבודה:<SPAN style=\"mso-spacerun: yes\">&nbsp;</SPAN>18V&lt;br&gt;<BR>ברגי גבס:<SPAN style=\"mso-spacerun: yes\">&nbsp; </SPAN>4 מ\"מ&lt;br&gt;<BR>מהירות:<SPAN style=\"mso-spacerun: yes\">&nbsp;</SPAN>0-4000 סל\"ד&lt;br&gt;<BR>משקל:<SPAN style=\"mso-spacerun: yes\">&nbsp;</SPAN>1.5 ק\"ג&lt;br&gt;</FONT></TD></TR></TBODY></TABLE>&nbsp;</P> <P dir=rtl>&nbsp;</P> <timestamp:18795733:1/> `
    return (
        <>
        {getUserFromStorage() &&
            <>
                <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                        <p className="c-title">{"היסטוריית רכישה"}</p>
                    </div>
                    <div className="col-lg-9">
                        <span
                            onClick={() => handleOpen()}
                            className="ExtendBtn material-symbols-outlined"
                        >
                            visibility
                        </span>
                    </div>
                </div>
            </>
        }
        </>
    );
};

export default ProductHistoryPurche;