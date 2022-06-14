import IllustrationCard from "../Components/illustrationCard";
import Title from "../Components/title";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import { useState, useEffect } from "react";
import resizeSVG from "../../SVGManagerAPI/SVGSizeModifierAPI";
import { useRouter } from "next/router";
import Layout from "../Components/layout";
// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "Illustration", href: "/Illustration" },
//   { name: "Design", href: "/Design" },
//   { name: "Activity", href: "#" },
//   { name: "Disclaimer", href: "/disclaimer" },
//   { name: "AboutUs", href: "/aboutUs" },
//   { name: "Contact", href: "/contact" }
// ];

const Index = () => {
  const [recentDownloadIllustration, setRecentDownloadIllustration] = useState([
    {},
    {},
    {},
    {},
    {}
  ]);

  const [userDetails, setUserDetails] = useState({});
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userDetails") != null) {
      setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    } else if (sessionStorage.getItem("userDetails") != null) {
      setUserDetails(JSON.parse(sessionStorage.getItem("userDetails")));
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const EST_WIDTH = "300";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

    if (userDetails.dowloadedIllustrations != undefined) {
      console.log("setting illustrations data");
      let resizedData = userDetails.dowloadedIllustrations.map(
        (illustration, index) => {
          return {
            id: illustration.dowloadedIllustrationId,
            name: illustration.illstrationTitle,
            description: illustration.IllustrationDescription,
            data: resizeSVG(
              illustration.illustrationThumbnail,
              EST_WIDTH,
              EST_HEIGHT,
              EST_VIEWBOX,
              MOBILEORDESKTOP
            ),
            originalIllustration: illustration.originalIllustration
          };
        }
      );
      setRecentDownloadIllustration([...resizedData]);
      setCurrentPrimaryColors(primaryColors);
    }
  }, [userDetails]);
  return (
    <div>
      <div className="space-y-6 mt-5 shadow pb-6 pt-2 bg-gray-900 px-6  mx-10 grid sm:grid-cols-3">
        <div></div>
        <div>
          <h3 className="text-4xl text-center text-white ">
            Welcome{" "}
            <i>
              {userDetails.firstName} {userDetails.lastName}
            </i>
          </h3>
          <div className=" mt-5">
            <h3 className="text-lg mb-2 text-center text-white ">
              {userDetails.email}
            </h3>
          </div>
          <div className=" mt-5">
            <h3 className="text-lg mb-2 text-center text-white ">
              {userDetails.country}
            </h3>
          </div>
          <div className=" mt-5 text-center text-white ">
            <a className="text-lg mb-2" href={userDetails.websiteLink}>
              {userDetails.websiteLink}
            </a>
          </div>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-1">
        <div>
          {/*illutration */}
          <div className="space-y-12 mt-20">
            <div className="sm:px-20 px-4 space-y-12 py-10">
              <Title title={`Recent Download Illustrations`} />
              <ul
                role="list"
                className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
              >
                {recentDownloadIllustration.map((illustraion, index) => (
                  <li
                    key={`illustraion_${index}`}
                    className="pb-6  border cursor-pointer  text-center rounded-lg  text-center"
                  >
                    <IllustrationCard
                      illustraion={illustraion}
                      primaryColors={currentPrimaryColors}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return (
    // <>
    //   <Drawer drawerId="activityDrawer" navigation={navigation} />
    //   <ActivityHeader />
    //   <main>{page}</main>
    //   <Footer />{" "}
    // </>
    <Layout>{page}</Layout>
  );
};
