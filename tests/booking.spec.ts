import { expect } from "@playwright/test";
import { fixtures as test } from "../fixtures/api-fixture";

test.describe("Booking Test Suite", () => {
  let token: string;
  let bookingId: string;

  test.beforeAll(async ({ apiFixture }) => {
    const response = await apiFixture.post("/auth", {
      username: "admin",
      password: "password123",
    });
    expect(response.status()).toBe(200);

    token = (await response.json()).token;
  });

  test("[GET] Retrieve list of bookings", async ({ apiFixture }) => {
    const response = await apiFixture.get("/booking", token);
    expect(await response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody[0]).toHaveProperty("bookingid");
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test.describe("Modify Booking Test Suite", () => {
    test.beforeAll(async ({ apiFixture }) => {
      const response = await apiFixture.post("/booking", {
        firstname: "Osanda",
        lastname: "Nimalarathna",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: "2023-10-17",
          checkout: "2023-10-30",
        },
        additionalneeds: "launch",
      });
      expect(response.status()).toBe(200);

      bookingId = (await response.json()).bookingid;
    });

    test("[PUT] Update an existing booking", async ({ apiFixture }) => {
      const response = await apiFixture.put(
        `/booking/${bookingId}`,
        {
          firstname: "Eranga",
          lastname: "Nimalarathna",
          totalprice: 100,
          depositpaid: true,
          bookingdates: {
            checkin: "2023-10-17",
            checkout: "2023-10-30",
          },
          additionalneeds: "launch",
        },
        token
      );
      expect(response.status()).toBe(200);

      expect((await response.json()).firstname).toBe("Eranga");
    });

    test("[PATCH] Partially update an existing booking", async ({
      apiFixture,
    }) => {
      const response = await apiFixture.patch(
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

    test("[DELETE] Delete an existing booking", async ({ apiFixture }) => {
      const response = await apiFixture.delete(`/booking/${bookingId}`, token);
      expect(response.status()).toBe(201);
    });
  });
});
