import Image from "next/image";
import React from "react";

const Logo = (props: any) => {
  return (
    <Image
      src="/assets/vidyut-logo.svg"
      alt="Logo"
      width={1500}
      height={507}
      style={{
        width: props.width || "300px",
        height: "auto",
        margin: "10px 0",
      }}
    />
  );
};

export default Logo;
