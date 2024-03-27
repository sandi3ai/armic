export const mergeSetIdsWithData = (setIds, filteredData) => {
  // Convert the Set of selected IDs into an Array for easier processing
  const selectedIdsArray = Array.from(setIds);

  // Filter the filteredData to only include those entries whose casID is in the selectedIdsArray
  let mergedData = filteredData.filter((data) =>
    selectedIdsArray.includes(data.casID)
  );

  return mergedData;
};
