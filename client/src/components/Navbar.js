import '../styles/Navbar.css'
import ucmLogo from '../images/UCM-logo.png'


export default function LoginNavbar (){
  return (
    <nav className="nav">
      <a href='/'>
        <img src={ucmLogo} className='mercedLogo' ></img>
      </a>
    </nav>
  )
}