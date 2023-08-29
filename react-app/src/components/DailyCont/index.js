function DailyCont () {
    return         <div className="daily_cont">
    <div className="dailyTitleCont">
        <div className="titleLeft">
            <p id='titleDaily'>Dailies</p>
            {/* display a little purple circle with the number of how many dailies are due */}
        </div>
        <div className="titleRight">
            <p className="dailyTab">All</p>
            <p className="dailyTab">Due</p>
            <p className="dailyTab">Not Due</p>
        </div>
    </div>

    <div className="greyBox">
        <button>Add a Daily</button>
        <div>
            {/* LOOP AND DISPLAY DAILIES HERE */}
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
