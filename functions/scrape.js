const url = require("url");
const got = require("got");
const cheerio = require("cheerio");

const ALLOWED_HOSTNAMES = ["ec.toranoana.jp"];

exports.handler = async (event, context) => {
  const { httpMethod, queryStringParameters } = event;

  // Only allow GET
  if (httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Missing required query `url`
  const { bookURL } = queryStringParameters;
  if (bookURL == null) {
    return { statusCode: 400, body: "Missing query `bookURL`" };
  }

  try {
    const parsedBookURL = url.parse(bookURL);
    if (!ALLOWED_HOSTNAMES.includes(parsedBookURL.hostname)) {
      return { statusCode: 400, body: "Book URL is not supported" };
    }

    const response = await got(bookURL);
    const $ = cheerio.load(response);

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
