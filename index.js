const got = require("got");
const cheerio = require("cheerio");

(async () => {
  const response = await got(
    "https://www.amazon.co.jp/gp/product/black-curtain-redirect.html/000-0000000-0000000?redirectUrl=%2Fgp%2Fproduct%2F4065173124",
  );
  const htmlString = response.body;
  const $ = cheerio.load(htmlString);
  const scriptContent = $("#imageBlockOuter")
    .next()
    .html();
  const match = scriptContent.match(/\[\{"mainUrl":(.*)\]/);
  if (match != null) {
    const imagesJSON = JSON.parse(match[0]);
    const imageURLs = imagesJSON.map(image => image.mainUrl);
    console.log(imageURLs);
  }

  console.log(
    $("#bylineInfo")
      .eq(0)
      .html(),
  );
})();
