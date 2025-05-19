import { useState } from "react"

//pass it the value of your default for the page
const usePageContext = ({firstBtnUrl, secondBtnUrl}) => {
    const [filter, setFilter] = useState("")
    const [showSearch, setShowSearch] = useState(true)

    //it returns a built value for page context
    //that way you don't have to maintain that state on your page.
    return {
        filter: filter,
        setFilter: setFilter,
        showSearch: showSearch,
        setShowSearch: setShowSearch,
        firstBtnUrl: firstBtnUrl,
        secondBtnUrl: secondBtnUrl,
    }
}

export default usePageContext