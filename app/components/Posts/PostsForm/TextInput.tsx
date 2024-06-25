import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleCreatePost: () => void;
  loading: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={10}
        placeholder="Title"
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "#00495e",
        }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={10}
        placeholder="Caption (optional)"
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "#00495e",
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          p="0px 30px"
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInput;
