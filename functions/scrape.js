const got = require("got");

exports.handler = async (event, context) => {
  const { httpMethod, queryStringParameters } = event;

  // Only allow GET
  if (httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Missing required query `url`
  const { url } = queryStringParameters;
  if (url == null) {
    return { statusCode: 400, body: "Missing query `url`" };
  }

  try {
    const response = await got("https://sindresorhus.com");
    return {
      statusCode: 200,
      body: response.body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.response.body,
    };
  }
};
