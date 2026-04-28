import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Real-Time Productivity Hub</p>
        <h1>Team task board with live insights</h1>
      </div>
      <div className="topbar-actions">
        <div className="user-chip">
          <span>{user?.name}</span>
          <small>{user?.email}</small>
        </div>
        <button className="ghost-button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

