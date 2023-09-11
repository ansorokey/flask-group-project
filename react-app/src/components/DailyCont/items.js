import { useState , useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { completeDaily } from "../../store/daily";
import { useModal } from "../../context/Modal";
import EditDailyForm from "./EditDailyForm";
import DeleteDailyModal from "./DeleteDailyModal";
import "./daily.css"

function DisplayDailyItems({daily}) {

  const [showMenu, setShowMenu] = useState(false);

  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const ulRef = useRef(null);

  // Set up a click listener to close the options menu if its open and a click occurs. Because it is in a useEffect it will not apply until the menu has been opened and the state changes to true
  useEffect(() => {
    const closeMenuOutsideClick = (e) => {
      if (showMenu) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenuOutsideClick);
    return () => {
      document.removeEventListener("click", closeMenuOutsideClick);
    };
  }, [showMenu]);


  // This is the daily menu that will display when the showMenu useState is true
    const dailyMenu = <div className="daily-options-menu" ref={ulRef}>
        <div className="dailyOption" onClick={() => setModalContent(<EditDailyForm  daily={daily}/>)}>
            <i className="fa-solid fa-pen"></i>  Edit

        </div>
        <hr />
        <div className="dailyOption" onClick={() => setModalContent(<DeleteDailyModal daily={daily}  />)}>
            <i className="fa-solid fa-trash-can"></i>  Delete

        </div>
    </div>

  // when a user checks off an item as complete we update the item's status and streak
  const markComplete = (id) => {
    dispatch(completeDaily(id));
  };


    return (
        <div className="dailyItem">
          <div className={`dailyCheckbox ${daily.completed ? 'completed' : 'notCompleted'}`}>
            <div className="checkbox">
              <input
                type="checkbox"
                className="hiddenCheck"
                id={`checkbox_${daily.id}`}
                checked={daily.completed}
                onChange={(e) => {
                  markComplete(daily.id);
                }}
              />
               <label htmlFor={`checkbox_${daily.id}`} className="checkbox-label"></label>
            </div>
          </div>
          <div className="dailyTitle">
            {daily.title}
          </div>
          <div className="dailyDesc">
                {daily.description}
          </div>
          <div className="dailyItemRight">

            <div className="options">
              <div
                className="daily-options-btn"
                title="options"
                onClick={() => setShowMenu(!showMenu)}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>

              {showMenu && dailyMenu}
            </div>

            <div className="streak">
            <i className="fa-solid fa-forward icon-forward"></i>
              {daily.streak}
            </div>
          </div>
        </div>
    );

}

export default DisplayDailyItems;
