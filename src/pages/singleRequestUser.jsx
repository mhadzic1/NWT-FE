import { useState } from "react";
import { requestUsersData } from "../data/dummyData";


const SingleRequestUser = () => {

  const [data, setData] = useState(requestUsersData);

  //Ovdje sam izvukao id od requesta.
  var urlID = window.location.pathname;
  urlID = urlID.slice(19);

  //console.log("UrlId = " + urlID);

  const saveRequest = (e) => {
    //window.close();

    //setData(e.target.value);
  }

  // function handleTextChange(event){
  //     setData(event.target.value);
  // }


  return (
    <>
      <div className="singleReq">
        <h3 className="singleReq_naslov">RequestID: { data.at(urlID - 1).id } </h3>
        <p className="singleReq_status">Status: { data.at(urlID - 1).status } </p>
        <p className="singleReq_date">Date: { data.at(urlID - 1).date }</p>
        <textarea className="singleReq_text" rows={ 5 } cols={ 105 } /*onChange={handleTextChange}*/>{ data.at(urlID - 1).description }</textarea>
        <div className="newRequest_saveButton">
          <button onClick={ saveRequest }>Save</button>
        </div>
      </div>

    </>
  );
};

export default SingleRequestUser;
