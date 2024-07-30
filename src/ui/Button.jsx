import { Link } from "react-router-dom";

function Button({ children, disabled, to, onClick, type }) {
  const base =
    "inline-block text-sm rounded-full font-semibold uppercase tracking-wide " +
    "text-stone-800 transition-colors duration-300" +
    " focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary:
      base +
      " px-4 py-3 md:px-6 md:py-4 bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-500",
    small:
      base +
      " text-xs focus:ring-yellow-500 px-4 py-2 md:px-5 md:py-2.5 text-xs bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-100",
    secondary:
      " inline-block border-2 border-stone-300 rounded-full font-semibold uppercase tracking-wide text-stone-500 hover:text-stone-800 focus:text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-3.5",
    delete:
      base +
      " text-xs focus:ring-red-500 px-4 py-2 md:px-5 md:py-2.5 text-xs bg-red-400 border-2 border-red-400 hover:border-red-300 hover:bg-red-300 focus:bg-red-300",
    round:
      base +
      " text-xs px-2.5 py-1 md:px-3.5 md:py-2.5 text-xs bg-yellow-400 focus:ring-yellow-500 hover:bg-yellow-300",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
