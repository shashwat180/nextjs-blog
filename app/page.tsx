"use client";
import type { NextPage } from "next";
import PageContent from "./components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./Firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import usePosts from "./hooks/usePosts";
import { Post } from "./atoms/postsAtom";
import { Flex, Stack } from "@chakra-ui/react";
import PostItem from "./components/Posts/PostItem";
import CreatePostLink from "./Community/CreatePostLink";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "./atoms/communities/communitiesAtoms";
import useCommunityData from "./hooks/useCommunityData";
import Recommendation from "./Community/Recommendation";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onLikes, onSelect, onDeletePost } =
    usePosts();
  const { communityStateValue } = useCommunityData();
  const buildUserHomeFeed = async () => {
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("buildUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[], //13:01
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userLikeValue={1}
              onSelectPost={onSelect}
              onDeletePost={onDeletePost}
              onLike={onLikes}
              userIsCreator={user?.uid === post.creatorId}
              homePage
            />
          ))}
        </Stack>
      </>
      <>
        <Recommendation />
      </>
    </PageContent>
  );
};
export default Home;
