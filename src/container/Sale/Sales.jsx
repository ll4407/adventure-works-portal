import{ useEffect } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Sales() {
  const pageContext = usePageContext({
    firstBtnUrl: "/sales/customers",
    secondBtnUrl: "/sales/stores",
  });

    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() =>{
        if(pathname === '/sales'){
            navigate('/sales/customers')
        }
    }, [])

  return (
    <PageContext.Provider value={pageContext}>
      <SectionHeader
        title={"Sales"}
        color={"pink"}
        firstButton={"Customers"}
        secondButton={"Stores"}
        onFirstButtonClick={() => pageContext.setActivePage("Customers")}
        onSecondButtonClick={() => pageContext.setActivePage("Stores")}
      />
      <Outlet />
    </PageContext.Provider>
  );
}
