import { expect } from "@playwright/test";
import { fixtures as test } from "../fixtures/api-fixture";

test.describe("GitHub Test Suite", () => {
  test("[GET] Retrieve list of repositories", async ({ apiFixture }) => {
    const response = await apiFixture.get(
      "https://api.github.com/users/osandadeshan"
    );
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.login).toBe("osandadeshan");
    expect(responseBody.html_url).toBe("https://github.com/osandadeshan");
    expect(responseBody.name).toBe("Osanda Deshan Nimalarathna");
    expect(responseBody.public_repos).toBeGreaterThan(140);
    expect(responseBody.public_gists).toBeGreaterThan(200);
  });
});
