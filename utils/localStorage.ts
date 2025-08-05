// Local storage utilities for managing data without backend

export const STORAGE_KEYS = {
  TASKS: "zenflow_tasks",
  NOTES: "zenflow_notes",
  SCHEDULES: "zenflow_schedules",
};

// Generic storage functions
export const getFromStorage = (key, defaultValue = []) => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, data) => {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage for key ${key}:`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage for key ${key}:`, error);
    return false;
  }
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get user-specific storage key
export const getUserStorageKey = (baseKey, userId) => {
  return userId ? `${baseKey}_${userId}` : baseKey;
};
