import logout from "../../assets/images/logout.svg";
import MediaQuery from "react-responsive";
import { getUserName, getAvatar } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useSelector, useDispatch } from "react-redux";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";



export default function UserMenu() {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const avatarURL = useSelector(getAvatar);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const isLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.user__menu}>
      <p className={css.user__avatar}>
        <span className={css.symbol}>
          <img src={avatarURL} alt="аватар пользователя" />
        </span>
      </p>
      <MediaQuery minWidth={768}>
        <NavLink to="/user">
          <p className={css.user__name}>{userName}</p>
        </NavLink>
      </MediaQuery>
      <button type="button" className={css.logout} onClick={toggleModal}>
        <MediaQuery maxWidth={767}>
          <img src={logout} alt="" width={16} height={16} />
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <p className={css.logout__text}>Выйти</p>
        </MediaQuery>
        {isModalOpen && (
          <LogoutModal
            text={"Вы уверены что хотите выйти?"}
            onCancel={toggleModal}
            onSubmit={isLogOut}
          />
        )}
      </button>
    </div>
  );
}
