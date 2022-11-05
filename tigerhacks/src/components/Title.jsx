import './Title.css';
import logo from '../assets/logo.png';


export default function Title(){
    return(
        <>
            <div className="container">
                <div className='logo'>
                    <img className='logoimg' src={logo} alt="logo"></img>
                </div>
            </div>
        </>
    )
}