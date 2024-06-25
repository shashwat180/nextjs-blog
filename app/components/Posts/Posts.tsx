"use client";
import { auth, firestore } from "@/Firebase/clientApp";
import { Community } from "@/atoms/communities/communitiesAtoms";
import { Post } from "@/atoms/postsAtom";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onLikes, onSelect, onDeletePost } =
    usePosts();

  const getPosts = async () => {
    try {
      //get posts for this community
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as unknown as Post[],
      }));

      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts Error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item) => (
        <PostItem
          post={item}
          userIsCreator={user?.uid === item.creatorId}
          userLikeValue={undefined}
          onLike={onLikes}
          onSelect={onSelect}
          onDeletePost={onDeletePost}
        />
      ))}
    </Stack>
  );
};
export default Posts;
