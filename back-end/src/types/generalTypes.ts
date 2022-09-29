
export interface IAppError {
  type: TAppErrorTypes;
  message: string;
}

export type TAppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema";