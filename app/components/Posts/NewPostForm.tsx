"use client";
import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import { title } from "process";
import React, { useState } from "react";
import { IoDocumentText, IoImageOutline, IoLink } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInput from "./PostsForm/TextInput";
import ImageUpload from "./PostsForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/Firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

type NewPostFormProps = {
  user: User;
};

const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },

  {
    title: "Media",
    icon: IoImageOutline,
  },

  {
    title: "Link",
    icon: IoLink,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/");

  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    const communityId =
      searchParams.get("communityId") || pathSegments[pathSegments.length - 2];
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      likes: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
    } catch (error: any) {
      console.log("handleCreatePost error", error);
      setError(true);
    }
    setLoading(false);

    router.back();
  };

  // const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();

  //   if (event.target.files?.[0]) {
  //     reader.readAsDataURL(event.target.files[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={10}
      mt={2}
      border="1px solid"
      borderColor="gray.400"
    >
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInput
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}

        {selectedTab === "Media" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error uploading. Please try again.</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
