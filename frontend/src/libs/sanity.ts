import SanityClient from "next-sanity-client";

const sanityClient = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET as string,
  useCdn: process.env.NODE_ENV === "production",
});

export default sanityClient;
