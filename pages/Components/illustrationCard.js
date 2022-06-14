import { useEffect, useState } from "react";
import produce from "immer";
import SvgOrPngDialog from "./svgOrPngDialog";
import DownloadIllustrationModal from "./downloadIllustrationModal";
import loading from "../../public/loading.gif";
import Image from "next/image";
import Login from "./loginModal";
import {
  SVGColorReplacer,
  findPrimaryColorPosition
} from "../../SVGManagerAPI/SVGColorReplacerAPI";

const IllustrationCard = ({
  targetColor = null,
  primaryColors = [],
  illustraion = {}
}) => {
  const [openIllustrationModal, setOpenIllustrationModal] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [svgToDisplay, setSvgToDisplay] = useState(null);
  const [originalSVG, setOriginal] = useState(null);
  const [primaryColorsPosition, setPrimaryColorsPosition] = useState(null);
  const [isLogin, setIsLogin] = useState("false");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isRememberMe") == "true") {
      setIsLogin(localStorage.getItem("isLogin"));
    } else {
      setIsLogin(sessionStorage.getItem("isLogin"));
    }

    setSelectedThumbnail(illustraion);
  }, [illustraion]);

  useEffect(() => {
    if (selectedThumbnail != null) {
      //console.log("in thumbnail setting")
      setSvgToDisplay(selectedThumbnail.data);
      setOriginal(selectedThumbnail.originalIllustration);
    }
  }, [selectedThumbnail]);

  useEffect(() => {
    if (originalSVG != null) {
      // It will run once.
      //console.log("osvg-------------------");
      //console.log(originalSVG)
      setPrimaryColorsPosition(
        findPrimaryColorPosition(originalSVG, primaryColors)
      );
    }
    // console.log("**********************************************");
    // console.log(primaryColorsPosition);
  }, [originalSVG]);

  useEffect(() => {
    if (targetColor != null && primaryColorsPosition != null) {
      // whenever there will be a change in target color we will update the SVG.
      setSvgToDisplay(
        SVGColorReplacer(
          originalSVG,
          svgToDisplay,
          primaryColors,
          primaryColorsPosition,
          targetColor
        )
      );
    }
  }, [targetColor, primaryColorsPosition]);

  const [openSvgOrPngDialog, setOpenSvgOrPngDialog] = useState(false);
  const handleOpenSVGDiaolog = () => {
    if (isLogin == "true") {
      setOpenSvgOrPngDialog(true);
    } else {
      setOpenLoginModal(true);
    }
  };
  const handleClick = () => {
    setOpenIllustrationModal(true);
  };
  const handleLoginModalClose = () => {
    setOpenLoginModal(false);
  };
  const handleCloseSvgOrPngDialog = () => {
    setOpenSvgOrPngDialog(false);
  };
  const handleCloseIllustrationModal = () => {
    setOpenIllustrationModal(false);
  };
  return (
    <div>
      {Object.keys(illustraion).length === 0 ? (
        <div style={{ position: "absolute", top: "40%", left: "40%" }}>
          {/* {console.log("------------------ loading!!!!!!!!")} */}
          {/* {console.log(illustraion)} */}
          <Image alt="Mountains" src={loading} quality={100} />
        </div>
      ) : (
        <div className="space-y-4 xl:space-y-5">
          {/* {console.log("------------------not loading!!!!!!!!")} */}
          {/* {console.log(illustraion)} */}
          <DownloadIllustrationModal
            open={openIllustrationModal}
            handleClose={handleCloseIllustrationModal}
            selectedIllustration={{
              svgToDisplay: svgToDisplay,
              name: illustraion.name,
              primaryColorsPosition: primaryColorsPosition,
              description: illustraion.description,
              id: illustraion.id,
              originalIllustration: illustraion.originalIllustration
            }}
          />
          <SvgOrPngDialog
            open={openSvgOrPngDialog}
            handleClose={handleCloseSvgOrPngDialog}
            selectedIllustration={svgToDisplay}
            selectedIllustrationTitle={illustraion.name}
            selectedIllustrationDescription={illustraion.description}
            selectedOriginalIllustration={illustraion.originalIllustration}
            selectedIllustrationId={illustraion.id}
            fileName={illustraion.name}
          />
          {selectedThumbnail != null &&
          svgToDisplay != null &&
          primaryColorsPosition != null ? (
            <div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleClick();
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: svgToDisplay }} />
              </div>
              <div className="space-y-2 ">
                <div className="font-medium text-lg leading-6 space-y-1">
                  <h3 className="inline float-left ml-2">{illustraion.name}</h3>
                  {/* <p className="text-indigo-400">{Item.role}</p> */}
                  <span
                    className="inline float-right h-6 w-6 mr-2 cursor-pointer"
                    onClick={handleOpenSVGDiaolog}
                  >
                    <img src="https://img.icons8.com/windows/32/000000/download--v1.png" />
                  </span>
                  <Login
                    open={openLoginModal}
                    handleClose={handleLoginModalClose}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};
export default IllustrationCard;
