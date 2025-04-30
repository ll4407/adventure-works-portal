
export default function Hamburger({size, color}){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height={size ? `${size}px` :"24px"}
            width={size ? `${size}px` :"24px"}
            viewBox="0 -960 960 960" 
            fill={color ?? "#e3e3e3"}>
            <path d="M120-240v-80h480v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    )
    }