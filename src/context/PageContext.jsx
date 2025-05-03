import { createContext } from "react";

const PageContext = createContext({
        activePage: "",
        setActivePage: () => null,
        filter:"",
        setFilter: () => null,
    })

    export default PageContext