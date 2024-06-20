import { paths } from "./openapi-schema.js";
import { Fetcher } from "openapi-typescript-fetch";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: "https://mhapffvggkbqlfbhfxsy.supabase.co/rest/v1",
});

export const getLogs = async () => {
  try {
    const response = await fetcher.path("/log").method("get").create()();
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

export const createLog = async (log) => {
  try {
    const response = await fetcher.path("/log").method("post").create()({
      body: log,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
};

export const updateLog = async (id, log) => {
  try {
    const response = await fetcher.path("/log").method("patch").create()({
      query: { id },
      body: log,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating log:", error);
    throw error;
  }
};

export const deleteLog = async (id) => {
  try {
    await fetcher.path("/log").method("delete").create()({
      query: { id },
    });
  } catch (error) {
    console.error("Error deleting log:", error);
    throw error;
  }
};