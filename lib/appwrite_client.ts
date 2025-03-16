import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string); // Your project ID

export default client;
