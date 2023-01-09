import { CollectionData } from "types/global";
import { medusaClient } from "./config";

export const getCollectionHandles = async (): Promise<string[]> => {
  const data = await medusaClient.collections
    .list({ limit: 100 })
    .then(({ collections }) => {
      return collections.map(({ handle }) => handle);
    });

  return data;
};

export const getCollectionByHandle = async (
  handle: string
): Promise<CollectionData> => {
  return await medusaClient.collections
    .list({ limit: 100 })
    .then(({ collections }) => {
      return collections.find((collection) => collection.handle === handle);
    });
};
