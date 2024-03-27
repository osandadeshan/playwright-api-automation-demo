import config from "../../../playwright.config";
import path from "path";

export function loadJsonFile(filename: string): any {
  return require(path.resolve(config.testDataDir, filename));
}

export const AUTH_REQUEST_JSON_BODY = loadJsonFile("auth-request.json");
export const CREATE_BOOKING_REQUEST_JSON_BODY = loadJsonFile(
  "create-booking-request.json"
);
export const UPDATE_BOOKING_REQUEST_JSON_BODY = loadJsonFile(
  "update-booking-request.json"
);
