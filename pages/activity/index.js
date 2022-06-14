import IllustrationCard from "../Components/illustrationCard";
import Title from "../Components/title";
import Layout from "../Components/layout";
import { useState, useEffect } from "react";
import resizeSVG from "../../SVGManagerAPI/SVGSizeModifierAPI";
import Link from "next/link";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import recentDownloadIllustrationByPublic from "../../SVGManagerAPI/recentDownloadIllustartionByPublic";
import { useRouter } from "next/router";

const Index = () => {
  const [recentDownloadIllustration, setRecentDownloadIllustration] = useState([
    {},
    {},
    {},
    {}
  ]);
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("isLogin") == null) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("isLogin") != null) {
      const EST_WIDTH = "300";
      const EST_HEIGHT = "200";
      const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
      const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

      let resizedData = recentDownloadIllustrationByPublic.map((svg, index) => {
        return {
          id: svg.id,
          name: svg.name,
          downloadedBy: svg.downloadedBy,
          data: resizeSVG(
            svg.data,
            EST_WIDTH,
            EST_HEIGHT,
            EST_VIEWBOX,
            MOBILEORDESKTOP
          ),
          originalIllustration: illustration.originalIllustration
        };
      });
      setRecentDownloadIllustration([...resizedData]);
      setCurrentPrimaryColors(primaryColors);
    }
  }, []);

  return (
    <div>
      <div className="grid  grid-cols-1">
        <div>
          {/*illutration */}
          <div className="space-y-12 mt-20">
            <div className="sm:px-20 px-4 space-y-12 py-10">
              <Title title={`Recent Download Illustrations`} />
              <ul
                role="list"
                className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
              >
                {recentDownloadIllustration.length > 0 &&
                  recentDownloadIllustration.map((illustraion, index) => (
                    <li
                      key={`illustraion_${index}`}
                      className="pb-6  border cursor-pointer   rounded-lg  "
                    >
                      <div className="">
                        <h3 className=" mx-1 pt-2 text-lg inline-block">
                          {illustraion.downloadedBy != undefined &&
                            illustraion.downloadedBy.firstName}
                        </h3>
                        <span className="h-5 w-5 inline-block float-right pt-2 mx-2">
                          {/* <Link href={illustraion.downloadedBy.websiteLink}> */}
                          <img src="https://img.icons8.com/material-outlined/24/000000/forward-arrow.png" />{" "}
                          {/* </Link> */}
                        </span>
                      </div>
                      <h4 className="mx-2 float-left pb-2 block text-gray-500 text-md ">
                        {illustraion.downloadedBy != undefined &&
                          illustraion.downloadedBy.country}
                      </h4>
                      <IllustrationCard
                        illustraion={illustraion}
                        primaryColors={currentPrimaryColors}
                      />
                    </li>
                  ))}
              </ul>
              <div className="space-y-1 pb-4 sm:space-y-1  md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <span className="mx-2 cursor-pointer text-lg float-right ">
                  see More{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// Index.getLayout = function getLayout(page) {
//   return (
//     <>
//       <Drawer drawerId="activityDrawer" navigation={navigation} />
//       <ActivityHeader />
//       <main>{page}</main>
//       <Footer />{" "}
//     </>
//   );
// };
