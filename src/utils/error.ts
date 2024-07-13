export function extractMessageFromError(e: any) {
  if (typeof e.response?.data?.message === "string") {
    return e.response?.data?.message;
  }
  if (typeof e.response?.data?.data === "string") {
    return e.response?.data?.data;
  }
  if (typeof e.message === "string") {
    return e.message;
  }
  return "Unknown error";
}
