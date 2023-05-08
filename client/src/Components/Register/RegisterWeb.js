import LogLoginWeb from "./LogLoginWeb";
import LogJoinWeb from "./LogJoinWeb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinNormalWeb from "./JoinNormalWeb";
import JoinManageWeb from "./JoinManageWeb";

function RegisterWeb() {
  return (
      
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<LogLoginWeb/>}></Route>
              <Route path={"/LogJoinWeb"} element={<LogJoinWeb/>}></Route>
              <Route path={"/JoinNormalWeb"} element={<JoinNormalWeb/>}></Route>
              <Route path={"/JoinManageWeb"} element={<JoinManageWeb/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}
export default RegisterWeb;