export default function Minus({size, color}){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height={size ? `${size}px` :"24px"} 
            viewBox="0 -960 960 960" 
            width={size ? `${size}px` :"24px"} 
            fill={color ?? "#e3e3e3"}>
                <path d="M200-440v-80h560v80H200Z"/>
        </svg>
    )
}