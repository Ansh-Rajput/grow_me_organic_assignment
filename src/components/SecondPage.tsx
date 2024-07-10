import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import DepartmentList from "./DepartmentList";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate(
        "/?message=Please enter your details before accessing the second page."
      );
    }
  }, [navigate]);

  return (
    <div>
      <DataTable />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
