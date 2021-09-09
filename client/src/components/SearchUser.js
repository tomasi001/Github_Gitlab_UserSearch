// import requirements
import React, { useRef, useState } from "react";

// create function to handle values from a form
// and to update the state of the variables storing those values
export const useForm = (initialValues) => {
  // set initial state of variables to the values it receives when function called
  const [values, setValues] = useState(initialValues);
  // return the values and a function that references the name field of a form
  // to set the state of the value field of that form
  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};

// create function to display and handle a search form
const SearchUser = (props) => {
  // set initial state of variables
  const [values, handleChange] = useForm({ searchWord: "" });

  // create a reference variable
  const inputRef = useRef();

  // create function to set state of the searchWord in app.js
  // to the input reference from the form
  // and the searched boolean in app .js to true
  const sendData = () => {
    const currentUser = inputRef.current.value;
    props.wordCallBack(currentUser);
    props.searchedCallBack(!props.searchState);
    props.loadingCallBack(!props.loadState);
  };

  // create function to post data to api
  const postData = (url = "", data = {}) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response);
  };

  // create post handler function
  const postHandler = (e) => {
    e.preventDefault();
    const currentUser = { user: inputRef.current.value };

    // console.log(currentUser);
    postData("/postGitlabUser", currentUser)
      .then((data) => console.log(JSON.stringify(data)))
      .catch((error) => console.log(error));

    postData("/postGithubUser", currentUser)
      .then((data) => console.log(JSON.stringify(data)))
      .catch((error) => console.log(error));
  };

  const refreshPage = () => {
    // console.log("refreshed");
    props.searchedCallBack(!props.searchState);
    props.loadingCallBack(!props.loadState);
    window.location.reload();
  };

  // return the form with all related information as children
  // return button to fire send data after user has clicked search
  return (
    <div>
      <h1 className="searchHeader">Github/Gitlab User Search</h1>
      <div className="searchField">
        <button
          style={
            props.searchState ? { display: "inline" } : { display: "none" }
          }
          onClick={refreshPage}
        >
          Search Another User
        </button>
      </div>
      <div>
        {props.searchState ? (
          <h2 className="userSearched">USER SEARCHED: {props.userSearch}</h2>
        ) : (
          <div></div>
        )}
      </div>
      <div className="searchField">
        <form onSubmit={postHandler}>
          <input
            type={props.searchState ? "hidden" : ""}
            ref={inputRef}
            name="searchWord"
            value={values.searchWord}
            onChange={handleChange}
            placeholder="Username"
          />
          <button
            style={
              props.searchState ? { display: "none" } : { display: "inline" }
            }
            onClick={sendData}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

// export default element
export default SearchUser;
