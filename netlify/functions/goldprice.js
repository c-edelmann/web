exports.handler = async function(event, context) {
  try {
    const [metalRes, fxRes] = await Promise.all([
      fetch('https://gold-api.com/price/XAU'),
      fetch('https://open.er-api.com/v6/latest/USD')
    ]);
    const metalData = await metalRes.json();
    const fxData = await fxRes.json();
    const usdPerOz = metalData.price;
    const eurPerUsd = fxData.rates.EUR;
    const eurPerGram = (usdPerOz * eurPerUsd) / 31.1035;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ price: eurPerGram })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
