import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/patients">Patients</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation