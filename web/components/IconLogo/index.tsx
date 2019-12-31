import React, { ReactElement } from "react";

type Props = {
  className?: string;
};

export default function IconLogo(props: Props): ReactElement<Props> {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        d="M478.6 300.5v-33.4h-33.4v-66.8h33.4V66.8h-33.4V33.4h-33.4V0H0v100.2h33.4v311.6H0V512h445.2v-33.4h33.4v-33.4H512V300.5h-33.4zm-133.6 78H167v-44.6h178v44.5zm0-222.7H167v-33.4h178v33.4z"
        fill="#f8a5c2"
      />
      <path
        fill="#f78fb3"
        d="M478.6 300.5v-33.4h-33.4v-66.8h33.4V66.8h-33.4V33.4h-33.4V0H256v122.4h89v33.4h-89v178.1h89v44.5h-89V512h189.2v-33.4h33.4v-33.4H512V300.5z"
      />
      <path d="M33.4 100.2h33.4v311.7H33.4z" />
      <path d="M33.4 411.8H0V512h445.2v-33.4H33.4zM411.8 33.4V0H0v100.2h33.4V33.4zM411.8 33.4h33.4v33.4h-33.4zM445.2 66.8h33.4v133.6h-33.4zM478.6 300.5H512v144.7h-33.4zM445.2 445.2h33.4v33.4h-33.4zM378.4 189.2v-66.8H345v33.4H167v-33.4h178V89H133.6v100.2zM345 378.4H167v-44.5h178v-33.4H133.6v111.3h244.8v-77.9H345z" />
      <path d="M411.8 233.7h-33.4v33.4h66.8v-66.8h-33.4zM445.2 267.1h33.4v33.4h-33.4z" />
    </svg>
  );
}
