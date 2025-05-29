import { Account, Client, Databases } from "react-native-appwrite";
import config from "@/config";

const client = new Client()
  .setEndpoint(config.env.appwriteEndpoint)
  .setProject(config.env.appwriteProjectID)
  .setPlatform(config.env.appwritePlatform);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = config.env.appwriteDatabaseID;
export const HABITS_COLLECTION_ID = config.env.appwriteCollectionID;
