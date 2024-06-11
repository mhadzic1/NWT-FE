import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SideBar from "./components/sideBar";
import SideBarUser from "./components/sideBarUser";
import TopBar from "./components/TopBar";
import TopBarUser from "./components/TopBarUser";
import Home from "./pages/home";
import HomeUser from "./pages/homeUser";
import Logs from "./pages/logs"
import LogsUser from "./pages/logsUser";
import User from "./pages/user";
import NewUser from "./pages/newUser";
import Product from "./pages/product";
import Users from "./pages/users";
import LoginPage from "./login";
import Requests from "./pages/requests";
import RequestsUser from "./pages/requestsUser";
import NewRequestUser from "./pages/newRequestUser";
import SingleRequestUser from "./pages/singleRequestUser"
import UnauthorizedPage from './pages/unauthorizedPage';
import NotFoundPage from './pages/404Page';

// const App = () => {
//   const location = useLocation();
//   const path = location.pathname;

//   return (
//     // if path == login, render only the login page
//     path === "/login" ? (
//       <div className="App">
//         <LoginPage />
//       </div>) : (
//       <main className="font-body ">
//         <TopBar></TopBar>
//         <div className="flex ">
//           <div className="flex-1 ">
//             <SideBar></SideBar>
//           </div>

//           <div className="flex-[4_4_0%] ">
//             <Routes>
//               <Route path="/" element={ <Home /> } />
//               <Route path="/homeUser" element={ <HomeUser /> } />
//               <Route path="/requests" element={ <Requests /> } />
//               <Route path="/login" element={ <LoginPage /> } />
//               <Route path="/sla" element={ <ServiceLevelAgreement /> } />
//               <Route path="/patients" element={ <Patients /> } />
//               <Route path="/doctors" element={ <Doctors /> } />
//               <Route path="/user/:id" element={ <User /> } />
//               <Route path="/newUser" element={ <NewUser /> } />
//               <Route path="/consultations" element={ <Consultations /> } />
//               <Route path="/product/:id" element={ <Product /> } />
//             </Routes>
//           </div>
//         </div>
//       </main>
//     ));
// };

const App = () => {
  const location = useLocation();
  const path = location.pathname;


  const regex = /\/singleRequestUser\/\d+$/;

  var singleRequestPath = (path) => {
    return regex.test(path);
  }

  const user = {
    //picture: 'https://via.placeholder.com/150',
    picture: 'https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg?crop=0.6672958942897593xw:1xh;center,top&resize=980:*',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '01/01/1990'
  };


  // if path == login, render only the login page
  if (path === "/login") {
    return (
      <div>
        <LoginPage />
      </div>
    )
  }
  else if (path === "/homeUser" || path === "/requestsUser" || path === "/logsUser" || path === "/newRequestUser" || singleRequestPath(path)) {

    return (
      <main className="font-body scrollable">
        <TopBarUser></TopBarUser>

        <div className="flex ">
          <div className="flex-1 ">
            <SideBarUser></SideBarUser>
          </div>
          {/* <div  className="userWidth " >
                  <div className="App">
                    <HomeUser user={user} />
                  </div>
                </div> */}
          <div className="flex-[4_4_0%] ">
            <Routes>

              <Route path="/homeUser" element={ <HomeUser user={ user } /> } />
              <Route path="/requestsUser" element={ <RequestsUser /> } />
              <Route path="/newRequestUser" element={ <NewRequestUser /> } />
              <Route path="/logsUser" element={ <LogsUser /> } />
              <Route path="/singleRequestUser/:id" element={ <SingleRequestUser /> } />

            </Routes>
          </div>
        </div>

      </main>
    )
  }
  else {
    return (
      <main className="font-body scrollable">
        <TopBar></TopBar>
        <div className="flex ">
          <div className="flex-1 ">
            <SideBar></SideBar>
          </div>

          <div className="flex-[4_4_0%] ">
            <Routes>
              <Route path="/home" element={ <Home /> } />
              {/* <Route path="/homeUser" element={ <HomeUser /> } /> */ }
              <Route path="/requests" element={ <Requests /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/logs" element={ <Logs /> } />
              <Route path="/administration" element={ <Users /> } />
              <Route path="/user/:id" element={ <User /> } />
              <Route path="/newUser" element={ <NewUser /> } />
              <Route path="/product/:id" element={ <Product /> } />
              <Route path="/unauthorized" element={ <UnauthorizedPage /> } /> {/* Unauthorized page route */ }
              {/* <Route path="/requestsPage" element={ <RequestsPage /> } /> */ }
              <Route path="*" element={ <NotFoundPage /> } />
            </Routes>
          </div>
        </div>
      </main>)
  }
};

export default App;
