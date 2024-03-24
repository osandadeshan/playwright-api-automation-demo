import { APIRequestContext } from "playwright-core";

export default class APIClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string, token?: string) {
    return this.invokeAPI(endpoint, "get", undefined, token);
  }

  async post(endpoint: string, requestBody: object, token?: string) {
    return this.invokeAPI(endpoint, "post", requestBody, token);
  }

  async put(endpoint: string, requestBody: object, token?: string) {
    return this.invokeAPI(endpoint, "put", requestBody, token);
  }

  async patch(endpoint: string, requestBody: object, token?: string) {
    return this.invokeAPI(endpoint, "patch", requestBody, token);
  }

  async delete(endpoint: string, token?: string) {
    return this.invokeAPI(endpoint, "delete", undefined, token);
  }

  private async invokeAPI(
    endpoint: string,
    method: string,
    requestBody?: object,
    token?: string
  ) {
    const headers: Record<string, string> = token
      ? { Cookie: `token=${token}` }
      : {};

    const requestOptions = {
      headers,
      data: requestBody,
    };

    const response = await this.request[method](endpoint, requestOptions);
    console.log(`Response: [${method.toUpperCase()}] ${response.url()}`);

    const contentType = response.headers()["content-type"];

    if (contentType && contentType.includes("application/json")) {
      console.log(await response.json());
    } else {
      console.log(await response.text());
    }

    return response;
  }
}
