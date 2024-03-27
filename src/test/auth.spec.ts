import { expect } from "@playwright/test";
import { fixtures as test } from "./fixtures/api-fixture";
import { AUTH_REQUEST_JSON_BODY } from "./constants/api-request-constant";

test.describe("Authentication Test Suite", () => {
  test("[POST] Request new authentication token", async ({
    authApiFixture,
  }) => {
    const response = await authApiFixture.post('', AUTH_REQUEST_JSON_BODY);
    expect(response.status()).toBe(200);
    expect((await response.json()).token).not.toBeNull();
  });
});
