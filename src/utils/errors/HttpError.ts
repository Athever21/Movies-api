export class HttpError extends Error {
  public code: number;
  public errors: string[];

  constructor(code: number, message: string | string[]) {
    super(typeof message === "string" ? message : "");
    if (typeof message !== "string") {
      this.errors = message;
    }
    this.code = code;
    this.name = "HttpError";
  }
}
