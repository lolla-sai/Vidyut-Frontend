import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function KeyBindingHandler() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    let keys = {};

    const keyDownHandler = (e) => {
      keys[e.code] = true;
      console.log(keys);

      if (keys["AltLeft"] && keys["KeyA"]) {
        router.push("/auth/login");
      }

      if (keys["ControlLeft"] && keys["AltLeft"] && keys["KeyK"]) {
        console.log(colorMode);

        toggleColorMode();
      }
      console.log(keys);
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", (e) => delete keys[e.code]);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return <></>;
}

export default KeyBindingHandler;
