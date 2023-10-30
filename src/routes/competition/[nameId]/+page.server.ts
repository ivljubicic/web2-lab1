import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export async function load({ params }) {

  const competitionsRef = collection(firestore, 'competitions');

  // console.log(params.nameId);

  const competitionDoc = doc(competitionsRef, params.nameId);
  const snapshot = await getDoc(competitionDoc);
  
  if (!snapshot.exists()) {
    throw error(404, "that competition does not exist!");
  }

  const data = snapshot.data();
    
  return {
    name: data?.name,
    contendors: data?.contenders,
    owner: data?.owner,
    scoringType: data?.scoringType,
    matches: data?.matches,
    points: data?.points,
    docRef: params.nameId
  };
}