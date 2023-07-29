import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "../$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {

    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("username", "==", params.username), limit(1));
    const querySnapshot = await getDocs(q);
    const exists = querySnapshot.docs[0]?.exists();
    const userData = querySnapshot.docs[0]?.data();

    if (!exists) {
        return error(404, "User not found");
    }

    if (!userData.published) {
        throw error(403, "The profile of user @{params.username} is not public");
    }

    return {
        username: userData.username,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        bio: userData.bio,
        links: userData.links ?? [{ name: "Website", url: "https://example.com"}],
    }
};
