export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const payload = token.split(".")[1];
  if (!payload) {
    return false;
  }

  const decodedPayload = JSON.parse(window.atob(payload));

  const expiryTime = decodedPayload.exp * 1000;
  const currentTime = Date.now();
  return expiryTime > currentTime;
};

export const decodeToken = (token: string) => {
  if (!token) {
    throw new Error("Token is undefined or null.");
  }

  const decodedToken = atob(token.split(".")[1]);
  return JSON.parse(decodedToken);
};
