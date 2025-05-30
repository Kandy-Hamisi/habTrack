const config = {
  env: {
    appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    appwriteProjectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    appwritePlatform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    appwriteCollectionID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
    appwriteDatabaseID: process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
    appwriteCompletionCollectionID:
      process.env.EXPO_PUBLIC_APPWRITE_COMPLETION_COLLECTION_ID!,
  },
};

export default config;
