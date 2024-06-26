import { Post } from "@/atoms/postsAtom";
import { Flex, Icon, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot, BsPeopleFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userLikeValue: number;
  onLike: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userLikeValue,
  onLike,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelet] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelet(true);
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }
      console.log("Post deleted.");
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelet(false);
  };
  return (
    <Flex
      borderBottom="1px solid"
      bg="white"
      borderColor="gray.300"
      _hover={{ bg: "#f2f6f7", borderRadius: 10 }}
      cursor="pointer"
      // onClick={onSelectPost}
    >
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {/* Home Page Check */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius="full"
                    boxSize="18px"
                    mr={2}
                  />
                ) : (
                  <Icon
                    as={BsPeopleFill}
                    fontSize="18pt"
                    mr={1}
                    color="#00495e"
                  />
                )}
                <Link href={`communities/${post.communityId}`}>
                  <Text
                    color="gray.500"
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                  >{`${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} />
              </>
            )}
            <Text>
              Posted by {post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              <Image src={post.imageURL} maxHeight="260px" />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={10}
            _hover={{ bg: "#b8c7cc" }}
            cursor="pointer"
          >
            <Icon
              as={userLikeValue === 1 ? FaHeart : FaRegHeart}
              color={userLikeValue === 1 ? "#00495e" : "gray.400"}
              onClick={onLike}
              mr={2}
            />
            <Text fontSize="9pt">{post.likes}</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={10}
            _hover={{ bg: "#b8c7cc" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={10}
            _hover={{ bg: "#b8c7cc" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={10}
            _hover={{ bg: "#b8c7cc" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={10}
              _hover={{ bg: "#b8c7cc" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
