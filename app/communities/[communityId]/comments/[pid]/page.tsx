import { auth } from "@/Firebase/clientApp";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import usePosts from "@/hooks/usePosts";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onLikes } =
    usePosts();
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onLike={onLikes}
            onDeletePost={onDeletePost}
            userLikeValue={
              postStateValue.postLikes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.likeValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        {/* <Comments/> */}
      </>
      <>{/* About */}</>
    </PageContent>
  );
};
export default PostPage;
