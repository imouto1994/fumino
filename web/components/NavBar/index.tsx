import styles from "./styles.css";

import React, { ReactElement } from "react";
import { useRoute, Link } from "wouter";

import IconLogo from "../IconLogo";
import LinkText from "../LinkText";
import PageDLoadable from "../PageDLoadable";
import PageHLoadable from "../PageHLoadable";
import PageMLoadable from "../PageMLoadable";
import PageDiLoadable from "../PageDiLoadable";
import Text from "../Text";

const links: { title: string; url: "/d" | "/h" | "/m" | "/di" }[] = process.env
  .LITE
  ? [
      {
        title: "/manga",
        url: "/m",
      },
    ]
  : [
      {
        title: "/d",
        url: "/d",
      },
      {
        title: "/h",
        url: "/h",
      },
      {
        title: "/m",
        url: "/m",
      },
      {
        title: "/di",
        url: "/di",
      },
    ];

export default function NavBar(): ReactElement<void> {
  return (
    <div className={styles.navBar}>
      <Link href="/">
        <a className={styles.navIconLink}>
          <IconLogo className={styles.navIcon} />
        </a>
      </Link>
      {links.map((link, index) => (
        <NavLink key={index} url={link.url} title={link.title} />
      ))}
    </div>
  );
}

type NavLinkProps = {
  title: string;
  url: "/d" | "/h" | "/m" | "/di";
};

function NavLink(props: NavLinkProps): ReactElement<NavLinkProps> {
  const { title, url } = props;
  const [isActive] = useRoute(`${url}/:type?`);

  const onLinkHover = (): void => {
    if (url === "/d") {
      PageDLoadable.preload();
    } else if (url === "/h") {
      PageHLoadable.preload();
    } else if (url === "/m") {
      PageMLoadable.preload();
    } else {
      PageDiLoadable.preload();
    }
  };

  return (
    <LinkText
      onLinkHover={onLinkHover}
      pattern={`${url}/:type?`}
      href={`${url}/wanted`}
      className={styles.navLink}
      classNameActive={styles.navLinkActive}
    >
      <Text weight={700} size={14}>
        {isActive ? title : url}
      </Text>
    </LinkText>
  );
}
