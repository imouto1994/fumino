const url = require("url");
const got = require("got");
const cheerio = require("cheerio");

const ALLOWED_HOSTNAMES = ["ec.toranoana.jp"];

function scrapeTora(htmlString) {
  const $ = cheerio.load(htmlString);
  const imageURL = $("#thumbs .item").data("src");
  const title = $(".product-info h1 span").text();
  const price = $(".pricearea__price--normal").text();

  return {
    imageURL,
    title,
    price,
  };
}

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
    let scrapedData = {};
    if (parsedBookURL.hostname === "ec.toranoana.jp") {
      scrapedData = scrapeTora(response.body);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: bookURL,
        ...scrapedData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Something wrong happened",
    };
  }
};
