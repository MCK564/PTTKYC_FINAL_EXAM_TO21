import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Team from "./scenes/team";
import DashBoard from "./scenes/dashboard";
import Buildings from "./scenes/buildings";
import Buildingedit from "./scenes/buildings/add_buildings";
import { useState, useContext, Fragment } from "react";
import LoginForm from "./scenes/global/Login";
import { AccountContext } from "./contexts/AccountContext";
import { AccountProvider } from "./contexts/AccountContext";
import SignUp from "./scenes/global/Signup";
import UserHeader from "./scenes/global/User/Header";
import AccountEdit from "./scenes/team/add_account";
import Forgotpassword from "./scenes/global/Forgotpassword";
import Building_trash from "./scenes/buildings/trash";
import UserSupport from "./scenes/glowSupport";
import UserFooter from "./scenes/global/User/Footer";
import GlowHome from "./scenes/glowHome";
import "bootstrap/dist/css/bootstrap.min.css";
import UserBuildings from "./scenes/glowBuildings";
import UserBlog from "./scenes/glowBlog";
import UserAboutUs from "./scenes/glowAboutUs";
import Team_trash from "./scenes/team/trash";
import Login from "./JWT/Login/jndex";
import Building_Image from "./scenes/buildings/add_images";
import PageForbidden from "./scenes/ForbiddenPage";
import GlowContact from "./scenes/glowContact";
import AdminCustomer from "./scenes/customers";

const isLoggedInn = localStorage.getItem("isLoggedIn") === "true";
const accounts = JSON.parse(localStorage.getItem("account"));
function App() {
  const [teamAccountUsername, setUsername] = useState();
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInn);
  const [account, setAccount] = useState(accounts);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Xóa trạng thái đăng nhập từ localStorage khi người dùng đăng xuất
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("account");
  };

  const handleAccount = (value) => {
    if (value !== null) setAccount(value);
    localStorage.setItem("account", JSON.stringify(value));
  };

  return (
    <>
      <Router>
        <AccountProvider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            account,
            setAccount,
            teamAccountUsername,
            setUsername,
          }}
        >
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      onLogin={handleLogin}
                      onAccount={handleAccount}
                    />
                  }
                />
                <Route path="/loginWithToken" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/home" element={<GlowHome />} />
                <Route path="/support" element={<UserSupport />} />
                <Route path="/buildings" element={<UserBuildings />} />
                <Route path="/blog" element={<UserBlog />} />
                <Route path="/about-us" element={<UserAboutUs />} />
                <Route path="/page_forbidden" element={<PageForbidden />} />
                <Route path="/contact" element={<GlowContact />} />
                <Route
                  path="/*"
                  element={
                    <Fragment>
                      {isLoggedIn ? (
                        <div className="app">
                          {account !== null && !account.roleIDs.includes(4) && (
                            <Sidebar account={account} />
                          )}
                          <main className="content">
                            {account !== null &&
                            !account.roleIDs.includes(4) ? (
                              <Topbar onLogout={handleLogout} />
                            ) : (
                              <UserHeader
                                onLogout={handleLogout}
                                account={account}
                              />
                            )}
                            {account !== null &&
                            !account.roleIDs.includes(4) ? (
                              <Routes>
                                <Route
                                  path="/admin/dashboard"
                                  element={<DashBoard />}
                                />
                                <Route
                                  path="/admin/team"
                                  element={<Team account={account} />}
                                />
                                <Route
                                  path="/admin/buildings"
                                  element={<Buildings account={account} />}
                                />
                                <Route
                                  path="/admin/buildings/building-edit"
                                  element={<Buildingedit />}
                                />
                                <Route
                                  path="/admin/team/team-edit"
                                  element={<AccountEdit account={account} />}
                                />
                                <Route
                                  path="admin/buildings/trash"
                                  element={<Building_trash account={account} />}
                                />
                                <Route
                                  path="admin/team/trash"
                                  element={<Team_trash account={account} />}
                                />
                                <Route
                                  path="admin/buildings/building-edit/image"
                                  element={<Building_Image />}
                                />
                                <Route path="/admin/customers" element={<AdminCustomer/>}/>
                              </Routes>
                            ) : (
                              <Routes>
                                <Route
                                  path="/admin/*"
                                  element={<Navigate to="/page_forbidden" />}
                                />
                              </Routes>
                            )}
                          </main>
                          <UserFooter />
                        </div>
                      ) : (
                        <Navigate to="/login" />
                      )}
                    </Fragment>
                  }
                />
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AccountProvider>
      </Router>
    </>
  );
}

export default App;
