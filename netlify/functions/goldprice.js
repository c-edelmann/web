exports.handler = async function(event, context) {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/XAU');
    const data = await res.json();
    
    if (!data.rates || !data.rates.EUR) {
      throw new Error('No EUR rate found: ' + JSON.stringify(data));
    }
    
    const eurPerOz = data.rates.EUR;
    const gramsPerOz = 31.1035;
    const eurPerGram = eurPerOz / gramsPerOz;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        price: eurPerGram,
        eurPerOz: eurPerOz,
        source: 'exchangerate-api'
      })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ error: e.message })
    };
  }
};
