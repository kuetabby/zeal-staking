import React, { forwardRef } from "react";
import NextLink from "next/link";

import type { ComponentProps, ReactElement } from "react";

type AnchorProps = Omit<ComponentProps<"a">, "ref"> & {
  newWindow?: boolean;
};

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(function (
  { href = "", children, newWindow, ...props },
  forwardedRef
): ReactElement {
  if (newWindow) {
    return (
      <a
        href={href}
        ref={forwardedRef}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (!href) {
    return (
      <a ref={forwardedRef} {...props}>
        {children}
      </a>
    );
  }

  if (href.includes("#")) {
    return (
      <a href={href} ref={forwardedRef} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} ref={forwardedRef} {...props}>
      {children}
    </NextLink>
  );
});

export default Anchor;
