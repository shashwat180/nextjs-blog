import { firestore, auth } from "@/Firebase/clientApp";
import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setcommunityName] = useState("");
  const [charsRemaining, setcharsRemaining] = useState(25);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 25) return;
    setcommunityName(event.target.value);
    setcharsRemaining(25 - event.target.value.length);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3 and 25 characters and can only contain letters, numbers and underscore."
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, ${communityName} is already taken.`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippet`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunityError", error);
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="14pt" textAlign="center">
            <Text>Create a Community</Text>
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text>Name</Text>
              <Input value={communityName} size="sm" onChange={handleChange} />
              <Text
                color={charsRemaining == 0 ? "red" : "gray.400"}
                fontSize="9pt"
              >
                {charsRemaining} characters remaining
              </Text>
              <Text fontSize="9pt">{error}</Text>
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleCreateCommunity}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
