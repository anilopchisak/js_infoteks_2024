import './ui/App.scss';
import {BrowserRouter} from "react-router-dom";
import TableUsersPage from "../pages/TableUsersPage/TableUsersPage";

const App = () => {
  return (
      <BrowserRouter>
        <div className={'body'}>
            <TableUsersPage/>
        </div>
      </BrowserRouter>
  );
}

export default App;
