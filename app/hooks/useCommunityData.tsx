import { authModalState } from "@/atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communities/communitiesAtoms";
import { auth, firestore } from "@/Firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  console.log("Hook initialized");
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      //open modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    JoinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippet`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        snippetsFetched: true,
      }));
      console.log("here is the snippet", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const JoinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityData.id),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunityError", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityId)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunityerror", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
