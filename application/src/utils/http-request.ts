// httpRequest.ts

import axios, { AxiosResponse } from 'axios';

/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url The URL to make the GET request to.
 * @param {string | null} token Optional authentication token (JWT token).
 * @returns {Promise<any>} A promise resolving to the response data.
 */
export async function getUserInfo(url: string, token: string | null): Promise<any> {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response: AxiosResponse<any> = await axios.get(url, { headers });
    return response.data;
  } catch (error:unknown | any) {
    throw new Error(`HTTP GET request to ${url} failed: ${error.message}`);
  }
}
