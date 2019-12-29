import styles from "./styles.css";

import React, { ReactElement } from "react";
import { useRoute } from "wouter";

import LinkText from "../LinkText";
import Text from "../Text";

const links = [
  {
    title: "/doujinshi",
    url: "/d",
  },
  {
    title: "/hentai",
    url: "/h",
  },
  {
    title: "/manga",
    url: "/m",
  },
  {
    title: "/digital",
    url: "/di",
  },
];

export default function NavBar(): ReactElement<void> {
  return (
    <div className={styles.navBar}>
      <Text className={styles.navHeader} weight={600} size={24}>
        wishlist
      </Text>
      {links.map((link, index) => (
        <NavLink key={index} url={link.url} title={link.title} />
      ))}
    </div>
  );
}

type NavLinkProps = {
  title: string;
  url: string;
};

function NavLink(props: NavLinkProps): ReactElement<NavLinkProps> {
  const { title, url } = props;
  const [isActive] = useRoute(url);

  return (
    <LinkText
      href={url}
      className={styles.navLink}
      classNameActive={styles.navLinkActive}
    >
      {""}
      <Text weight={700} size={14}>
        {isActive ? title : url}
      </Text>
    </LinkText>
  );
}
