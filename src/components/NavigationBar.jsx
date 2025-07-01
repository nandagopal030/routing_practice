import '../css/NavigationBar.css'
import {Link} from 'react-router-dom'

const NavigationBar = () => {
  return (
   <div className="nav-bar">
    <div className="logo">Nanda's page</div>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/form">Form</Link></li>
        <li><Link to="/data">Data</Link></li>
        <li><Link to="/login">Login/Register</Link></li>
    </ul>
   </div>
  )
}

export default NavigationBar;