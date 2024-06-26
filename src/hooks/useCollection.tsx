import { useEffect, useState } from "react";
import { db } from "../firebase";
import { DocumentData, Query, collection, onSnapshot, query } from "firebase/firestore";

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapShot) => {
      const channelsResults: Channels[] = [];
      querySnapShot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        });
      });
      setDocuments(channelsResults);
    });
  }, [collectionRef]);

  return { documents };
};

export default useCollection;
