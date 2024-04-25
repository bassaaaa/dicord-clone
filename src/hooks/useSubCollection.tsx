import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CollectionReference, DocumentData, Query, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { Message } from "../Types";

const useSubCollection = (collectionName: string, subCollectionName: string) => {
  const channelId = useAppSelector((state) => state.channel.channelId);

  const [subDocuments, setSubDocuments] = useState<Message[]>([]);

  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData> = collection(db, collectionName, String(channelId), subCollectionName);

    const collectionRefOrderBy: Query<DocumentData> = query(collectionRef, orderBy("timestamp", "asc"));

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      const results: Message[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
    });
  }, [collectionName, subCollectionName, channelId]);

  return { subDocuments };
};

export default useSubCollection;
