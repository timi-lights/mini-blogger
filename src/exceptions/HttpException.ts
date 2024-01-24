export class HttpException extends Error {
  public code: number;
  public errors: {};
  public message: string;

  constructor(code: number, message: string, errors: {}) {
    super(message);
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}
