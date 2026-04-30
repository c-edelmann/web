exports.handler = async function(event, context) {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/XAU');
    const text = await res.text();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ raw: text.substring(0, 500) })
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ error: e.message, stack: e.stack })
    };
  }
};
