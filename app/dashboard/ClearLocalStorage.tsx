"use client";

import { useEffect } from "react";

export default function ClearLocalStorage() {
  useEffect(() => {
    localStorage.removeItem("pending_job");
  });

  return null;
}
