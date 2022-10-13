import React from "react";
import SearchInput from "./components/Dropdown";
import {Route,Switch} from "react-router-dom"
import Details from "./pages/Details";
import SearchBar from "./pages/SearchBar";

const App = () => {
  return (
    <>
		  <Switch>
        <Route path="/about">
          <Details />
        </Route>

        <Route path="/">
          <SearchBar />
        </Route>

        {/* <Route path="/search">
          <Search />
        </Route>       */}

      </Switch>
    </>
  )
}

export default App