export default function Minus({size, color, className}){
    return(
        <svg 
            className={className ?? className}  
            xmlns="http://www.w3.org/2000/svg" 
            height={size ? `${size}px` :"24px"} 
            viewBox="0 -960 960 960" 
            width={size ? `${size}px` :"24px"} 
            fill={color ?? "currentColor"}>
                <path d="M200-440v-80h560v80H200Z"/>
        </svg>
    )
}