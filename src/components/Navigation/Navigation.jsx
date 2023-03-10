import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./Navigation.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="Navigation">
        <h1>Ledgerly</h1>
        <h3>Welcome, {user.name}</h3>
        <h4>{user.businessName}</h4>
      </div>
      <div className="Navigation">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/income">Income</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="" onClick={handleLogOut}><i class="fa-solid fa-right-from-bracket"></i> Log Out</Link>
      </div>
    </nav>
  );
}
