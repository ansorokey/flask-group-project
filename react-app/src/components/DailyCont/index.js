import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDailies } from "../../store/daily";
import DisplayDailyItems from "./items";



function DailyCont () {
    const dispatch = useDispatch();
    const[cat, setCat] = useState('Due')


    useEffect(()=>{
        dispatch(loadAllDailies());
    }, [dispatch])



    const dailies = useSelector((state) => state.daily)

    useEffect(()=>{
        console.log(dailies[cat])
    }, [cat])

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
        <button>Add a Daily</button>
        <div>
            {/* LOOP AND DISPLAY DAILIES HERE */}
            <DisplayDailyItems dailies={dailies[cat]} />

        </div>
        <div className="ExplainBox">
            {/* insert calender icon here */}
            <h3>These are your Dailies</h3>
            <p>Dailies repeat on a regular basis. Choose the schedule that works best for you!</p>
        </div>
    </div>

</div>

}

export default DailyCont
