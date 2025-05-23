import { useEffect, useRef} from 'react'
import { colors } from '../../utilities'

import Loading from './Loading'
const ColorChanger = () => {
    const ref = useRef(null)
    const running = useRef(false)
    const i = useRef(0)
    const colorOptions = [
        'yellow',
        'orange',
        'blue',
        'green',
        'pink',
    ]

    useEffect(()=>{
        let interval
        if(ref.current){
            running.current = true;
            const ele = ref.current
            interval = setInterval(()=> {
                ele.style.color = colors[colorOptions[i.current]]
                if(i.current === colorOptions.length - 1){
                    i.current = 0
                }else{
                    i.current++
                }
            }, 1000)
        }
        return () => {
            console.log('clearing interval')
            if(interval) clearInterval(interval)
        }
    })

  return (
    <div ref={ref}><Loading /></div>
  )
}

export default ColorChanger