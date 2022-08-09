
import './App.css';
import Dashboard from './pages/dashboard';
import Starred from './pages/Starred';
import Trash from './pages/Trash';
import Login from './pages/Login';

import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    
      <Switch>
        <Route exact path="/" component={Login}/>
       <Route exact path="/dashboard" component={Dashboard}/>
       <Route exact path="/folder/:folderId" component={Dashboard}/>
       <Route exact path="/starred" component={Starred} />
       <Route exact path = "/share" />
       <Route exact path = "/delete" component={Trash}/>


     </Switch>
    </div>
  );
}

export default App;
