import './LandingPage.css';
import SignupFormPage from '../SignupFormPage';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal";

function LandingPage() {
    const { setModalContent } = useModal();

    return (<div className='landing-page'>
        <div className="landing-page-ctn">
            <div className='landing-sec-1'>
                <div className='landing-header'>
                    <img src="https://habitica.com/static/img/home-main@3x.23eeafe4.png" />
                    <h1>Motivate yourself to achieve your goals.</h1>
                    <p>It's time to have fun when you get things done! Join over 4 people and improve your life one task at a time.</p>
                </div>
                <SignupFormPage/>

            </div>

            <div className='landing-sec-2'>
                <div className='sec2MainCont'>
                    <h2 className="ct">Gamify Your Life</h2>
                    <p className="ct">Levelup is a free habit-building and productivity app that treats your real life like a game. With in-game rewards and punishments to motivate you and a strong social network to inspire you, Levelup can help you achieve your goals to become healthy, hard-working, and happy.</p>
                </div>
                <div className='hilight-ctn'>
                    <div className='landing-hilight'>
                        <img className="landing-img" src="https://habitica.com/static/img/track-habits@3x.7293d5cc.png"/>
                        <div>
                            <h3 className="ct">Track Your Habits and Goals</h3>
                            <p className="ct">Stay accountable by tracking and managing your Habits, Daily goals, and To Do list with Levelup’s easy-to-use mobile apps and web interface.</p>
                        </div>
                    </div>

                    <div className='landing-hilight'>
                        <img src='https://habitica.com/static/img/earn-rewards@3x.acaba17e.png' />
                        <div>
                            <h3 className="ct">Earn Rewards for Your Goals</h3>
                            <p className="ct">Check off tasks to level up your Avatar and unlock in-game features such as battle armor, mysterious pets, magic skills, and even quests!</p>
                        </div>
                    </div>

                    <div className='landing-hilight'>
                        <img src="https://habitica.com/static/img/battle-monsters@3x.7cd8d3e0.png" />
                        <div>
                            <h3 className="ct">Battle Monsters with Friends</h3>
                            <p className="ct">Fight monsters with other people! Use the Gold that you earn to buy in-game or custom rewards, like watching an episode of your favorite TV show.</p>
                        </div>
                    </div>
                </div>


            </div>

            <div className='landing-sec-3'>
                <h2 className="ct">Players Use Levelup to Improve</h2>

                <div className='hilight-ctn'>
                    <div className='landing-hilight'>
                        <img src="https://habitica.com/static/img/health-fitness@3x.9676cd74.png" />
                        <div>
                            <h3 className="ct">Health and Fitness</h3>
                            <p className="ct">Never motivated to floss? Can't seem to get to the gym? Levelup finally makes it fun to get healthy.</p>
                        </div>
                    </div>

                    <div className='landing-hilight'>
                        <img src='https://habitica.com/static/img/school-work@3x.d6eb1650.png' />
                        <div>
                            <h3 className="ct">School and Work</h3>
                            <p className="ct">Whether you're preparing a report for your teacher or your boss, it's easy to keep track of your progress as you tackle your toughest tasks.</p>
                        </div>
                    </div>

                    <div className='landing-hilight'>
                        <img src='https://habitica.com/static/img/much-more@3x.e3ed259a.png' />
                        <div>
                            <h3 className="ct">And much, much more!</h3>
                            <p className="ct">Our fully customizable task list means that you can shape Levelup to fit your personal goals. Work on creative projects, emphasize self-care, or pursue a different dream -- it's all up to you.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='landing-sec-4'>
                <div>
                    <img src='https://habitica.com/static/img/mobile-preview@3x.422fbec7.png' id="l-4-pic"/>
                </div>
                <div className='sec4Content'>
                    <h2 className="ct">Level Up Anywhere</h2>
                    <p>Our app make it simple to keep track of your tasks on-the-go. Accomplish your goals with a single tap, no matter where you are.</p>

                </div>
            </div>

            <div className='landing-sec-5'>
                <h2 className='ct'>Join over 4 people having fun while accomplishing their goals!</h2>

                <div onClick={() => setModalContent(<SignupFormModal />)} className="bottomJoin" >
                    Join LevelUp Today
                </div>

            </div>

            <div className='footer'>
                {/* <img className='mountains' src='https://res.cloudinary.com/dzntryr5a/image/upload/v1694043036/mountains_drypau.png' />
                <img className='mountains' src='https://habitica.com/static/img/midground_foreground_extended2.0fe8082c.png' /> */}
            </div>
        </div>
    </div>);
}

export default LandingPage;
