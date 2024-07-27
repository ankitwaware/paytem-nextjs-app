export default function AddMoney() {
  return (
    <div className="bg-transparent">
      <h3 className="text-2xl">Add Money</h3>

      <div className="flex">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Amount"
          className="rounded-md border-2 border-slate-300 p-2"
        />
      </div>

      <div className="flex">
        <label htmlFor="bank">Bank</label>

        <select id="bank" className="rounded-md border-2 border-slate-300 p-2 uppercase">
          <option value={"hdfc"}>HDFC</option>
          <option value={"axis"}>axis</option>
          <option value={"kotak"}>kotak</option>
        </select>
      </div>
    </div>
  );
}
