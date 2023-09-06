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

        if (!title) return
        const newDaily = {title: title}

        dispatch(createDaily(newDaily))

        dispatch(loadAllDailies())
        setTitle('')

    }



    const dailies = useSelector((state) => state.daily)



    return <div className="daily_cont">
    <div className="dailyTitleCont">
        <div className="titleLeft">
            <h2 id='titleDaily'>Dailies</h2>
            {/* display a little purple circle with the number of how many dailies are due */}
        </div>
        <div className="titleRight" onChange={(e)=>setCat(e.target.value)}>

        <input type="radio" value="due" id="due" name="daily" checked={cat === 'due'} />
        <label for="due">Due</label>
        <input type="radio" value="notdue" name="daily" id = "notdue" checked={cat === 'notdue'} /> <label for="notdue">Not Due</label>
        <input type="radio" value="all" id="all" name="daily" checked={cat === 'all'} />
        <label for="all">All</label>
        </div>
    </div>

    <div className="greyBox">

        <form className="habit-quick-add" onSubmit={handleSubmit} >
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

            <div>📆</div>
            <div>These are your Dailies</div>
            <div>Dailies repeat on a regular basis. Choose the schedule that works best for you!</div>
        </div>
    </div>

</div>

}

export default DailyCont
