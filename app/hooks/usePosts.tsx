import { firestore, storage } from "@/Firebase/clientApp";
import { Post, postState } from "@/atoms/postsAtom";
import PostPage from "@/communities/[communityId]/comments/[pid]/page";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onLikes = async () => {};

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
