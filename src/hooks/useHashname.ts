"use client";
import { useEffect, useState } from "react";
import { useIsMounted } from "./useIsMounted";

import { getHash } from "@/utils/hash";

const useHash = () => {
  const [hash, setHash] = useState(getHash());
  const isMounted = useIsMounted();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return isMounted && hash ? hash : null;
};

export default useHash;
