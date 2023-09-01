import "../css/comp/sidebar.css";
import "../index.css";
import { FiMenu } from "react-icons/fi";
import {
  BsArrowLeft,
  BsFillChatLeftDotsFill,
  BsFillGearFill,
} from "react-icons/bs";
import { SiFreelancer } from "react-icons/si";
import { BiSolidBusiness, BiSolidDashboard } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebarContext } from "../contexts/sidebarContext";
import { CiDark } from "react-icons/ci";
import { MdDarkMode, MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

function Sidebar(active) {
  const { isOpened, setIsOpened } = useSidebarContext();


  const navigate = useNavigate();

  function isActive(item) {
    if (item == active.active) {
      return true;
    }
    return false;
  }

  function HandleIconClick() {
    setIsOpened(!isOpened);
  }

  function HandleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <div className="sb-dark">
        <div
          className={isOpened ? "sidebar_active" : "sidebar"}
          style={{ transition: "transform 0.3s ease-out, width 0.3s ease-out" }}
        >
          <div className="menu-icon__div">
            <span
              className="menu-icon-span"
              style={{
                transition: "margin-left 0.3s ease-out ",
                marginLeft: isOpened ? "190px" : "33px",
                position: "absolute",
              }}
            >
              {isOpened ? (
                <>
                  <p className="sidebar-title">Junior.com</p>
                  <BsArrowLeft
                    className="menu-icon"
                    onClick={HandleIconClick}
                    size={30}
                    color="black"
                  ></BsArrowLeft>
                </>
              ) : (
                <FiMenu
                  size={30}
                  color="black"
                  className="menu-icon"
                  onClick={HandleIconClick}
                ></FiMenu>
              )}
            </span>
          </div>
          <ul className="sidebar_list">
            <li className="sidebar_item">
              <Link
                to={{ pathname: "/home/home", state: isOpened }}
                className={
                  isActive("home") ? "sidebar-link-active" : "sidebar-link"
                }
              >
                <span
                  className={
                    isOpened
                      ? "sidebar_item-icon-span sidebar_item-icon-span__active"
                      : "sidebar_item-icon-span"
                  }
                  style={{ paddingBottom: isOpened ? "0px" : "15px" }}
                >
                  <BiSolidDashboard
                    size={30}
                    className="sidebar_item-icon"
                  ></BiSolidDashboard>
                  <p className="sidebar_item-text">Home</p>
                </span>
              </Link>
            </li>
            <li className="sidebar_item">
              <Link
                to={{ pathname: "/home/freelancers", state: isOpened }}
                className={
                  isActive("freelancers")
                    ? "sidebar-link-active"
                    : "sidebar-link"
                }
              >
                <span
                  className={
                    isOpened
                      ? "sidebar_item-icon-span sidebar_item-icon-span__active"
                      : "sidebar_item-icon-span"
                  }
                  style={{ paddingBottom: isOpened ? "0px" : "15px" }}
                >
                  <SiFreelancer
                    size={30}
                    className="sidebar_item-icon"
                  ></SiFreelancer>
                  <p className="sidebar_item-text">Freelancers</p>
                </span>
              </Link>
            </li>
            <li className="sidebar_item">
              <Link
                to={{ pathname: "/home/business", state: isOpened }}
                className={
                  isActive("business") ? "sidebar-link-active" : "sidebar-link"
                }
              >
                <span
                  className={
                    isOpened
                      ? "sidebar_item-icon-span sidebar_item-icon-span__active"
                      : "sidebar_item-icon-span"
                  }
                  style={{ paddingBottom: isOpened ? "0px" : "15px" }}
                >
                  <BiSolidBusiness
                    size={30}
                    className="sidebar_item-icon"
                  ></BiSolidBusiness>
                  <p className="sidebar_item-text">Business</p>
                </span>
              </Link>
            </li>
            <li className="sidebar_item">
              <Link
                to={{ pathname: "/home/config", state: isOpened }}
                className={
                  isActive("config") ? "sidebar-link-active" : "sidebar-link"
                }
              >
                <span
                  className={
                    isOpened
                      ? "sidebar_item-icon-span sidebar_item-icon-span__active"
                      : "sidebar_item-icon-span"
                  }
                  style={{ paddingBottom: isOpened ? "0px" : "15px" }}
                >
                  <BsFillGearFill
                    size={30}
                    className="sidebar_item-icon"
                  ></BsFillGearFill>
                  <p className="sidebar_item-text">Config</p>
                </span>
              </Link>
            </li>
            <li className="sidebar_item">
              <Link
                to={{ pathname:`/home/chats`, state: isOpened }}
                className={
                  isActive("chats") ? "sidebar-link-active" : "sidebar-link"
                }
              >
                <span
                  className={
                    isOpened
                      ? "sidebar_item-icon-span sidebar_item-icon-span__active"
                      : "sidebar_item-icon-span"
                  }
                  style={{ paddingBottom: isOpened ? "0px" : "15px" }}
                >
                  <BsFillChatLeftDotsFill
                    size={30}
                    className="sidebar_item-icon"
                  ></BsFillChatLeftDotsFill>
                  <p className="sidebar_item-text">Chats</p>
                </span>
              </Link>
            </li>
            <li className="sidebar_item">
              <span
                onClick={HandleLogOut}
                className={
                  isOpened
                    ? "sidebar_item-icon-span sidebar_item-icon-span__active sidebar-logout"
                    : "sidebar_item-icon-span sidebar-logout"
                }
                style={{ paddingBottom: "0px" }}
              >
                <BiLogOut size={30} className={"sidebar_item-icon"}></BiLogOut>
                <p className="sidebar_item-text">Log out</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
