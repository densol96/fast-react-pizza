import { useDispatch, useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useEffect } from "react";
import { updateReadressingStatus } from "../features/protecting/readressingSlice";

function Home() {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateReadressingStatus(false));
  }, []);

  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button to="app/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
