import sendRequest from "./send-request";
const BASE_URL = "/api/incomes";

export async function createIncome(incomeFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", incomeFormData);
}

export async function getIncomes() {
  return await sendRequest(`${BASE_URL}`, "GET");
}
