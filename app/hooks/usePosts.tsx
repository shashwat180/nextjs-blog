import { firestore, storage } from "@/Firebase/clientApp";
import { Post, postState } from "@/atoms/postsAtom";
import PostPage from "@/communities/[communityId]/comments/[pid]/page";
import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onLikes = async (post: Post, likes: number, communityId: string) => {
    try {
      const { likes } = post;
      const existingVote = postStateValue.postLikes.find(
        (likes) => likes.postId === post.id
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      const updatedPostLikes = [...postStateValue.postLikes];
      if (!existingVote) {
      } else {
      }
    } catch (error) {
      console.log("onLike error", error);
    }
  };

  const onSelect = () => {
    return <PostPage />;
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };
  return {
    postStateValue,
    setPostStateValue,
    onLikes,
    onSelect,
    onDeletePost,
  };
};
export default usePosts;
