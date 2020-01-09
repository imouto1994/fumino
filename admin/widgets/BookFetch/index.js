import React, { forwardRef, useState } from "react";
import { fromJS } from "immutable";
import { motion } from "framer-motion";

import styles from "./styles.css";

const ALLOWED_HOSTNAMES = [
  "dmm.co.jp",
  "ec.toranoana.jp",
  "ec.toranoana.shop",
  "melonbooks.co.jp",
  "order.mandarake.co.jp",
  "www.amazon.co.jp",
  "www.dmm.co.jp",
  "www.melonbooks.co.jp",
];

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const BookFetch = forwardRef((props, ref) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { value, onChange } = props;
  const books = value.toJS();
  const { wanted } = books;

  const onImageClick = (e, index) => {
    if (selectedIndices.length === 0) {
      setSelectedIndices([index]);
    } else if (e.metaKey || e.ctrlKey) {
      if (selectedIndices.includes(index)) {
        setSelectedIndices(selectedIndices.filter(i => i !== index));
      } else {
        setSelectedIndices([...selectedIndices, index].sort((a, b) => a - b));
      }
    } else {
      if (selectedIndices.includes(index)) {
        setSelectedIndices([]);
      } else {
        const indexBook = wanted[index];
        const selectedBooks = wanted.filter((book, i) =>
          selectedIndices.includes(i),
        );
        const preSelectedBooks = wanted.filter(
          (book, i) => i < index && !selectedIndices.includes(i),
        );
        const postSelectedBooks = wanted.filter(
          (book, i) => i > index && !selectedIndices.includes(i),
        );
        const updatedBooks = [
          ...preSelectedBooks,
          ...selectedBooks,
          indexBook,
          ...postSelectedBooks,
        ];
        setSelectedIndices([]);
        onChange(fromJS({ ...books, wanted: updatedBooks }));
      }
    }
  };

  const onDeleteButtonClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedBooks = [...wanted];
    updatedBooks.splice(index, 1);
    setSelectedIndices(
      selectedIndices
        .map(i => {
          if (i < index) {
            return i;
          } else if (i === index) {
            return null;
          } else {
            return i - 1;
          }
        })
        .filter(i => i != null),
    );
    onChange(fromJS({ ...books, wanted: updatedBooks }));
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
      wanted
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
            fromJS({
              ...books,
              wanted: [
                ...wanted,
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
              ],
            }),
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
        {wanted.map(({ book }, index) => {
          return (
            <motion.div
              key={book.url}
              className={styles.item}
              layoutTransition={spring}
            >
              <div
                className={styles.imageImageWrapper}
                onClick={e => onImageClick(e, index)}
                style={{
                  paddingTop: `${(book.imageHeight / book.imageWidth) * 100}%`,
                }}
              >
                {selectedIndices.includes(index) ? (
                  <div className={styles.itemOverlay} />
                ) : null}
                <img src={book.imageURLs[0]} className={styles.itemImage} />
                {selectedIndices.includes(index) ? (
                  <button
                    className={styles.itemDeleteButton}
                    onClick={e => onDeleteButtonClick(e, index)}
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
