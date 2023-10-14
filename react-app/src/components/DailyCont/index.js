import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDailies, createDaily } from "../../store/daily";
import DisplayDailyItems from "./items";



function DailyCont () {
    const dispatch = useDispatch();
    const[cat, setCat] = useState('due')
    const[title, setTitle] = useState('')
    const [error, setError] = useState({})


    useEffect(()=>{
        dispatch(loadAllDailies());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Handle cases with improper title input and display proper error

        let err = {}
        if (!title) return
        if (title && (title.length > 50 || title.length < 3)) {
            err.title = "Title must be be between 3 and 50 characters"
        }
        if (Object.values(err).length){
            // must use a dummy object to create all error key/value pairs THEN set them all at once in the real error object or there will be issues
            setError(err)
            return
        }else{
            // this is so the errors go away when a new input is submitted that is valid
            setError({})
        }
        const newDaily = {title: title}
        await dispatch(createDaily(newDaily))
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
        <div className="titleRight" >
            {/* These are my top tabs that flip between the data sets to display */}
            <input type="radio" value="due" id="due" name="daily" checked={cat === 'due'} onChange={(e)=>{setCat(e.target.value)}} />
            <label htmlFor="due">Due</label>

            <input type="radio" value="notdue" name="daily" id = "notdue" checked={cat === 'notdue'} onChange={(e)=>{setCat(e.target.value)}} />
            <label htmlFor="notdue">Not Due</label>

            <input type="radio" value="all" id="all" name="daily" checked={cat === 'all'} onChange={(e)=>{setCat(e.target.value)}} />
            <label htmlFor="all">All</label>

        </div>
    </div>

    <div className="greyBox">
        
        {/* This is the add title part to create a new habit */}
        <form className="habit-quick-add" onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="Add a Daily"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            {error.title}
            {/* When a form doesnt have a submit button the default functionality is to submit on enter*/}
        </form>


        <div>
            {/* Here is where we loop through every indv daily to display a card for each one */}
            {Object.values(dailies[cat]).map((daily) => (
                <DisplayDailyItems key={daily.id} daily={daily} />
            ))}
        </div>


        <div className="ExplainBox">
                {/* This is the footer at the bottom that gives a little info on how to use this catagory */}
            <div><i className="fa-solid fa-calendar-days"></i></div>
            <div>These are your Dailies</div>
            <div>Dailies repeat on a regular basis. Choose the schedule that works best for you!</div>
        </div>
    </div>

</div>

}

export default DailyCont
