import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDailies, createDaily } from "../../store/daily";
import DisplayDailyItems from "./items";



function DailyCont () {
    const dispatch = useDispatch();
    const[cat, setCat] = useState('due')
    const[title, setTitle] = useState('')


    useEffect(()=>{
        dispatch(loadAllDailies());
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createDaily({title}))

        setTitle('')

    }



    const dailies = useSelector((state) => state.daily)



    return <div className="daily_cont">
    <div className="dailyTitleCont">
        <div className="titleLeft">
            <p id='titleDaily'>Dailies</p>
            {/* display a little purple circle with the number of how many dailies are due */}
        </div>
        <div className="titleRight" onChange={(e)=>setCat(e.target.value)}>

        <input type="radio" value="due" name="daily" checked={cat === 'due'} /> Due
        <input type="radio" value="notdue" name="daily" checked={cat === 'notdue'} /> Not Due
        <input type="radio" value="all" name="daily" checked={cat === 'all'} /> All
        </div>
    </div>

    <div className="greyBox">

        <form onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="Add a Daily"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)} />
        </form>
        <div>
            {Object.values(dailies[cat]).map((daily) => (
                <DisplayDailyItems key={daily.id} daily={daily} />
            ))}
        </div>
        <div className="ExplainBox">

            <p>📆</p>
            <h3>These are your Dailies</h3>
            <p>Dailies repeat on a regular basis. Choose the schedule that works best for you!</p>
        </div>
    </div>

</div>

}

export default DailyCont
