import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "wrwckbd2",
  dataset: "production",
  apiVersion: "2023-01-23",
  useCdn: false,
});
