import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "../Dashboard/DashboardHome";
import DashNav from '../HeadersFooters/DashNav';
import VerificationStatus from '../Auth/VerificationStatus';
import Certificate from "../../components/Dashboard/Certificates/Certificate";
import Approve from "../../components/Dashboard/Certificates/Approve";
import Issue from "../../components/Dashboard/Certificates/Issue";
import Suspend from "../../components/Dashboard/Certificates/Suspend";
const DashboardMain = () => {
    const [margin, setMargin] = useState(false);
    const [verified,setVerified]=useState(false);
  return (
    <div>
        <DashNav setMargin={setMargin} />
        <VerificationStatus setVerified={setVerified} margin={margin} />
      <Routes>
        <Route path="/" element={<DashboardHome margin={margin} verified={verified}/>} />
        <Route path="certificates/" element={<Certificate margin={margin} verified={verified}/>} />
        <Route path="certificates/all" element={<Certificate margin={margin} verified={verified}/>} />
        <Route path="certificates/approve" element={<Approve margin={margin} verified={verified}/>} />
        <Route path="certificates/issue" element={<Issue margin={margin} verified={verified}/>} />
        <Route path="certificates/suspend" element={<Suspend margin={margin} verified={verified}/>} />
      </Routes>
    </div>
  );
};

export default DashboardMain;