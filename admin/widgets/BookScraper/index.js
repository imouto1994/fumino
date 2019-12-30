import React, { forwardRef, useState } from "react";
import { fromJS } from "immutable";

import styles from "./styles.css";

const ALLOWED_HOSTNAMES = [
  "ec.toranoana.jp",
  "melonbooks.co.jp",
  "www.melonbooks.co.jp",
  "order.mandarake.co.jp",
  "www.dmm.co.jp",
  "dmm.co.jp",
];

const BookScraper = forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [message, setMessage] = useState("");
  const url = value != null ? value.get("url") : "";
  const imageURLs = value != null ? value.get("imageURLs") : fromJS([]);

  const onInputChange = e => {
    const updateURL = e.target.value;
    let hostname;
    try {
      hostname = new URL(updateURL).hostname;
    } catch (error) {
      // Fail silently
      setMessage(`Failed to parse URL: ${updateURL}`);
      return;
    }

    if (!ALLOWED_HOSTNAMES.includes(hostname)) {
      setMessage(
        `URL hostname ${hostname} is not in the list of allowed hostnames`,
      );
      return;
    }

    setMessage("Scraping book data...");
    fetch(`/.netlify/functions/scrape?bookURL=${encodeURIComponent(updateURL)}`)
      .then(response => response.json())
      .then(body => {
        const { title, imageURLs, url, caption } = body;
        const img = new Image();
        setMessage("Scraping thumbnail data...");
        img.onload = function() {
          onChange(
            fromJS({
              title,
              imageURLs,
              url,
              caption,
              imageWidth: this.width,
              imageHeight: this.height,
            }),
          );
          setMessage("");
        };
        img.onerror = function() {
          setMessage("Failed to fetch book thumbnail");
        };
        img.src = imageURLs[0];
      })
      .catch(error => {
        setMessage("Failed to fetch book data");
      });
  };

  return (
    <>
      <input
        ref={ref}
        type="text"
        defaultValue={url}
        className={styles.input}
        onChange={onInputChange}
      />
      <img src={imageURLs.get(0)} className={styles.field} />
      <p>{message}</p>
    </>
  );
});

export default BookScraper;
