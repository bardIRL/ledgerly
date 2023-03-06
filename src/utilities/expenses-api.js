import sendRequest from "./send-request";
const BASE_URL = "/api/expenses";

export async function createExpense(expenseFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", expenseFormData);
}