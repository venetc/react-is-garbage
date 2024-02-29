export class LocalStorage {
  static set = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static get = <T>(key: string) => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) as T : null;
  };
}