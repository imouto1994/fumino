import React, { ReactElement } from "react";

import CardBook from "./CardBook";
import doujinshis from "../../json/doujinshi.json";

export default function PageDoujinshi(): ReactElement<void> {
  const { books } = doujinshis;

  return (
    <div className="flex flexWrap itemsStretch">
      {books.map(({ book }, index) => (
        <div className="p8 flexNone wP100 wP50Xs wP25Lg" key={index}>
          <CardBook className="hP100" book={book} />
        </div>
      ))}
    </div>
  );
}
