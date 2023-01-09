import { GetStaticProps } from "next";
import Head from "next/head";
import { medusaClient } from "@lib/medusa/config";
import {
  getCollectionByHandle,
  getCollectionHandles,
} from "@lib/medusa/get-collection-ids";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navigation from "@/components/global/Navigation";
import Footer from "@/components/global/Footer";

export const fetchCollectionProducts = async ({
  pageParam = 0,
  id,
  cartId,
}: {
  pageParam?: number;
  id: string;
  cartId?: string;
}) => {
  const { products, count, offset } = await medusaClient.products.list({
    limit: 12,
    offset: pageParam,
    collection_id: [id],
    cart_id: cartId,
  });

  return {
    response: { products, count },
    nextPage: count > offset + 12 ? offset + 12 : null,
  };
};

const CollectionPage = ({ collectionData, products }) => (
  <>
    <Head>
      <title>{collectionData?.title}</title>
    </Head>
    <Navigation />
    {/* @ts-ignore */}
    <FeaturedProducts title={collectionData?.title} products={products} />
    <Footer />
  </>
);

export const getStaticPaths = async () => {
  const handle = await getCollectionHandles();
  return {
    paths: handle.map((handle) => ({ params: { handle } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { handle } = context.params || {};
  if (!handle) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const collectionData = await getCollectionByHandle(handle as string);
  if (!collectionData) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const { response } = await fetchCollectionProducts({
    id: collectionData.id,
  });

  return {
    props: {
      collectionData,
      products: response?.products || [],
      notFound: false,
    },
  };
};

export default CollectionPage;
