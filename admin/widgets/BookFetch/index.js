import React, { forwardRef, useState } from "react";
import { fromJS } from "immutable";

import styles from "./styles.css";

const ALLOWED_HOSTNAMES = [
  "ec.toranoana.jp",
  "ec.toranoana.shop",
  "melonbooks.co.jp",
  "www.melonbooks.co.jp",
  "order.mandarake.co.jp",
  "www.dmm.co.jp",
  "dmm.co.jp",
];

const BookFetch = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { value, onChange } = props;
  const books = value.toJS();

  const onImageClick = index => {
    if (selectedIndex == null) {
      setSelectedIndex(index);
    } else if (selectedIndex !== index) {
      const updatedBooks = [...books];
      if (selectedIndex < index) {
        updatedBooks.splice(index, 0, updatedBooks[selectedIndex]);
        updatedBooks.splice(selectedIndex, 1);
      } else {
        updatedBooks.splice(index, 0, updatedBooks[selectedIndex]);
        updatedBooks.splice(selectedIndex + 1, 1);
      }
      setSelectedIndex(null);
      onChange(fromJS(updatedBooks));
    }
  };

  const onInputChange = e => {
    setText(e.target.value);
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
        console.log(body);
        const { title, imageURLs, url, caption } = body;
        const img = new Image();
        setMessage("Scraping thumbnail data...");
        img.onload = function() {
          onChange(
            fromJS([
              ...books,
              {
                book: {
                  title,
                  imageURLs,
                  url,
                  caption,
                  imageWidth: this.width,
                  imageHeight: this.height,
                },
              },
            ]),
          );
          setMessage("");
          setText("");
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
        value={text}
        className={styles.input}
        onChange={onInputChange}
      />
      <p className={styles.statusText}>{message}</p>
      <div className={styles.container}>
        {books.map(({ book }, index) => {
          return (
            <div key={index} className={styles.item}>
              {index === selectedIndex ? (
                <div className={styles.overlay} />
              ) : null}
              <img
                onClick={() => onImageClick(index)}
                src={book.imageURLs[0]}
                className={styles.itemImage}
              />
            </div>
          );
        })}
      </div>
    </>
  );
});

export default BookFetch;
