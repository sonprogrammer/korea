import { supabaseClient } from "@/shared/lib/supabase/client";

export const getTopRecord = async() =>  {
    const supabase = supabaseClient()

    const { data: activeEvent } = await supabase.from('events').select('id').eq('status', 'active').order('created_at', { ascending: false})
                                                .limit(1).maybeSingle()

    if(!activeEvent){
        return {date: '-', count: 0}
    }

    const { data: topStat, error} = await supabase.from('daily_stats').select('stat_date, count')
                                                    .eq('event_id', activeEvent.id)
                                                    .order('count', {ascending: false})
                                                    .limit(1)
                                                    .maybeSingle()

    if(error || !topStat){
        return {date: '-', count : 0}
    }

    return { date: topStat.stat_date, count: topStat.count}
}