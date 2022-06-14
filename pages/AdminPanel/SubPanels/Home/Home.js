import { useEffect, useState } from "react";
import produce from "immer";
function Home(props) {
  const [totalStatics,setTotalStatics] =useState([
    { name: "Designs", stat: "Loading..." },
    { name: "Illustrations", stat: "Loading..." },
    { name: "Tags", stat: "Loading..."},
    { name: "Catagories", stat: "Loading..." },
    { name: "Languages", stat: "-" },
    { name: "Users", stat: "Loading..." },
  ]);

  const [history,setHistory] =useState([
    { name: "7 days", stat: "0" },
    { name: "30 days", stat: "0" },
    { name: "90 days", stat: "0" },
  ]);


  const [numberOfCats,setNumberOfCats]=useState(0);
  const [numberOfTags,setNumberOfTags]=useState(0);
  const [numberOfDesigns,setNumberOfDesigns]=useState(0);
  const [numberOfIllustrations,setNumberOfIllustrations]=useState(0);
  const [numberOfUsers,setNumberOfUsers]=useState(0);
  const [numberOfLanguages,setNumberOfLanguages]=useState(0);
  

  useEffect(()=>{
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
        if (data.responseCode === 1) {
          // setListOfCatagories(data.responsePayload);
          console.log("responsepayload for design")
          console.log(data.responsePayload)
          // setTotalStatics(produce(totalStatics,draft=>{
          //   // draft[3]=data.responsePayload.length
          //   draft[3].stat=data.responsePayload.length
          //   return draft
          // }))
          setNumberOfCats(data.responsePayload.length)
          
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  },[])

  useEffect(()=>{
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
          // setListOfCatagories(data.responsePayload);
          console.log("responsepayload for tag")
          console.log(data.responsePayload)
          // setTotalStatics(produce(totalStatics,draft=>{
          //   // draft[3]=data.responsePayload.length
          //   draft[2].stat=data.responsePayload.length
          //   return draft
          // }))
          setNumberOfTags(data.responsePayload.length);

        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  },[])

  useEffect(()=>{
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
          // setListOfCatagories(data.responsePayload);
          console.log("responsepayload for design")
          console.log(data.responsePayload)
          // setTotalStatics(produce(totalStatics,draft=>{
          //   // draft[3]=data.responsePayload.length
          //   draft[2].stat=data.responsePayload.length
          //   return draft
          // }))
          setNumberOfIllustrations(data.responsePayload.length);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  },[])


useEffect(()=>{
    fetch("/api/AdminPanel_api/load_all_designs_api", {
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
          // setListOfCatagories(data.responsePayload);
          console.log("responsepayload for design")
          console.log(data.responsePayload)
          // setTotalStatics(produce(totalStatics,draft=>{
          //   // draft[3]=data.responsePayload.length
          //   draft[2].stat=data.responsePayload.length
          //   return draft
          // }))
          setNumberOfDesigns(data.responsePayload.length);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  },[])

  

  
useEffect(()=>{
  fetch("/api/AdminPanel_api/download_downloading_history_of_user_api", {
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
        // setListOfCatagories(data.responsePayload);
        console.log("responsepayload for design")
        console.log(data.responsePayload)
        // setTotalStatics(produce(totalStatics,draft=>{
        //   // draft[3]=data.responsePayload.length
        //   draft[2].stat=data.responsePayload.length
        //   return draft
        // }))
        setNumberOfUsers(data.responsePayload.length);
      } else if (data.responseCode === 2) {
        console.log(data);
      } else {
      }
    });
},[])


  useEffect(()=>{

    
      setTotalStatics(produce(totalStatics,draft=>{
        draft[3].stat=numberOfCats;
        draft[2].stat=numberOfTags;
        draft[0].stat=numberOfDesigns;
        draft[1].stat=numberOfIllustrations;
        draft[5].stat=numberOfUsers
        return draft;
      }))
    

  },[numberOfCats,numberOfTags,numberOfDesigns,numberOfIllustrations,numberOfUsers])
  return (
    <div>
      <div className="mr-5 ml-5 mt-5 lg:mr-20 lg:ml-20 lg:mt-20 text-center">
        <div>
            <p className="text-4xl lg:text-4xl font-medium text-gray-500 truncate">Total</p>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {totalStatics.map((item) => (
            <div
              
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-lg font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mr-5 ml-5 mt-5 lg:mr-20 lg:ml-20 lg:mt-20 text-center">
        <div>
            <p className="text-4xl lg:text-4xl pb-2 font-medium text-gray-500 truncate">Downloading</p>
        </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {history.map((item) => (
            <div
              
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-lg font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default Home;
