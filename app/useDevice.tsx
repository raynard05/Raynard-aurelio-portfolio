"use client";

import { useEffect, useState } from "react";

export type DeviceType = "smallscreen" | "widthscreen";

const getDeviceType = (width: number): DeviceType => {
  if (width < 600) return "smallscreen";
  return "widthscreen"; // everything >= 600
};

export const useDevice = () => {
  const [width, setWidth] = useState<number>(0);
  const [device, setDevice] = useState<DeviceType>("widthscreen");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      setDevice(getDeviceType(w));
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* === Boolean helpers === */
  const isSmallScreen = device === "smallscreen";
  const isWidthScreen = device === "widthscreen";

  /* === Responsive class === */
  const deviceClass = isSmallScreen
    ? "is-small-screen"
    : "is-width-screen";

  return {
    width,
    device,
    deviceClass,

    isSmallScreen,
    isWidthScreen,
  };
};
