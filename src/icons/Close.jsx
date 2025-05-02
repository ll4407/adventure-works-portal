export default function Close({size, color, className}){
    return(
        <svg 
            className={className ?? className}  
            xmlns="http://www.w3.org/2000/svg" 
            height={size ? `${size}px` :"24px"} 
            viewBox="0 -960 960 960" 
            width={size ? `${size}px` :"24px"} 
            fill={color ?? "currentColor"}>
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>

    )
    }