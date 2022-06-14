import { useEffect, useState } from "react";
import ShowDesignModal from "./showDesignModal";
import Image from "next/image";
import loading from "../../public/loading.gif";

const DesignCard = ({ design = {} }) => {
  const [selectedDesign, setSelectedDesign] = useState({});
  const [openShowDesignModal, setOpenShowDesignModal] = useState(false);

  useEffect(() => {
    setSelectedDesign(design);
  }, [design]);

  const handleStartUsingDesignClick = (design) => {
    setSelectedDesign(design);
    handleShowDesignModalOpen();
  };
  const handleShowDesignModalOpen = () => {
    setOpenShowDesignModal(true);
  };
  const handleShowDesignModalClose = () => {
    setOpenShowDesignModal(false);
  };

  return (
    <div>
      {Object.keys(design).length === 0 ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "200px"
          }}
        >
          <div style={{ position: "absolute", top: "40%", left: "40%" }}>
            {" "}
            <Image alt="Mountains" src={loading} quality={100} />
          </div>{" "}
        </div>
      ) : (
        <div
          className="space-y-6 "
          onClick={() => handleStartUsingDesignClick(design)}
        >
          {/*Show Design Details Modal*/}
          <ShowDesignModal
            open={openShowDesignModal}
            handleClose={handleShowDesignModalClose}
            selectedDesign={selectedDesign}
          />
          <img
            className="mx-auto h-50 w-50 rounded-t  xl:w-full xl:h-96"
            src={design.designThumbnail}
            alt=""
          />
          <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
            <div className="font-medium text-lg mx-4 leading-6 space-y-1">
              <h3 className="text-gray-600">{design.designTitle}</h3>
              {/* <p className="text-indigo-400">{Item.role}</p> */}
            </div>
            <div>
              <span
                className="px-3 border py-2 mx-4 text-gray-800"
                onClick={() => handleStartUsingDesignClick(design)}
              >
                Start Using
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DesignCard;
