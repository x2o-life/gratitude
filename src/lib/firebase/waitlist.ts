import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import type { WaitlistAudience } from "@/stores/waitlist-store";

import { db } from "./client";

const waitlistCollections: Record<WaitlistAudience, string> = {
  brand: "brand-waitlist",
  consumer: "consumer-waitlist",
};

export async function submitWaitlistEntry(
  audience: WaitlistAudience,
  data: Record<string, string>,
) {
  await addDoc(collection(db, waitlistCollections[audience]), {
    ...data,
    createdAt: serverTimestamp(),
  });
}
