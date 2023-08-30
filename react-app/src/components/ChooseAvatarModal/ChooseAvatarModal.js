import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStarterAvatars } from "../../store/avatar";


function ChooseAvatarModal() {
    const [avatarId, setAvatarId] = useState(1);
    const dispatch = useDispatch();
    const avatar_state = useSelector(state => state.avatar);
    const avatar_arr = Object.values(avatar_state);

    useEffect(() => {
        async function initLoad() {
            await dispatch(getStarterAvatars());
        }

        initLoad();
    }, [dispatch]);

    function handleSubmit(e) {
        e.preventDefault();

        // const data = {
        //     avatarId
        // }

        // dispatch(updateUser(data));

    }

    return <div className="choose-avatar-ctn">
        <h1>Welcome to LevelUp!</h1>
        <h2>Start by picking out your new Avatar</h2>
        <p>(Don't worry, you can change this later)</p>

        <form>
            <div className="radio-buttons">
                {avatar_arr.map(av => {
                    return (<label key={av.id}>
                        <img src={av.url} alt="pokemon profile picture"/>
                        <input type="radio" name="avatar" value={av.id} checked={avatarId == av.id} onChange={(e) => {setAvatarId(e.target.value)}} />
                    </label>);
                })}
                {/* <label>
                    <img src='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/001_Bulbasaur_htvvhs.jpg' />
                    <input type="radio" name="avatar" value="1" checked={avatarId == 1} onChange={(e) => {setAvatarId(e.target.value)}}/>
                </label>
                <label>
                    <img src='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/004_Charmander_ezp5zr.jpg'/>
                    <input type="radio" name="avatar" value="4" checked={avatarId == 4} onChange={(e) => {setAvatarId(e.target.value)}}/>
                </label>
                <label>
                    <img src='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/007_Squirtle_kkzcrv.jpg' />
                    <input type="radio" name="avatar" value="7" checked={avatarId == 7} onChange={(e) => {setAvatarId(e.target.value)}}/>
                </label> */}
            </div>

            <button onClick={handleSubmit}>Select</button>
        </form>
    </div>
}

export default ChooseAvatarModal;
