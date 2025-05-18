import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";

import { useState, useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import usePageContext from "../../hooks/usePageContext";

import styles from './Purchasing.module.css';

function Purchasing(){
    const pageContext = usePageContext({
        firstBtnUrl: "/purchasing/vendors",
        secondBtnUrl: "/purchasing/orders",
    })
    const [vendorUpdateInfo, setVendorUpdateInfo] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() =>{
        if(pathname === '/purchasing'){
            navigate('/purchasing/vendors')
        }
    }, [])
	

    const handleMemberSelected = useCallback(() => {
		setIsActive(x => !x)
	}, []);
    
    function UpdateEveryVendor() {
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }

    //Layout
    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}
                />
            <section className={`${styles.purchaseLayout} ${isActive ? styles.hidden : ''}`}>
                <Outlet context={{clicked: handleMemberSelected, vendorUpdateMethod: UpdateEveryVendor, vendorUpdateInfo: vendorUpdateInfo }} />
            </section>

        </PageContext.Provider>

    )
}

export default Purchasing;