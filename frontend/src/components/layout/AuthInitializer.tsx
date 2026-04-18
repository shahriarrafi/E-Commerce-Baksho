"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthInitializer() {
  useEffect(() => {
    useAuthStore.getState().fetchMe();
  }, []);

  return null;
}
