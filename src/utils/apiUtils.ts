// src/utils/apiUtils.ts
export const apiCall = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call error:', error);
      throw error; // Re-throw the error so it can be handled by the calling function
    }
  };
  