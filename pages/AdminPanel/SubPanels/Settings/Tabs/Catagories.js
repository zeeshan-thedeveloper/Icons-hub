import produce from "immer";
import { useEffect, useState } from "react";
import PleaseWaitModal from "../../../Support/PleaseWaitModal";
import DeleteConfimation_ForCatagory from "../Dialogs/DeleteConfimation_ForCatagory";
import UpdatingRow_ForCatagory from "../Dialogs/UpdatingRow_ForCatagory";

function Catagories(props) {
  const [currentAdminLogedIn, setCurrentAdminLogedIn] = useState("");
  const [catagoryTitle, setCatagoryTitle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletionConfirm, setIsDeletionConfirm] = useState(false);
  const [selectedRowNumber, setSelectedRowNumber] = useState(0);
  const [isEdittModalOpen, setIsEditModalOpen] = useState(false);
  const [updateCatagory, setUpdateCatagory] = useState("");
  const [updatedThumbnail, setUpdatedThumbnail] = useState("");
  const [listOfCatagories, setlListOfCatagories] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [shouldLoadList,setShouldLoadtist]=useState(false);
  const [waitingMessage,setWaitingMessage]=useState("");
  const [loadingDataMessage,setLoadingDataMessage]=useState("");
  useEffect(()=>{
    setShouldLoadtist(true);
    if(localStorage.getItem("userName")!=null)
    setCurrentAdminLogedIn(localStorage.getItem("userName"));
  },[])

  useEffect(()=>{
    if(shouldLoadList){
      // Load the list.
      setLoadingDataMessage("Loading Catagories please wait..");
      fetch("/api/AdminPanel_api/load_catagories_api", {
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
          if(data.responseCode===1)
          {
            
            setLoadingDataMessage("");
            setlListOfCatagories(data.responsePayload)
          }else{
            setLoadingDataMessage("Failed to load data");
          }
        });
    }
  },[shouldLoadList])

  const handelCreate = () => {
    setShouldLoadtist(false);
    if (catagoryTitle != null && selectedThumbnail != null) {
      setWaitingMessage("Please wait Inserting new catagagory")
      const data = {
        title:catagoryTitle,
        createdBy:currentAdminLogedIn,
        thumbnail:selectedThumbnail,
      };

      fetch("/api/AdminPanel_api/add_new_catagory", {
        method: "POST",
        body: JSON.stringify(data),
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
          if(data.responseCode===1)
          {
            setShouldLoadtist(true);
            setWaitingMessage("Successfully inserted")
            setlListOfCatagories(
              produce(listOfCatagories, (draft) => {
                draft.push({
                  title: catagoryTitle,
                  thumbnail: selectedThumbnail,
                  createdBy: currentAdminLogedIn,
                });
                return draft;
              })
            );
          }
          else if(data.responseCode===2)
          {
            setWaitingMessage("Try again")
          }
          else{
            
          }
        });
    }
  };
  
  const deleteItemFromCatagoriesList = (e) => {
    const tempArray = [];
    listOfCatagories.forEach((item, index) => {
      if (index != selectedRowNumber) tempArray.push(item);
    });
    console.log(tempArray);
    setlListOfCatagories(tempArray);
  };

  const updateCatagoryInList = (e) => {
    setlListOfCatagories(
      produce(listOfCatagories, (draft) => {
        draft.map((item, index) => {
          if (index == selectedRowNumber) {
            console.log(item.title);
            item.title = updateCatagory;
            item.thumbnail = updatedThumbnail;
          }
          return item;
        });
        return draft;
      })
    );
  };

  const handelDeleteCatagory = (e) => {
    setShouldLoadtist(false);
    setSelectedRowNumber(e.target.id);
    setIsDeleteModalOpen(true);
  };
  const handelEditCatagory = (e) => {
    setSelectedRowNumber(e.target.id);
    setUpdateCatagory(listOfCatagories[e.target.id].title);
    setUpdatedThumbnail(listOfCatagories[e.target.id].thumbnail);
    setIsEditModalOpen(true);
  };
  console.log("Updated values " + updatedThumbnail);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Catagory Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="email"
              id="email"
              value={catagoryTitle}
              onChange={(e) => setCatagoryTitle(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Example: Social Media"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Catagory Thumbnail
          </label>
          <div className="ml-4 mt-1">
            <div className="space-y-1 text-center">
              <div>
                {selectedThumbnail != null ? (
                  <div className="grid grid-cols-2">
                    <div>
                      <div style={{ height: "5rem", width: "5rem" }}>
                        <img src={selectedThumbnail} />
                      </div>
                    </div>
                    <div>
                      <div>
                        <svg
                          className="mx-auto cursor-pointer h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="1 0 48 48"
                          aria-hidden="true"
                          onClick={(e) => {
                            document.getElementById("file-upload").click();
                          }}
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="hidden">
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              // setSelectedThumbnail(e.target.files[0])
                              var reader = new FileReader();
                              reader.readAsDataURL(e.target.files[0]);
                              reader.onload = function () {
                                setSelectedThumbnail(reader.result);
                              };
                              reader.onerror = function (error) {
                                console.log("Error: ", error);
                              };
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <svg
                      className="mx-auto cursor-pointer h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="1 0 48 48"
                      aria-hidden="true"
                      onClick={(e) => {
                        document.getElementById("file-upload").click();
                      }}
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="hidden">
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => {
                          // setSelectedThumbnail(e.target.files[0])
                          var reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onload = function () {
                            setSelectedThumbnail(reader.result);
                          };
                          reader.onerror = function (error) {
                            console.log("Error: ", error);
                          };
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
        <div className="pt-6 pl-2 text-center lg:text-left md:text-left sm:text-left">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handelCreate}
          >
            Create
          </button>
        </div>
        <div className="text-left">
          {waitingMessage}
          {loadingDataMessage}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                      >
                        SN#
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                      >
                        Catagory Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                      >
                        Created By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                      >
                        Thumbnail
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  {listOfCatagories.length === 0 ? (
                    <div className="text-center"></div>
                  ) : (
                    <tbody>
                      {listOfCatagories.map((catagory, catagoryIdx) => (
                        <tr
                          key={catagoryIdx}
                          className={
                            catagoryIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {catagoryIdx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {catagory.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {catagory.createdBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div style={{ height: "5rem", width: "5rem" }}>
                              <img src={catagory.thumbnail} />
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                              id={catagoryIdx}
                              className="text-indigo-600 hover:text-indigo-900"
                              style={{ cursor: "pointer" }}
                              onClick={handelDeleteCatagory}
                            >
                              Delete
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                              id={catagoryIdx}
                              style={{ cursor: "pointer" }}
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={handelEditCatagory}
                            >
                              Edit
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {listOfCatagories.length === 0 ? (
        ""
      ) : (
        <DeleteConfimation_ForCatagory
          setShouldLoadtist={setShouldLoadtist}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          selectedItem={listOfCatagories[selectedRowNumber]}
          deleteItemFromCatagoriesList={deleteItemFromCatagoriesList}
        />
      )}

      {listOfCatagories.length === 0 ? (
        ""
      ) : (
        <UpdatingRow_ForCatagory
          updatedThumbnail={updatedThumbnail}
          setUpdatedThumbnail={setUpdatedThumbnail}
          isOpen={isEdittModalOpen}
          setIsOpen={setIsEditModalOpen}
          seletedItem={listOfCatagories[selectedRowNumber]}
          updateCatagory={updateCatagory}
          setUpdateCatagory={setUpdateCatagory}
          updateCatagoryInList={updateCatagoryInList}
        />
      )}
    </div>
  );
}

export default Catagories;
