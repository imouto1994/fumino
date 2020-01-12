import styles from "./styles.css";

import React, {
  ReactElement,
  CSSProperties,
  useState,
  useEffect,
  useRef,
} from "react";
import { WindowScroller, List } from "react-virtualized";

import CardBook from "../CardBook";
import BookPreview from "../BookPreview";
import { Book } from "../../data/book";
import { verticalScrollbarWidth } from "../../utils/dom";
import styleConstants from "../../styles.json";

type Props = {
  books: { book: Book }[];
};

export default function CardBookList(props: Props): ReactElement<Props> {
  const { books } = props;
  const [previewedBook, setPreviewedBook] = useState<Book | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const listRef = useRef<List>(null);

  useEffect((): (() => void) => {
    function handleResize(): void {
      setWindowWidth(window.innerWidth);
      if (listRef.current != null) {
        listRef.current.recomputeRowHeights();
      }
    }

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let numItemsPerRow = 2;
  if (windowWidth > 2000) {
    numItemsPerRow = 8;
  } else if (windowWidth >= parseInt(styleConstants.desktop, 10)) {
    numItemsPerRow = 5;
  } else if (windowWidth >= parseInt(styleConstants.tabletLandscape, 10)) {
    numItemsPerRow = 4;
  }

  const onBookPreview = (book: Book): void => {
    setPreviewedBook(book);
  };

  const onBookPreviewCancel = (): void => {
    setPreviewedBook(null);
  };

  const renderRow = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
  }): ReactElement => {
    const filteredBooks = books.filter(
      (_, i) => Math.floor(i / numItemsPerRow) === index,
    );
    return (
      <div style={style} key={key} className={styles.row}>
        {filteredBooks.map(({ book }) => (
          <div
            className={styles.itemWrapper}
            style={{ width: `${100 / numItemsPerRow}%` }}
            key={book.url}
          >
            <CardBook
              className={styles.item}
              book={book}
              onBookPreview={onBookPreview}
            />
          </div>
        ))}
      </div>
    );
  };

  const getRowHeight = ({ index }: { index: number }): number => {
    const filteredBooks = books.filter(
      (_, i) => Math.floor(i / numItemsPerRow) === index,
    );
    const maxRatio = filteredBooks.reduce(
      (maxRatio, { book }) =>
        Math.max(maxRatio, book.imageHeight / book.imageWidth),
      0,
    );

    return (
      ((windowWidth - verticalScrollbarWidth) / numItemsPerRow - 8 * 2) *
        maxRatio +
      61 +
      16
    );
  };

  return (
    <div className={styles.list}>
      <WindowScroller>
        {({ height, scrollTop, registerChild }): ReactElement => (
          <div ref={registerChild}>
            <List
              ref={listRef}
              autoHeight
              height={height}
              width={windowWidth - verticalScrollbarWidth}
              scrollTop={scrollTop}
              rowHeight={getRowHeight}
              rowRenderer={renderRow}
              rowCount={Math.ceil(books.length / numItemsPerRow)}
              overscanRowCount={2}
            />
          </div>
        )}
      </WindowScroller>
      {previewedBook != null ? (
        <BookPreview
          book={previewedBook}
          onPreviewCancel={onBookPreviewCancel}
        />
      ) : null}
    </div>
  );
}
