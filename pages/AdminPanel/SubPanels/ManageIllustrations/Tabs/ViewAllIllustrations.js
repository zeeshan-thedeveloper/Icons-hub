import { useState,useEffect } from "react";
import IllustrationListItem from "./IllustrationListItem";

function ViewAllIllustrations(props) {
  const [listOfIllustrations, setListOfAllIllustrations] = useState([]);
  const [shouldListReload, setShouldListReload] = useState(false);
  const [serverResponse, setServerResponse] = useState("Loading...");
  
  useEffect(() => {
    setShouldListReload(true);
  }, []);
  useEffect(() => {
    // Load designs.
    console.log("We are trying to relaoad the list.");
    if (shouldListReload) {
      fetch("/api/AdminPanel_api/load_all_illustrations_api", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(
          (resp) => {
            return resp.json();
          },
          (error) => {
            console.log(error);
          }
        )
        .then((data) => {
          console.log(data);
          if (data.responseCode === 1) {
            console.log("Loaded illustrations");
            console.log(data.responsePayload);
            setServerResponse("");
            setListOfAllIllustrations(data.responsePayload);
          } else if (data.responseCode === 2) {
            console.log(data);
            setServerResponse(data.responseMessage);
          } else {
          }
        });
    }
  }, [shouldListReload]);

  return (
    <div>
    <div className="text-right ">
      <button
        type="button"
        className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
        onClick={() => {
          // props.setIsOpen(false);
          // setOpen(false);
          setServerResponse("");
          setShouldListReload(!shouldListReload);
        }}
      >
        {"Reload"}
      </button>
      {serverResponse}
    </div>

    <div>
      {listOfIllustrations.length != 0 ? (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {listOfIllustrations.map((item, index) => {
              return (
                <div key={index}>
                  <IllustrationListItem
                    item={item}
                    setShouldListReload={setShouldListReload}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>{"Navigate to 'Add  illustration' to add some designs"} </div>
      )}
    </div>
  </div>
  );
}

export default ViewAllIllustrations;
