export default class parseType {
  constructor(type) {
    this.type = type;
    if (!this.type) throw new Error("Action Type is required");
    this.split = type.split("/");
  }

  getModel() {
    return this.split[0] ? this.split[0] : "";
  }

  getEffects() {
    return this.split[1] ? this.split[1] : "";
  }
}
