import fetch from "node-fetch";

export async function handler(event) {

  // Access to XMLHttpRequest at 'https://peaceful-tanuki-e80ae4.netlify.app/.netlify/functions/huggingface' from origin 'https://akyyev.github.io' 
  // has been blocked by CORS policy: Request header field access-control-allow-origin is not allowed by Access-Control-Allow-Headers in preflight response.
    if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: "",
    };
  }

  try {
    const HF_TOKEN = process.env.HF_TOKEN;

    const body = JSON.parse(event.body);

    const API_URL = "https://router.huggingface.co/v1/chat/completions";

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const result = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: JSON.stringify(result)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: JSON.stringify({ error: err.message })
    };
  }
}



// export async function handler(event, context) {
//   const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
//   const HF_API_TOKEN = process.env.HF_TOKEN;

//   if (!HF_API_TOKEN) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Missing Hugging Face API token" }),
//     };
//   }

//   let inputText = "Hello world";
//   if (event.httpMethod === "POST") {
//     try {
//       const data = JSON.parse(event.body);
//       if (data && data.text) inputText = data.text;
//     } catch (e) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: "Invalid JSON body" }),
//       };
//     }
//   } else if (event.queryStringParameters && event.queryStringParameters.text) {
//     inputText = event.queryStringParameters.text;
//   }

//   try {
//     const response = await fetch(HF_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${HF_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: inputText }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return {
//         statusCode: response.status,
//         body: JSON.stringify({ error: errorText }),
//       };
//     }

//     const result = await response.json();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// }


// export async function handler() {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Function works!" }),
//   };
// }