function NavBar() {
  return (
    <nav className="shadow-xl bg-blue-200 flex space-x-4 px-5 py-3">
      <a
        href="#"
        className="bg-slate-100 shadow-lg rounded-lg px-3 py-2 text-green-700 font-medium hover:shadow-inner hover:text-green-900"
      >
        Home
      </a>
      <a
        href="#"
        className="bg-slate-100 shadow-lg rounded-lg px-3 py-2 text-green-700 font-medium hover:shadow-inner hover:text-green-900"
      >
        Debt Payoff
      </a>
      <a
        href="#"
        className="bg-slate-100 shadow-lg rounded-lg px-3 py-2 text-green-700 font-medium hover:shadow-inner hover:text-green-900"
      >
        Financial Independence
      </a>
    </nav>
  );
}

export default NavBar;
