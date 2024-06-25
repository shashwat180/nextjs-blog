"use client";
import { firestore } from "@/Firebase/clientApp";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import CreatePostLink from "@/Community/CreatePostLink";
import Header from "@/Community/Header";
import { communityState } from "@/atoms/communities/communitiesAtoms";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import { notFound } from "next/navigation";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import About from "@/Community/About";

interface Community {
  id: string;
  creatorId: string;
  numberofMembers: number;
  createdAt: Timestamp;
  imageURL?: string;
  // Include other properties that your community object has
}

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPageWrapper = ({
  params,
}: {
  params: { communityId: string };
}) => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communityDocRef = doc(
          firestore,
          "communities",
          params.communityId
        );
        const communityDoc = await getDoc(communityDocRef);

        if (!communityDoc.exists()) {
          notFound();
        }

        const communityData = JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        );

        setCommunityStateValue((prev) => ({
          ...prev,
          currentCommunity: communityData,
        }));
      } catch (error) {
        console.error("Error fetching community data:", error);
        notFound();
      }
    };

    fetchCommunityData();
  }, [params.communityId, setCommunityStateValue]);

  if (!communityStateValue.currentCommunity) {
    return <div>Loading...</div>; // Add a loading state or return null
  }

  return (
    <>
      <Header communityData={communityStateValue.currentCommunity} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityStateValue.currentCommunity} />
        </>
        <>
          <About communityData={communityStateValue.currentCommunity} />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPageWrapper;

/*
type CommunityPageProps={
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps>=({communityData})=>{
    return(
        <Flex
        width='80%'
        height='full'
        border='1px solid'
        borderColor='black'
        justifyContent='flex-start'
        ml={275}>
            <div>Welcome to {communityData.id}</div></Flex>
        )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    try {
        const communityDocRef= doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc=await getDoc(communityDocRef);

        return{
            props:{
                communityData: JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })),
            }
        }
    } catch (error) {
        console.log('getServerSideProps error', error)
    }
}
export default CommunityPage;*/
