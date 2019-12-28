import React, { forwardRef, useCallback, SyntheticEvent } from "react";

import styles from "./styles.css";

type ScrapedData = {
  url: string;
  title: string;
  price: string;
  imageURL: string;
};

type Props = {
  value: ScrapedData;
  onChange: (value: ScrapedData) => void;
};

const LinkScraper = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { value, onChange } = props;
  const onInputChange = useCallback((e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const url = target.value;
  }, []);

  return (
    <>
      <input
        ref={ref}
        type="text"
        className={styles.input}
        onChange={onInputChange}
      />
    </>
  );
});

export default LinkScraper;
