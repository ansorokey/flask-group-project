import { useState} from "react";
import { useDispatch} from "react-redux";
import { completeDaily } from "../../store/daily";


function DisplayDailyItems(props){
    const [comId, setComId] = useState()
    const dispatch = useDispatch()

    const markComplete = (id) => {
        dispatch(completeDaily(id))
    }


    return <div>
                { Object.values(props.dailies).map((daily) =>{
                    return (
                        <div >
                            <div> <input type="checkbox" onChange={e =>{markComplete(daily.id);}}/> </div>
                            <div>{daily.title} </div>
                            <div>▶▶  {daily.streak} </div>


                        </div>
                    )
                })}
           </div>
}

export default DisplayDailyItems
