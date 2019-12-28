import React, { ReactElement } from "react";

import Card from "./Card";
import Lazy from "./Lazy";
import { Book } from "../data/book";

type Props = {
  className?: string;
  book: Book;
};

export default function CardBook(props: Props): ReactElement<Props> {
  const { className = "", book } = props;

  return (
    <Card className={className}>
      <a
        className="block hP100 flex flexColumn flexNowrap"
        href={book.url}
        target="__blank"
      >
        <div className="flex1 flex itemsCenter">
          <div
            className="wP100 relative"
            style={{
              paddingTop: `${(book.imageHeight / book.imageWidth) * 100}%`,
            }}
          >
            <Lazy className="absolute inset0">
              <img className="wP100 wH100" src={book.imageURL} />
            </Lazy>
          </div>
        </div>
        <span className="flexInitial mT8 truncate">{book.title}</span>
        <span className="flexInitial mT8 truncate textGreen">{book.price}</span>
      </a>
    </Card>
  );
}
