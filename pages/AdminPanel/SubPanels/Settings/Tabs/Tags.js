import produce from "immer";
import { useEffect, useState } from "react";
import DeleteConfimation_ForTag from "../Dialogs/DeleteConfimation_ForTag";
import UpdatingRow_ForTags from "../Dialogs/UpdatingRow_ForTags";

function Tags(props) {
  const [currentAdminLogedIn, setCurrentAdminLogedIn] = useState("");
  const [TagTitle, setTagTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletionConfirm, setIsDeletionConfirm] = useState(false);
  const [selectedRowNumber, setSelectedRowNumber] = useState(0);
  const [isEdittModalOpen, setIsEditModalOpen] = useState(false);
  const [updateTag, setUpdateTag] = useState("");
  const [listOfTags, setlListOfTags] = useState([]);
  const [shouldLoadList, setShouldLoadtist] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [loadingDataMessage,setLoadingDataMessage]=useState("");

  useEffect(() => {
    setShouldLoadtist(true);
    if(localStorage.getItem("userName")!=null)
    setCurrentAdminLogedIn(localStorage.getItem("userName"));
  }, []);

  useEffect(() => {
    if (shouldLoadList) {
      // Load the list.
      setLoadingDataMessage("Loading Tags please wait..");
      fetch("/api/AdminPanel_api/load_tags_api", {
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
            setLoadingDataMessage("");
            setlListOfTags(data.responsePayload);
          }
          else{
            setLoadingDataMessage("Failed to load data");
          }
        });
    }
  }, [shouldLoadList]);

  const handelCreate = () => {
    setShouldLoadtist(false);
    if (TagTitle != null) {
      setWaitingMessage("Please wait Inserting new tag");
      const data = {
        title: TagTitle,
        createdBy: currentAdminLogedIn,
      };

      fetch("/api/AdminPanel_api/add_new_tag_api", {
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
          if (data.responseCode === 1) {
            setShouldLoadtist(true);
            setWaitingMessage("Successfully inserted");
            setlListOfTags(
              produce(listOfTags, (draft) => {
                draft.push({
                  title: TagTitle,
                  createdBy: currentAdminLogedIn,
                });
                return draft;
              })
            );
          } else if (data.responseCode === 2) {
            setWaitingMessage("Try again");
          } else {
          }
        });
    }
  };

  const deleteItemFromTagsList = (e) => {
    const tempArray = [];
    listOfTags.forEach((item, index) => {
      if (index != selectedRowNumber) tempArray.push(item);
    });
    setlListOfTags(tempArray);
  };

  const updateTagInList = (e) => {
    setlListOfTags(
      produce(listOfTags, (draft) => {
        draft.map((item, index) => {
          if (index == selectedRowNumber) {
            console.log(item.title);
            item.title = updateTag;
          }
          return item;
        });
        return draft;
      })
    );
  };

  const handelDeleteTag = (e) => {
    setSelectedItem(listOfTags[e.target.id]);
    setSelectedRowNumber(e.target.id);
    setIsDeleteModalOpen(true);
    console.log("Selected item ");
    console.log(listOfTags[e.target.id]);
  };
  const handelEditTag = (e) => {
    setSelectedItem(listOfTags[e.target.id]);
    setSelectedRowNumber(e.target.id);
    setUpdateTag(listOfTags[e.target.id].title);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Tag Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="email"
              id="email"
              value={TagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Example: Social Media"
            />
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
        <div className="text-left">{waitingMessage} {loadingDataMessage}</div>
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
                        Tag Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                      >
                        Created By
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  {listOfTags.length === 0 ? (
                    <div className="text-center"></div>
                  ) : (
                    <tbody>
                      {listOfTags.map((Tag, TagIdx) => (
                        <tr
                          key={TagIdx}
                          className={
                            TagIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {TagIdx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Tag.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Tag.createdBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                              id={TagIdx}
                              className="text-indigo-600 hover:text-indigo-900"
                              style={{ cursor: "pointer" }}
                              onClick={handelDeleteTag}
                            >
                              Delete
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                              id={TagIdx}
                              style={{ cursor: "pointer" }}
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={handelEditTag}
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

      {listOfTags.length === 0 ? (
        ""
      ) : (
        <DeleteConfimation_ForTag
          setShouldLoadtist={setShouldLoadtist}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          selectedItem={selectedItem}
          updateTag={updateTag}
          deleteItemFromTagsList={deleteItemFromTagsList}
        />
      )}

      {listOfTags.length === 0 ? (
        ""
      ) : (
        <UpdatingRow_ForTags
          setShouldLoadtist={setShouldLoadtist}
          isOpen={isEdittModalOpen}
          setIsOpen={setIsEditModalOpen}
          selectedItem={selectedItem}
          updateTag={updateTag}
          setUpdateTag={setUpdateTag}
          updateTagInList={updateTagInList}
        />
      )}
    </div>
  );
}

export default Tags;
