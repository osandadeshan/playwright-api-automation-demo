import { expect } from "@playwright/test";
import { fixtures as test } from "./fixtures/api-fixture";
import {
  AUTH_REQUEST_JSON_BODY,
  CREATE_BOOKING_REQUEST_JSON_BODY,
  UPDATE_BOOKING_REQUEST_JSON_BODY,
} from "../test/constants/api-request-constant";

test.describe("Booking Test Suite", () => {
  let token: string;
  let bookingId: string;

  test.beforeAll(async ({ authApiFixture, commonApiFixture }) => {
    const authResponse = await authApiFixture.post('', AUTH_REQUEST_JSON_BODY);
    expect(authResponse.status()).toBe(200);
    token = (await authResponse.json()).token;

    const createBookingResponse = await commonApiFixture.post(
      "/booking",
      CREATE_BOOKING_REQUEST_JSON_BODY,
      token
    );
    expect(createBookingResponse.status()).toBe(200);
    bookingId = (await createBookingResponse.json()).bookingid;
  });

  test("[GET] Retrieve list of bookings", async ({ commonApiFixture }) => {
    const response = await commonApiFixture.get("/booking", token);
    expect(await response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody[0]).toHaveProperty("bookingid");
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test("[PUT] Fully update an existing booking", async ({
    commonApiFixture,
}) => {
    const response = await commonApiFixture.put(
      `/booking/${bookingId}`,
      UPDATE_BOOKING_REQUEST_JSON_BODY,
      token
    );
    expect(response.status()).toBe(200);

    expect((await response.json()).firstname).toBe("Eranga");
  });

  test("[PATCH] Partially update an existing booking", async ({
    commonApiFixture,
  }) => {
    const response = await commonApiFixture.patch(
      `/booking/${bookingId}`,
      {
        firstname: "john",
        lastname: "smith",
      },
      token
    );
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("john");
    expect(responseBody.lastname).toBe("smith");
  });

  test("[DELETE] Delete an existing booking", async ({ commonApiFixture }) => {
    const response = await commonApiFixture.delete(
      `/booking/${bookingId}`,
      token
    );
    expect(response.status()).toBe(201);
  });
});
