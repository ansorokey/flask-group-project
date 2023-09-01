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



    const dailyMenu = <div className="daily-options-menu" ref={ulRef}>
        <div onClick={() => setModalContent(<EditDailyForm  />)}>
            <i className="fa-solid fa-pen"></i>
            Edit
        </div>
        <hr />
        <div onClick={() => setModalContent(<DeleteDailyModal  />)}>
            <i className="fa-solid fa-trash-can"></i>
                Delete
        </div>
    </div>

  const markComplete = (id) => {
    dispatch(completeDaily(id));
  };


    return (
        <div
            className="dailyItem"
        >
                <div>
                {" "}
                <input
                    type="checkbox"
                    onChange={(e) => {
                    markComplete(daily.id);
                    }}
                />{" "}
                </div>
                <div>{daily.title} </div>
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

                    <div className="streak"> ▶▶ {daily.streak} </div>
                </div>
          </div>
    );

}

export default DisplayDailyItems;
