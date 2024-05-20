import { APIRequestContext } from "playwright-core";

export default class APIClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string, token?: string) {
    return this.invokeAPI("get", endpoint, undefined, token);
  }

  async post(endpoint: string, requestBody?: object, token?: string) {
    return this.invokeAPI("post", endpoint, requestBody, token);
  }

  async put(endpoint: string, requestBody?: object, token?: string) {
    return this.invokeAPI("put", endpoint, requestBody, token);
  }

  async patch(endpoint: string, requestBody?: object, token?: string) {
    return this.invokeAPI("patch", endpoint, requestBody, token);
  }

  async delete(endpoint: string, token?: string) {
    return this.invokeAPI("delete", endpoint, undefined, token);
  }

  private async invokeAPI(
    method: string,
    endpoint: string,
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

    const requestUrl = endpoint ? this.baseUrl.concat(endpoint) : this.baseUrl;

    const response = await this.request[method](requestUrl, requestOptions);

    console.log(`Response: [${method.toUpperCase()}] ${response.url()}`);

    const contentType = response.headers()["content-type"];

    if (contentType && contentType.includes("application/json")) {
      console.log(JSON.stringify(await response.json(), null, 2));
    } else {
      console.log(await response.text());
    }

    return response;
  }
}
