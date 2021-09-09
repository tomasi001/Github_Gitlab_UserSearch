// import requirements
import { useState } from "react";
import "./App.css";
import ConnectExpress from "./components/ConnectExpress";
import SearchUser from "./components/SearchUser";

function App() {
  // declare state for variables
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  // create call back functions to set word in
  const setWord = (word) => {
    setUserSearch(word);
  };

  // create call back functions to set search boolean in
  const setSearch = (search) => {
    setSearched(search);
  };

  // create call back functions to set load boolean in
  const setLoad = (loading) => {
    setLoading(loading);
  };

  // return respective elements to be rendered
  return (
    <div className="App">
      <SearchUser
        searchState={searched}
        loadState={loading}
        wordCallBack={setWord}
        searchedCallBack={setSearch}
        loadingCallBack={setLoad}
        userSearch={userSearch}
      />
      <br></br>
      <br></br>
      {loading ? <div></div> : <ConnectExpress name={userSearch} />}
    </div>
  );
}

// export default element
export default App;
