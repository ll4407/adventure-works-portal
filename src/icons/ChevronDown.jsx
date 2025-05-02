export default function ChevronDown({size, color, className}){
    return(
        <svg 
            className={className ?? className}  
            xmlns="http://www.w3.org/2000/svg" 
            height={size ? `${size}px` :"24px"} 
            viewBox="0 -960 960 960" 
            width={size ? `${size}px` :"24px"} 
            fill={color ?? "currentColor"}>
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
        </svg>
    )
}