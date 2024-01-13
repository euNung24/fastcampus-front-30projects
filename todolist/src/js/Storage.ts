export default class Storage<T> {
  key: string;
  defaultData: T;
  constructor(key: string, defaultData: T) {
    this.key = key;
    this.defaultData = defaultData;
  }

  setData<T>(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  getData(): T {
    return localStorage.getItem(this.key)
      ? JSON.parse(localStorage.getItem(this.key))
      : this.defaultData;
  }
}
