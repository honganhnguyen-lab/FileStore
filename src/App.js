
import './App.css';
import Dashboard from './pages/dashboard';

import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    
      <Switch>
       <Route exact path="/" component={Dashboard}/>
       <Route exact path="/folder/:folderId" component={Dashboard}/>
       <Route exact path="/starred" />
       <Route exact path = "/share" />
       <Route exact path = "/delete" />


     </Switch>
    </div>
  );
}

export default App;
