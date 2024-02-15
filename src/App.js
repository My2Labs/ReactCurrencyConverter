// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";
export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [convertedCurrency, setConvertedCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getCurrencyConverter() {
        setIsLoading(true);
        // if (fromCur.trim() === "" || toCur.trim() === "") {
        //   // Skip the API request if any of the input values are empty
        //   return;
        // }
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        console.log(data);
        setConvertedCurrency(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setConvertedCurrency(amount);
      getCurrencyConverter();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <p>
        Entered currency:{" "}
        <Currency amount={amount} setAmount={setAmount} isLoading={isLoading} />
      </p>
      <p>
        From Currency:{" "}
        <FromCurrency
          fromCur={fromCur}
          setFromCur={setFromCur}
          isLoading={isLoading}
        />
      </p>
      <p>
        To Currency:{" "}
        <ToCurrency toCur={toCur} setToCur={setToCur} isLoading={isLoading} />
      </p>

      <p>
        Converted currency:{" "}
        {typeof convertedCurrency === "number"
          ? convertedCurrency.toFixed(2)
          : convertedCurrency}{" "}
        {toCur}
      </p>
    </div>
  );
}

function Currency({ amount, setAmount, isLoading }) {
  return (
    <input
      type="text"
      placeholder="Enter currency amount.."
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      //   disabled={isLoading}
    />
  );
}

function FromCurrency({ fromCur, setFromCur, isLoading }) {
  return (
    <select
      value={fromCur}
      onChange={(e) => setFromCur(e.target.value)}
      //   disabled={isLoading}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}

function ToCurrency({ toCur, setToCur, isLoading }) {
  return (
    <select
      value={toCur}
      onChange={(e) => setToCur(e.target.value)}
      //   disabled={isLoading}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}
