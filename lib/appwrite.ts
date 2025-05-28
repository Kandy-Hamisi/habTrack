import { Account, Client, Databases } from "react-native-appwrite";
import config from "@/config";

const client = new Client()
  .setEndpoint(config.env.appwriteEndpoint)
  .setProject(config.env.appwriteProjectID)
  .setPlatform(config.env.appwritePlatform);

export const account = new Account(client);
