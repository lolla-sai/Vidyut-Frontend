import { useColorMode } from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type PressedKeysType = {
  [key: string]: any;
  AltLeft?: boolean;
  ControlLeft?: boolean;
  KeyA?: boolean;
  KeyK?: boolean;
};

let keys: PressedKeysType = {};

function KeyBindingHandler() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const keyDownHandler: (e: KeyboardEvent) => void = (e) => {
    keys[e.code] = true;
    if (keys["AltLeft"] && keys["KeyA"]) {
      router.push("/auth/login");
    }
    if (keys["ControlLeft"] && keys["AltLeft"] && keys["KeyK"]) {
      toggleColorMode();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", (e) => delete keys[e.code]);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return <></>;
}

export default KeyBindingHandler;
