import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";

import CustomCountdown from "./CustomCountdown";

function CountdownList() {
  const [countdowns, setCountdowns] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    var db = firebase.firestore();
    let data = [];
    db.collection(id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setCountdowns(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [id]);

  return (
    <div>
      {countdowns.map((countdown) => (
        <CustomCountdown
          datetime={countdown.datetime}
          eventName={countdown.name}
        />
      ))}
    </div>
  );
}

export default CountdownList;