// pages/Chat.tsx
import React, { useState } from "react";

function getBotResponse(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("tumhe kisne banaya") || text.includes("who made you")) {
    return "Mujhe Chat AI ne banaya hai 🤖";
  }

  if (text.includes("uska naam kya hai") || text.includes("creator name")) {
    return "Uska naam Imran hai 💻";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! Kaise ho?";
  }

  return "Hmm... interesting 😊";
}

>