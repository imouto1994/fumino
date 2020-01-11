const got = require("got");
const FormData = require("form-data");

const RANDOM_CHAR_SET =
  "-_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getRandomString(numChars) {
  let randomString = "";
  for (let i = 0; i < numChars; i++) {
    const randomIndex = Math.floor(Math.random() * RANDOM_CHAR_SET.length);
    const randomChar = RANDOM_CHAR_SET.charAt(randomIndex);
    randomString += randomChar;
  }
  return randomString;
}

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;

  // Only allow GET
  if (httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { imageURL } = JSON.parse(body);
    if (imageURL == null) {
      return { statusCode: 400, body: "Missing query `bookURL`" };
    }

    // Fetch image
    const imageResponse = await got(imageURL, {
      responseType: "buffer",
    });

    // Upload to Imgur
    const imageID = getRandomString(5);
    const form = new FormData();
    form.append("image", imageResponse.body.toString("base64"));
    form.append("type", "base64");
    form.append("name", `${imageID}.jpg`);
    form.append("title", imageID);
    const uploadResponse = await got.post("https://api.imgur.com/3/upload", {
      headers: {
        Authorization: "Client-ID 5f07edda1c6d42f",
      },
      body: form,
      responseType: "json",
    });

    return {
      statusCode: 200,
      body: JSON.stringify(uploadResponse.body),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "Something wrong happened",
    };
  }
};
