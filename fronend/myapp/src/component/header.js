import { Link } from "react-router-dom"
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
            <Link to="/myaccount" class="navbar-brand" >My Account</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <Link to="/" class="nav-link active" aria-current="page" href="#">Home</Link>
                </li>
                <li class="nav-item">
                  <Link to="/productadd" class="nav-link active">Addproduct</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" >Disabled</a>
                </li>
              </ul>

              <Link to='/register'> <button class="btn btn-outline-success me-2" >Register</button></Link>
              <Link to='/login'> <button class="btn btn-outline-info" >Login</button></Link>

            </div>
          </div>
    </nav>

  )
}