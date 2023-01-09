import React from "react";
import Link from "next/link";
import classNames from "classnames";
import Image from "./Image";
import CurrencyFormatter from "./CurrencyFormatter";
import AddToCartButton from "@/components/_atoms/AddToCartButton";

const NoImageSrc = "/img/no-image.jpg";

const slugify = (value: string): string =>
  value
    ? value
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text
    : undefined;

const buildProductDetailLink = ({
  id,
  productName,
}: {
  id: number | string;
  productName: string;
}) => ({
  href: `/products/${slugify(productName)}`,
});

interface Props {
  product: any;
  withoutPrice?: boolean;
  addToCart?: boolean;
  styleType?: "default" | "menu";
}

const ProductItem: React.FC<Props> = ({
  product,
  withoutPrice = false,
  addToCart = false,
  styleType = "default",
}) => {
  const { id, salePrice, thumbnail } = product || {};
  const currency = {
    code: "usd",
  };

  if (!product || !id) return null;

  const productPrice = product.variants[0].prices.find(
    (v) => v.currency_code === currency.code
  ).amount/100;

  return (
    <div
      className={classNames(
        "group flex flex-1 flex-col w-full mx-auto mb-auto mt-0",
        { "w-48": styleType === "menu" }
      )}
    >
      <div className="relative flex flex-col items-center lg:px-0">
        <Link
          className="flex flex-col cursor-pointer w-full"
          {...buildProductDetailLink({ id, productName: product.handle })}
        >
          <div
            className={classNames(
              "relative p-[0px] w-full h-auto pb-[calc(100%-36px)] group-hover:pb-[calc(100%-18px)] border-[18px] group-hover:border-[9px] transition-all border-white outline-1 outline outline-main_gray bg-white",
              {
                "border-[10px] group-hover:border-[5px] group-hover:pb-[calc(100%-10px)] pb-[calc(100%-20px)]":
                  styleType === "menu",
              }
            )}
          >
            <Image
              className="object-contain"
              fill
              src={thumbnail || NoImageSrc}
              alt={`${id}-product-image`}
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          {!withoutPrice && (
            <>
              <span
                className={classNames(
                  "font-bold overflow-hidden text-ellipsis",
                  {
                    "text-base mt-2": styleType === "menu",
                    "text-2xl mt-6": styleType === "default",
                  }
                )}
              >
                {product.title}
              </span>
              <div className="flex h-14">
                {salePrice !== 0 && (
                  <CurrencyFormatter
                    currency={currency.code}
                    amount={salePrice}
                  />
                )}
                <CurrencyFormatter
                  className={classNames({
                    "pl-2 text-orange-600 opacity-60 line-through": salePrice,
                    "mt-2": styleType === "menu",
                  })}
                  currency={currency.code}
                  amount={productPrice}
                />
              </div>
              {addToCart && (
                <AddToCartButton
                  product={product}
                  quantity={1}
                  styleType="primary"
                  className="w-full md:w-32 !px-2 text-sm"
                />
              )}
            </>
          )}
        </Link>
      </div>
    </div>
  );
};
export default ProductItem;
