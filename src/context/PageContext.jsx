import { createContext } from "react";

const PageContext = createContext({
        filter:"",
        setFilter: () => null,
        showSearch: true,
        setShowSearch: () => null,
        firstBtnUrl: "",
        secondBtnUrl: "",
    })

export default PageContext