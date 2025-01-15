export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IKhaos {
  setBody(body: any): IKhaos;
  setEndpoint(endpoint: string): IKhaos;
  setHttpMethod(method: HttpMethod): IKhaos;
  invoke<KhaosModel>(): Promise<KhaosResponse<KhaosModel>>;
};

export interface KhaosError {
  message: string;
  details: string;
};

export interface KhaosResponse<KhaosModel> {
  data?: KhaosModel;
  error?: KhaosError;
};