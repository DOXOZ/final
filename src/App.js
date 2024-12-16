import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/button/index.jsx";
import Heading from "./components/heading/index.jsx";
import Input from "./components/input/index.jsx";
import Typography from "./components/typography/index.jsx";
import Tooltip from "./components/tooltip/index.jsx";
import Accordion from "./components/accordion/index.jsx";
import "./App.css";
function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Загрузка данных из API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      setCryptoData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Фильтрация данных по поиску
  const filteredData = cryptoData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Заменено Header на Heading */}
      <Heading level={1} className="my-header--main">
        Cryptocurrency Prices
      </Heading>

      <Button
        onClick={fetchData}
        variant="bordered"
        size="lg"
        disabled={loading}
      >
        {loading ? "Loading..." : "Update"}
      </Button>

      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label=""
      />

      {filteredData.map((crypto) => (
        <Accordion
          key={crypto.id}
          title={`${crypto.name} (${crypto.symbol})`}
          defaultOpen={false}
        >
          <Typography textSize="md">
            <strong>Symbol:</strong> {crypto.symbol}
          </Typography>
          <Typography textSize="md">
            <strong>Price USD:</strong> ${crypto.price_usd}
          </Typography>
          <Typography textSize="md">
            <strong>Price BTC:</strong> {crypto.price_btc}
          </Typography>
          <Tooltip
            text="The market capitalization of a cryptocurrency is calculated by multiplying the number of coins in circulation by the current price"
            position="top"
          >
            <Typography textSize="md">
              <strong>Market Cap USD:</strong> ${crypto.market_cap_usd}
            </Typography>
          </Tooltip>
          <Typography textSize="md" className="my-change">
            <strong>Percent Change 24H:</strong>{" "}
            <span
              className={`${
                crypto.percent_change_24h < 0 ? "text-danger" : "text-success"
              }`}
            >
              {crypto.percent_change_24h}%
            </span>
          </Typography>
        </Accordion>
      ))}
    </div>
  );
}

export default App;
