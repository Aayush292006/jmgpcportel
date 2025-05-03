const fetchBranchesAndSemesters = async (room) => {
  try {
    const response = await fetch(`/api/getBranchesAndSemesters?room=${room}`);
    // Check if the response is okay and content-type is JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check content-type to ensure it’s JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    setBranches(data.branches || []); // Default to empty array if undefined
    setSemesters(data.semesters || []); // Default to empty array if undefined
  } catch (error) {
    console.error("Error fetching data:", error);
    setBranches([]);
    setSemesters([]);
  }
};
