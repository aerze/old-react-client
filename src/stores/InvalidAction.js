export default class InvalidActionError extends Error {
  constructor() {
    super("INVALID_ACTION");
    this.message = "Reducer received an action with an invalid type";
  }
}
