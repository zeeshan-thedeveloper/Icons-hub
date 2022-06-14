import Layout from "./Components/layout";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
};

// const MyApp = ({ Component, pageProps }) => {
//   // const [isLogin, setIsLogin] = useState(
//   //   window.localStorage.getItem("isLogin")
//   // );
//   useEffect(()=>{}[])
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// };
export default MyApp;
