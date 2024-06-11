import { LineStyle, PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SideBarUser = () => {
  return (
    <div className="px-4">
      <div>
        <h3 className="sideBar-menu-title ">Dashboard</h3>
        <ul className=" text-gray-700">
          <Link to="/homeUser">
            <li className="sideBar-menu-list-item">
              <LineStyle />

              <span>Home</span>
            </li>
          </Link>

          <Link to="/requestsUser">
            <li className="sideBar-menu-list-item">
              <LineStyle />

              <span>Requests</span>
            </li>
          </Link>
          
          <Link to="/logsUser">
            <li className="sideBar-menu-list-item">
              <PersonOutline /> <span>Logs</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBarUser;
