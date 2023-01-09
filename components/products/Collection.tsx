import { useInView } from "react-intersection-observer";
import usePreviews from "@lib/medusa/hooks/use-previews";
import getNumberOfSkeletons from "@lib/medusa/get-number-of-skeletons";
import repeat from "@lib/medusa/repeat";
import ProductPreview from "./product-preview";
import SkeletonProductPreview from "./skeleton-product-preview";
import { fetchCollectionProducts } from "@pages/shop/[handle]";
//import { useCart } from "medusa-react";
import React, { useEffect } from "react";

import { useInfiniteQuery } from "react-query";

type CollectionTemplateProps = {
  collection: {
    id: string;
    title: string;
  };
};

const CollectionTemplate: React.FC<CollectionTemplateProps> = ({
  collection,
}) => {
  // TODO: remove hard-coded cart state when enabling the cart functionality
  // const { cart } = useCart();
  const cart: any = { id: "0", region: {} };
  const { ref, inView } = useInView();

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [`get_collection_products`, collection.id, cart?.id],
    ({ pageParam }) =>
      fetchCollectionProducts({
        pageParam,
        id: collection.id,
        cartId: cart?.id,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1>{collection.title}</h1>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  );
};

export default CollectionTemplate;
