'use client'

import { useClock } from "@/entities/clock/model/useClock"
import { memo, useEffect, useState } from "react"
import { format} from 'date-fns'
import { ko } from "date-fns/locale"


function ClockInner() {
    const [mounted, setMounted] = useState(false)
    const time = useClock()

    useEffect(() => {
        setMounted(true)
    },[])
    
    if(!mounted){
        return null
    }

  return (
    <span className="text-slate-500">{format(time, 'HH:mm:ss', {locale: ko})}</span>
  )
}

export const Clock = memo(ClockInner)