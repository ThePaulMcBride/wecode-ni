"use client";

import { useEffect } from "react";

export default function ClearLocalStorage() {
  useEffect(() => {
    window.localStorage.removeItem("job_token");
  });

  return null;
}
