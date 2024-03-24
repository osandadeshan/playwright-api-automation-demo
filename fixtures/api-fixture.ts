import { test as base } from "@playwright/test";
import APIClient from "../utils/api-client";

type MyFixtures = {
  apiFixture: APIClient;
};

const fixtures = base.extend<MyFixtures>({
  apiFixture: async ({ request }, use) => {
    const API = new APIClient(request);
    await use(API);
  },
});

export { fixtures };
