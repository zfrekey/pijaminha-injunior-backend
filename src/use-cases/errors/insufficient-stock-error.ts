export class InsufficientStockError extends Error {
    constructor() {
      super("Insufficient stock for one or more pajamas.");
      this.name = "InsufficientStockError";
    }
  }