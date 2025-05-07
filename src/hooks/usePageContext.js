import { useState } from "react"

//pass it the value of your default for the page
const usePageContext = (pageName) => {
    const [activePage, setActivePage] = useState(pageName)
    const [filter, setFilter] = useState("")
    const [showSearch, setShowSearch] = useState(true)

    //it returns a built value for page context
    //that way you don't have to maintain that state on your page.
    return {
        activePage: activePage,
        setActivePage: setActivePage,
        filter: filter,
        setFilter: setFilter,
        showSearch: showSearch,
        setShowSearch: setShowSearch,
    }
}

export default usePageContext