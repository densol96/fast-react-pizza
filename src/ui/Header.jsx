import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { useSelector } from "react-redux";

function Header() {
  const username = useSelector((state) => state.user.username);

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-4 uppercase sm:px-6">
      <Link className="tracking-[5px]" to="/">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {username && (
        <div className="flex items-center gap-5">
          <span className="group relative transition-colors duration-200 hover:cursor-pointer hover:text-yellow-950">
            <ul className="absolute right-0 top-[150%] flex h-40 w-72 flex-col gap-2 divide-white overflow-y-auto bg-yellow-400 px-3 py-3">
              <li className="flex justify-center bg-yellow-100 px-3 py-3">
                #9K8KG5
              </li>
              <Link to="/app/order/#9K8KG5">
                <li className="bg-yellow-100 px-3 py-3">#9K8KG5</li>
              </Link>

              <li className="bg-yellow-100 px-3 py-3">#9K8KG5</li>
              <li className="bg-yellow-100 px-3 py-3">#9K8KG5</li>
            </ul>
            <ion-icon size="large" name="bag-check-outline"></ion-icon>
          </span>
          <Username username={username} />
        </div>
      )}
    </header>
  );
}

export default Header;
