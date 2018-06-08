# finviz
Stock quotes and company data from Finviz

## Install
```
$ npm install finviz --save
```

## Usage
```javascript
var finviz = require('finviz');

finviz.getStockData("MSFT")
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err.stack ? err.stack : err));

/*
{
  "Index": "DJIA S&P500",
  "P/E": "28.01",
  "EPS (ttm)": "3.60",
  "Insider Own": "0.10%",
  "Shs Outstand": "7.70B",
  "Perf Week": "2.06%",
  "Market Cap": "776.57B",
  "Forward P/E": "25.12",
  "EPS next Y": "4.64%",
  "Insider Trans": "-0.06%",
  "Shs Float": "7.58B",
  "Perf Month": "5.29%",
  "Income": "28.01B",
  "PEG": "2.28",
  "EPS next Q": "1.08",
  "Inst Own": "74.70%",
  "Short Float": "0.64%",
  "Perf Quarter": "6.83%",
  "Sales": "103.59B",
  "P/S": "7.50",
  "EPS this Y": "29.10%",
  "Inst Trans": "-0.75%",
  "Short Ratio": "1.62",
  "Perf Half Y": "23.64%",
  "Book/sh": "10.29",
  "P/B": "9.80",
  "ROA": "5.70%",
  "Target Price": "110.85",
  "Perf Year": "39.36%",
  "Cash/sh": "17.18",
  "P/C": "5.87",
  "EPS next 5Y": "12.28%",
  "ROE": "17.00%",
  "52W Range": "68.02 - 102.60",
  "Perf YTD": "17.93%",
  "Dividend": "1.68",
  "P/FCF": "28.87",
  "EPS past 5Y": "6.30%",
  "ROI": "11.70%",
  "52W High": "-1.68%",
  "Beta": "1.04",
  "Dividend %": "1.67%",
  "Quick Ratio": "3.40",
  "Sales past 5Y": "4.10%",
  "Gross Margin": "64.20%",
  "52W Low": "48.31%",
  "ATR": "1.56",
  "Employees": "124000",
  "Current Ratio": "3.40",
  "Sales Q/Q": "15.50%",
  "Oper. Margin": "28.90%",
  "RSI (14)": "62.83",
  "Volatility": "1.30% 1.40%",
  "Optionable": "Yes",
  "Debt/Eq": "0.97",
  "EPS Q/Q": "35.70%",
  "Profit Margin": "13.70%",
  "Rel Volume": "0.94",
  "Prev Close": "102.49",
  "Shortable": "Yes",
  "LT Debt/Eq": "0.93",
  "Earnings": "Apr 26 AMC",
  "Payout": "87.80%",
  "Avg Volume": "29.89M",
  "Price": "100.88",
  "Recom": "1.80",
  "SMA20": "2.37%",
  "SMA50": "5.78%",
  "SMA200": "16.02%",
  "Volume": "28,057,462",
  "Change": "-1.57%"
}

*/
```

## License
MIT license; see [LICENSE](./LICENSE).
