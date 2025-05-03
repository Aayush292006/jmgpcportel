import { useState } from "react";

export const useSeatingPlan = () => {
  const [selectedBranchData, setSelectedBranchData] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [blueprintData, setBlueprintData] = useState([]);

  return {
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
  };
};
