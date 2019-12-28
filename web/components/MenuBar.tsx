import React, { ReactElement } from "react";

import Link from "./Link";

type Tab = {
  title: string;
  url: string;
};

const tabs: Tab[] = [
  {
    title: "Doujinshi",
    url: "/doujinshi",
  },
  {
    title: "Hentai",
    url: "/hentai",
  },
  {
    title: "Manga",
    url: "/manga",
  },
  {
    title: "Digital",
    url: "/digital",
  },
];

export default function MenuBar(): ReactElement<void> {
  return (
    <div className="fixed wP100 flex bottom0 borderT borderSolid borderGray80 bgGray100 h64">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.url}
          className="flex1 block flex itemsCenter justifyCenter"
          classNameActive="textPink"
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}
