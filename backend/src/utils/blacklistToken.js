import jwt from "jsonwebtoken";

const blacklistedTokens = new Map();

export const blacklistToken = (token) => {
  try{
    
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const expiresAt = verify?.exp
      ? verify.exp * 1000
      : Date.now() + 60 * 60 * 1000; // default 1h if no exp
    const ttl = Math.max(expiresAt - Date.now(), 0);

    if (ttl <= 0) {
      blacklistedTokens.delete(token);
      return;
    }

    const existingTimer = blacklistedTokens.get(token);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(()  => {
      blacklistedTokens.delete(token);
    }, ttl);

    blacklistedTokens.set(token, timer);
  } catch (error) {
    throw error
  }
};

export const isBlacklisted = (token) => blacklistedTokens.has(token);
