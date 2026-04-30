exports.handler = async function(event, context) {
  try {
    const fxRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const fxData = await fxRes.json();
    const eurPerUsd = fxData.rates.EUR;

    const goldRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF?interval=1m&range=1d');
    const goldData = await goldRes.json();
    const usdPerOz = goldData.chart.result[0].meta.regularMarketPrice;

    const eurPerGram = (usdPerOz * eurPerUsd) / 31.1035;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ price: eurPerGram })
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ error: e.message })
    };
  }
};
