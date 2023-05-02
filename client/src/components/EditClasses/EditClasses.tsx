import React from 'react'
import { Component, useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, where, getFirestore } from "firebase/firestore/lite";
import BasicRTable from '../Register/BasicRTable';
import { getCurSemester } from "../../utils";

type EditClassesProps = {
  user: User
}


const EditClasses = ({user}: EditClassesProps) => {

  const [curSem, setSem] = useState("fall");
  useEffect(() => {
    const fetchSemester = async () => {
      const curSemester = await getCurSemester();
      setSem(curSemester);
    };
    fetchSemester();
  }, []);

  const [teachingClasses, setTeachingClasses] = useState<any[]>([]);
  useEffect(() => {
    const fetchTeachingClasses = async () => {
      if (user) {
        var ret = [] as any[]
        const userRef = doc(getFirestore(), "users", user.uid)
        const q = query(collection(getFirestore(), curSem), where("instructor", "==", userRef))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          ret.push(doc.data())
        });
        setTeachingClasses(ret)
      }
    };
    fetchTeachingClasses();
  }, []);
  console.log(teachingClasses)

  return (
    <div>
      <div className="register_container">
        <h1>Edit your classes</h1>
      </div>
      <BasicRTable saved={teachingClasses}/>
      <div className="register_container">
        <div className="register-container-button">
          <button>Delete class</button>
        </div>
      </div>
    </div>
  )
}

export default EditClasses

