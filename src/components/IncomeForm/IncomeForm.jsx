import React, { useState, useEffect } from "react";
import * as incomesAPI from "../../utilities/incomes-api";

export default function IncomeForm({
  addIncome,
  selectedIncome,
  setSelectedIncome,
  setShowModal,
}) {
  const [incomeFormData, setIncomeFormData] = useState(() => {
    if (selectedIncome) {
      return {
        description: selectedIncome.description,
        amount: selectedIncome.amount,
        category: selectedIncome.category,
        date: selectedIncome.category,
        account: selectedIncome.account,
        notes: selectedIncome.notes,
      };
    } else {
      return {
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      };
    }
  });

  useEffect(() => {
    if (selectedIncome) {
      setIncomeFormData(selectedIncome);
    }
  }, [selectedIncome]);

  async function handleChange(event) {
    setIncomeFormData({
      ...incomeFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUpdate(incomeFormData) {
    try {
      const updatedIncome = await incomesAPI.updateIncome(
        selectedIncome._id,
        incomeFormData
      );
      console.log("Income updated:", updatedIncome);
      addIncome(updatedIncome);
      setIncomeFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      });
      setShowModal(false);
      setSelectedIncome(null);
    } catch (err) {
      console.error("Error updating income:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedIncome) {
      handleUpdate(incomeFormData);
    } else {
      try {
        const income = await incomesAPI.createIncome(incomeFormData);
        console.log("Income saved:", income);
        addIncome(income);
        setIncomeFormData({
          description: "",
          amount: "",
          category: "",
          date: "",
          account: "",
          notes: "",
        });
        setShowModal(false);
        setSelectedIncome(null);
      } catch (err) {
        console.error("Error saving income:", err);
      }
    }
  }

  return (
    <>
      <h3>{selectedIncome ? "Edit Income" : "Add Income"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={incomeFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={incomeFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={incomeFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a Category
          </option>
          {["Sales", "Uncategorized Income"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={incomeFormData.date}
          onChange={handleChange}
          required
        />
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={incomeFormData.account}
          onChange={handleChange}
        >
          <option value="">Select an account</option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={incomeFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
