
function DisplayDailyItems(props){
    console.log('%%%%%')
    console.log(props.dailies)
    return <div>
                { Object.values(props.dailies).map((daily) =>{
                    return (
                        <div>
                            <input type="checkbox" />
                            {daily.title}
                            {daily.streak}
                        </div>
                    )
                })}
           </div>
}

export default DisplayDailyItems
