import styles from "./styles.css";

import React, { ReactElement } from "react";

import LinkText from "../LinkText";
import Text from "../Text";

type Props = {
  tabs: Array<{
    title: string;
    url: string;
  }>;
};

export default function Tabs(props: Props): ReactElement<Props> {
  const { tabs } = props;
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => {
        return (
          <LinkText
            className={styles.tab}
            classNameActive={styles.tabActive}
            href={tab.url}
            key={tab.url}
          >
            <Text weight={600} size={14}>
              {tab.title}
            </Text>
          </LinkText>
        );
      })}
    </div>
  );
}
