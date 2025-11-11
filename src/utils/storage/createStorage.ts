interface StorageEngine {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
}

const createStorage = (engine: StorageEngine) => {
  const set = async <T>(key: string, data: T) => {
    try {
      await engine.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn(`[Storage][set] key=${key}`, error);
    }
  };

  const get = async <T>(key: string): Promise<T | null> => {
    try {
      const storedData = await engine.getItem(key);
      return storedData ? (JSON.parse(storedData) as T) : null;
    } catch (error) {
      console.warn(`[Storage][get] key=${key}`, error);
      return null;
    }
  };

  const remove = async (key: string) => {
    try {
      await engine.removeItem(key);
    } catch (error) {
      console.warn(`[Storage][remove] key=${key}`, error);
    }
  };

  return {set, get, remove};
};

export default createStorage;
