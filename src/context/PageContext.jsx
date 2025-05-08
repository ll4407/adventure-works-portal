import { createContext } from "react";

const PageContext = createContext({
        activePage: "",
        setActivePage: () => null,
        filter:"",
        setFilter: () => null,
        showSearch: true,
        setShowSearch: () => null,
    })





export default PageContext