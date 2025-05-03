import React, { createContext, useState, useContext } from "react";

const SeatingPlanContext = createContext();

export const useSeatingPlan = () => {
  return useContext(SeatingPlanContext);
};

export const SeatingPlanProvider = ({ children }) => {
  const [selectedBranchData, setSelectedBranchData] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [blueprintData, setBlueprintData] = useState([]);

  return (
    <SeatingPlanContext.Provider
      value={{
        selectedBranchData,
        setSelectedBranchData,
        availableBranches,
        setAvailableBranches,
        availableSemesters,
        setAvailableSemesters,
        availableYears,
        setAvailableYears,
        rooms,
        setRooms,
        blueprintData,
        setBlueprintData,
      }}
    >
      {children}
    </SeatingPlanContext.Provider>
  );
};
