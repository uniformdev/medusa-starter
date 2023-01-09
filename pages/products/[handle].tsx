import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProductHandles } from "lib/medusa/get-product-handles";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchProduct } from "lib/medusa/get-product";
import { IS_BROWSER } from "lib/constants";
import ProductPromo from "@/components/ProductPromo";
import Footer from "@/components/global/Footer";
import Navigation from "@/components/global/Navigation";

const ProductDetailPage: any = ({ notFound }) => {
  const { query, isFallback, replace } = useRouter();
  const handle = typeof query.handle === "string" ? query.handle : "";

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  );

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404");
    }

    return null;
  }

  if (isFallback || isLoading || !data) {
    return null;
  }

  if (isError) {
    replace("/404");
  }

  if (isSuccess) {
    return (
      <>
        <Head>
          <title>{data?.title}</title>
        </Head>
        <>
          <Navigation />
          {/* @ts-ignore */}
          <ProductPromo product={data} />;
          <Footer />
        </>
      </>
    );
  }

  return <></>;
};

export const getStaticProps = async (context) => {
  const handle = context.params?.handle as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`get_product`, handle], () =>
    fetchProduct(handle)
  );

  const queryData = await queryClient.getQueryData([`get_product`, handle]);

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    },
  };
  // const { preview = false } = context;
  // const slugParamValue = context?.params?.productSlug as string;
  // // fixme: not working with GUIDs!
  // const { productId, productName } = getProductIdNameFromSlug(slugParamValue);
  // if (!productName || !productId) return { notFound: true };
  // const pdpSlug = `/products/${slugParamValue}`;
  // let { composition } =
  //   (await Commerce.getCompositionBySlug(pdpSlug, context).catch(
  //     compositionExceptionHandler
  //   )) || {};
  // if (!composition) {
  //   // fetch the composition by slug "product-detail", in this case all product detail pages will be rendered using this composition
  //   composition = (
  //     await Commerce.getCompositionBySlug(Routes.ProductDetail, context)
  //   ).composition;
  // }
  // const enhancedComposition = await Commerce.enhanceProductDetails({
  //   composition,
  //   context,
  //   productId,
  // });
  // return {
  //   props: {
  //     composition: enhancedComposition,
  //     preview,
  //     key: `${productName}-${productId}`,
  //   },
  // };
};

export const getStaticPaths = async () => {
  const handles = await getProductHandles();
  return {
    paths: handles.map((handle) => ({ params: { handle } })),
    fallback: true,
  };
};

export default ProductDetailPage;
