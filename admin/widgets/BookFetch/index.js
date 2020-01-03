import React, { forwardRef, useState } from "react";
import { fromJS } from "immutable";
import { motion } from "framer-motion";

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

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

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
    } else {
      setSelectedIndex(null);
    }
  };

  const onDeleteButtonClick = index => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setSelectedIndex(null);
    onChange(fromJS(updatedBooks));
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

    if (
      books
        .map(({ book }) => book.url)
        .filter(url => url.includes(updateURL) || updateURL.includes(url))
        .length > 0
    ) {
      setMessage("Book already existed");
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
            <motion.div
              key={book.url}
              className={styles.item}
              layoutTransition={spring}
            >
              <div
                className={styles.imageImageWrapper}
                onClick={() => onImageClick(index)}
                style={{
                  paddingTop: `${(book.imageHeight / book.imageWidth) * 100}%`,
                }}
              >
                {index === selectedIndex ? (
                  <div className={styles.itemOverlay} />
                ) : null}
                <img src={book.imageURLs[0]} className={styles.itemImage} />
                {index === selectedIndex ? (
                  <button
                    className={styles.itemDeleteButton}
                    disabled={selectedIndex !== index}
                    onClick={() => onDeleteButtonClick(index)}
                  >
                    D
                  </button>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
});

export default BookFetch;
