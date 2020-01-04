import React, { ReactElement, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Lazy(props: Props): ReactElement<Props> {
  const { className = "", children } = props;
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "250px 0px",
  });

  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
