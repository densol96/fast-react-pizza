import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import OrderDropDown from "../features/order/OrderDropDown";

function Header() {
  const username = useSelector((state) => state.user.username);

  const [forDisplay, setForDisplay] = useState(false);
  const hideDropDown = () => setForDisplay(false);
  const showDropDown = () => setForDisplay(true);

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 uppercase sm:px-6">
      <Link className="tracking-[5px]" to="/">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {username && (
        <div className="flex items-center gap-5">
          <span
            onMouseLeave={hideDropDown}
            className="relative py-4 pl-10 transition-colors duration-200 hover:text-yellow-950"
          >
            <OrderDropDown
              forDisplay={forDisplay}
              hideDropDown={hideDropDown}
            />
            <span
              onMouseEnter={showDropDown}
              className="hover:cursor-pointer hover:text-yellow-950"
            >
              <ion-icon size="large" name="bag-check-outline"></ion-icon>
            </span>
          </span>
          <Username username={username} />
        </div>
      )}
    </header>
  );
}

export default Header;
