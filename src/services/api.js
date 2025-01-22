const API_BASE_URL = "https://watchesapi.onrender.com/watches";

export const fetchWatches = async () => {
  try {
    // Log the exact URL we're trying to fetch
    const url = await `${API_BASE_URL}`;
    console.log(url);

    // Basic fetch with error handling
    const response = await fetch(url);
    console.log(response)
    // Log the response status
    console.log("Response received:", {
      status: response.status,
      statusText: response.statusText,
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error("Failed to fetch watches");
    }
    const data = await response.json();
    console.log("Fetched watches:", data);
    return data;
  } catch (error) {
    console.error("Error fetching watches:", error);
    throw error;
  }
};

export const getWatchById = async (_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${_id}`);
    if (!response.ok) {
      throw new Error("Watch not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watch details:", error);
    throw error;
  }
};
