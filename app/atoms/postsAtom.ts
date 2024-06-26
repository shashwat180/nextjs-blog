import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  likes: number;
  imageURL?: string;
  createdAt: Timestamp;
  communityImageURL?: string;
};
export type PostLikes = {
  id: string;
  postId: string;
  communityId: string;
  likeValue: number;
};
interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postLikes: PostLikes[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postLikes: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
