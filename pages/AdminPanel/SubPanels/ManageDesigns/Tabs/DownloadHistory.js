import { useState, useRef, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// {
  // downloadId: "1",
  // downloadedDesignTitle: "Design title",
  // userEmail: "abc@gmail.com",
  // userName: "ABC",
  // userCountry: "Pakistan",
  // userWebsite: "something.com",
// },

function DownloadHistory(props) {
  const cancelButtonRef = useRef(null);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [shouldListReload, setShouldListReload] = useState(false);
  const [serverResponse, setServerResponse] = useState("Loading...");
  useEffect(() => {
    setShouldListReload(true);
  }, []);
  useEffect(() => {
    // Load designs.
    console.log("We are trying to relaoad the list.");
    if (shouldListReload) {
      fetch("/api/AdminPanel_api/download_downloading_history_of_design_api", {
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
            console.log("Loaded history");
            console.log(data.responsePayload);
            setServerResponse("");
           
            let tempArray = [];
            data.responsePayload.forEach((item, index) => {
              //fetching design
              item.dowloadedDesigns.forEach((design, designIndex) => {
                tempArray.push({
                  downloadId: design.downloadId ,
                  downloadedDesignTitle: design.downloadedDesignTitle,
                  userEmail: item.email,
                  userName:item.firstName,
                  userCountry:item.country,
                  userWebsite: item.websiteLink,
                });
              });
            });
            setListOfUsers(tempArray)
          } else if (data.responseCode === 2) {
            console.log(data);
            setServerResponse(data.responseMessage);
          } else {
          }
        });
    }
  }, [shouldListReload]);

  const handelDownloadCSV = () => {
    const title =  "_downloading_history";
    let rows = [];
    listOfUsers.forEach((item) => {
      rows.push([
        item.userEmail,
        item.userName,
        item.userWebsite,
        item.userCountry,
        item.downloadedDesignTitle
      ]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title}.csv`);

    document.body.appendChild(link);
    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link);
  };

 

  return (
    <div style={{ position: "relative"}}>
      <div>
        <p className="text-2xl">Downloading history</p>
      </div>
      <div style={{ position: "absolute",right: 0, top: 0 }}>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
          onClick={() => {
           
            handelDownloadCSV();
          }}
        >
          Download as CSV
        </button>
      </div>
      <div className=" mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Website
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Design Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listOfUsers.map((person, personIdx) => (
                    <tr
                      key={person.downloadId}
                      className={
                        personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {person.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.userEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.userCountry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.userWebsite}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.downloadedDesignTitle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadHistory;
