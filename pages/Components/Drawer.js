import Link from "next/link";
 const Drawer = ({drawerId,navigation=[]}) => {
  return (
    <div
      className="hidden w-1/2 border-t-2  h-full  py-6 bg-white fixed z-40 border-r-2 "
      id={drawerId}
    >
      <span
        className="float-right h-6 w-6 mr-3"
        onClick={() =>
          document.getElementById(drawerId).classList.add("hidden")
        }
      >
        <img src="https://img.icons8.com/fluency-systems-regular/48/000000/x.png" />
      </span>
      {navigation.map((link) => (
        <Link href={link.href} key={link.name}>
          <a className="block mb-4 mt-5 mx-10 text-base font-medium text-gray-700 hover:text-indigo-50">
            {link.name}
          </a>
        </Link>
      ))}
    </div>
  );
};
export default Drawer;
