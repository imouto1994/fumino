import React, { forwardRef, useState } from "react";
import { fromJS } from "immutable";
import { motion } from "framer-motion";
import ContentEditable from "react-contenteditable";

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
const ALLOWED_IMAGE_HOST_NAMES = [
  "ecdnimg.toranoana.jp",
  "img.mandarake.co.jp",
  "images-na.ssl-images-amazon.com",
  "melonbooks.akamaized.net",
  "doujin-assets.dmm.co.jp",
  "i.imgur.com",
];

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const BookFetch = forwardRef((props, ref) => {
  const [isWantedSelected, setIsWantedSelected] = useState(true);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { value, onChange } = props;
  const books = value.toJS();
  const { wanted, purchased } = books;
  const displayedBooks = isWantedSelected ? wanted : purchased;

  const onListToggleButtonClick = () => {
    setSelectedIndices([]);
    setIsWantedSelected(!isWantedSelected);
  };

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
        const indexBook = displayedBooks[index];
        const selectedBooks = displayedBooks.filter((book, i) =>
          selectedIndices.includes(i),
        );
        const preSelectedBooks = displayedBooks.filter(
          (book, i) => i < index && !selectedIndices.includes(i),
        );
        const postSelectedBooks = displayedBooks.filter(
          (book, i) => i > index && !selectedIndices.includes(i),
        );
        const updatedBooks = [
          ...preSelectedBooks,
          ...selectedBooks,
          indexBook,
          ...postSelectedBooks,
        ];
        setSelectedIndices([]);
        if (isWantedSelected) {
          onChange(fromJS({ ...books, wanted: updatedBooks }));
        } else {
          onChange(fromJS({ ...books, purchased: updatedBooks }));
        }
      }
    }
  };

  const onDeleteButtonClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedBooks = [...displayedBooks];
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
    if (isWantedSelected) {
      onChange(fromJS({ ...books, wanted: updatedBooks }));
    } else {
      onChange(fromJS({ ...books, purchased: updatedBooks }));
    }
  };

  const onStatusUpdateButtonClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedBook = displayedBooks[index];
    const updatedBooks = [...displayedBooks];
    const otherBooks = [...(isWantedSelected ? purchased : wanted)];
    otherBooks.push(updatedBook);
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
    if (isWantedSelected) {
      onChange(
        fromJS({ ...books, wanted: updatedBooks, purchased: otherBooks }),
      );
    } else {
      onChange(
        fromJS({ ...books, purchased: updatedBooks, wanted: otherBooks }),
      );
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

    if (
      displayedBooks
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
              [isWantedSelected ? "wanted" : "purchased"]: [
                ...displayedBooks,
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

  const onTitleChange = (e, index) => {
    const updatedBooks = [...displayedBooks];
    const updatedBook = {
      book: {
        ...updatedBooks[index].book,
        title: e.target.value,
      },
    };
    updatedBooks[index] = updatedBook;
    onChange(
      fromJS({
        ...books,
        [isWantedSelected ? "wanted" : "purchased"]: updatedBooks,
      }),
    );
  };

  const onCaptionChange = (e, index) => {
    const updatedBooks = [...displayedBooks];
    const updatedBook = {
      book: {
        ...updatedBooks[index].book,
        caption: e.target.value,
      },
    };
    updatedBooks[index] = updatedBook;
    onChange(
      fromJS({
        ...books,
        [isWantedSelected ? "wanted" : "purchased"]: updatedBooks,
      }),
    );
  };

  const onThumbnailURLChange = (e, index) => {
    e.preventDefault();
    const newImageURL = e.target.value;
    let hostname;
    try {
      hostname = new URL(newImageURL).hostname;
    } catch (error) {
      // Fail silently
      setMessage(`Failed to parse thumbnail URL: ${newImageURL}`);
      return;
    }

    if (ALLOWED_IMAGE_HOST_NAMES.includes(hostname)) {
      const img = new Image();
      setMessage("Scraping new book IMGUR thumbnail data...");
      img.onload = function() {
        const updatedBooks = [...displayedBooks];
        const imageURLs = [...updatedBooks[index].book.imageURLs];
        imageURLs.shift();
        const updatedBook = {
          book: {
            ...updatedBooks[index].book,
            imageURLs: [newImageURL, ...imageURLs],
            imageWidth: this.width,
            imageHeight: this.height,
          },
        };
        updatedBooks[index] = updatedBook;
        onChange(
          fromJS({
            ...books,
            [isWantedSelected ? "wanted" : "purchased"]: updatedBooks,
          }),
        );
        setMessage("");
      };
      img.onerror = function() {
        setMessage("Failed to fetch new book IMGUR thumbnail");
      };
      img.src = newImageURL;
      return;
    }

    setMessage("Uploading image to IMGUR...");
    fetch("/.netlify/functions/imgur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageURL: newImageURL }),
    })
      .then(response => response.json())
      .then(body => {
        const {
          data: { link },
        } = body;
        const img = new Image();
        setMessage("Scraping new book IMGUR thumbnail data...");
        img.onload = function() {
          const updatedBooks = [...displayedBooks];
          const imageURLs = [...updatedBooks[index].book.imageURLs];
          imageURLs.shift();
          const updatedBook = {
            book: {
              ...updatedBooks[index].book,
              imageURLs: [link, ...imageURLs],
              imageWidth: this.width,
              imageHeight: this.height,
            },
          };
          updatedBooks[index] = updatedBook;
          onChange(
            fromJS({
              ...books,
              [isWantedSelected ? "wanted" : "purchased"]: updatedBooks,
            }),
          );
          setMessage("");
        };
        img.onerror = function() {
          setMessage("Failed to fetch new book IMGUR thumbnail");
        };
        img.src = link;
      })
      .catch(error => {
        setMessage("Failed to upload image to IMGUR");
      });
  };

  return (
    <>
      <div className={styles.wrapper} ref={ref}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={text}
            className={styles.input}
            onChange={onInputChange}
          />
          <button
            className={styles.listToggleButton}
            onClick={onListToggleButtonClick}
          >
            {isWantedSelected
              ? `${wanted.length} Wanted`
              : `${purchased.length} Purchased`}
          </button>
        </div>
        <p className={styles.statusText}>{message}</p>
        <div className={styles.container}>
          {displayedBooks.map(({ book }, index) => {
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
                    paddingTop: `${(book.imageHeight / book.imageWidth) *
                      100}%`,
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
                      X
                    </button>
                  ) : null}
                  {selectedIndices.includes(index) ? (
                    <button
                      className={styles.itemStatusUpdateButton}
                      onClick={e => onStatusUpdateButtonClick(e, index)}
                    >
                      {isWantedSelected ? "PURCHASED?" : "WANTED?"}
                    </button>
                  ) : null}
                </div>
                <ContentEditable
                  className={styles.itemTitle}
                  html={book.title}
                  onChange={e => onTitleChange(e, index)}
                />
                <ContentEditable
                  className={styles.itemCaption}
                  html={book.caption}
                  onChange={e => onCaptionChange(e, index)}
                />
                <input
                  className={styles.itemThumbnail}
                  value={book.imageURLs[0]}
                  onChange={e => onThumbnailURLChange(e, index)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default BookFetch;
