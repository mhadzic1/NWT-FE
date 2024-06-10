import { LineStyle, PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="px-4">
      <div>
        <h3 className="sideBar-menu-title ">Dashboard</h3>
        <ul className=" text-gray-700">
          <Link to="/home">
            <li className="sideBar-menu-list-item">
              <LineStyle />

              <span>Home</span>
            </li>
          </Link>
          <Link to="/administration">
            <li className="sideBar-menu-list-item">
              <PersonOutline /> <span>Administration</span>
            </li>
          </Link>
          {/* <Link to="/requestsPage">
            <li className="sideBar-menu-list-item">
              <PersonOutline /> <span>Doctors</span>
            </li>
          </Link> */}

          <Link to="/requests">
            <li className="sideBar-menu-list-item">
              <PersonOutline /> <span>Requests</span>
            </li>
          </Link>

          <Link to="/logs">
            <li className="sideBar-menu-list-item">
              <PersonOutline /> <span>Logs</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;