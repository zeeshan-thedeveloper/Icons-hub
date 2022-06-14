import SearchBar from "../Components/searchBar";

const searchChoices = [
  { name: "All", href: "#" },
  { name: "Design", href: "#" },
  { name: "Illustration", href: "#" },
];

const TopSearchBarContainer = ({handleGetSerachText}) => {
  return (
    <div className="text-center mt-4">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Illustration and Designs</span>{" "}
        <span className="block text-gray-500 xl:inline">
          make your Life Easy
        </span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
        cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
      </p>
      <div className="mt-5 min-width-full sm:flex sm:justify-center md:mt-8 mx-2">
        <form
          action="#"
          method="POST"
          className="mt-3 sm:flex lg:w-3/5 w-full mx-auto"
        >
          <label htmlFor="search" className="sr-only ">
            Search
          </label>

          {/**------------------------------------------------------------------ */}
          <SearchBar searchChoices={searchChoices}  handleGetSerachText={handleGetSerachText}/>
          {/**-------------------------------------------------------- */}
        </form>
      </div>
    </div>
  );
};
export default TopSearchBarContainer;
