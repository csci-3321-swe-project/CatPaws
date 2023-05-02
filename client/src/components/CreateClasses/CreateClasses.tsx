import DropdownMenu from "./CreateClassMenu";
import "./CreateClassMenu.css";
import { useFormState } from "../../utils";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 

type CreateClassProps = {
  user: User;
};

const exampleForm = { class_id: "CSCI-1000", 
               credits: "3",
               name: "fake comp sci",
               location: "Classroom 1",
               subject: "Computer Science", 
               level: "upper", 
               time: ["9:00"], 
               pathway: "Digital Literacy", 
               term: "fall2022" 
              };
const CreateClasses = ( {user}: CreateClassProps ) => {
  const handleSubmitForm = async (form) => {
    window.console.log(form);
    //The form object will be sent to the backend, the backend should be able to handle the request and return a list of classes
    //This function will be used to send the post request to the backend to receive a list of classess object that will be passed into the tabular object of classes
    const userRef = doc(getFirestore(), "users", user.uid)
    await setDoc(doc(getFirestore(), form.term, form.class_id), {
      instructor: userRef,
      enrolled: [],
      ...form
    });
  };
  return (
    <div>
      <div className="register_container">
        <h1>Create a Class</h1>
      </div>
      <div className="dropdown-container">
        <div className="dropdown-container-button">
          <button onClick={() => handleSubmitForm(exampleForm)}>Create</button>
        </div>
      </div>
    </div>
  );
};
export default CreateClasses;
