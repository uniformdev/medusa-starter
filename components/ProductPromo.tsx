import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import Container, { PaddingSize } from "@/components/_atoms/Container";
import ProductItem from "@/components/_atoms/ProductItem";
import AddToCartButton from "./_atoms/AddToCartButton";
import CurrencyFormatter from "./_atoms/CurrencyFormatter";

type ProductPromoProp = ComponentProps<{
  product: any;
}>;

const ProductPromo: React.FC<ProductPromoProp> = ({
  product,
}: ProductPromoProp) => {
  const productPrice =
    product.variants[0].prices.find((v) => v.currency_code === "usd").amount /
    100;
  return (
    <Container
      paddingTop={PaddingSize.Medium}
      paddingBottom={PaddingSize.Medium}
    >
      <div className="flex flex-col lg:flex-row gap-x-16 max-w-sm sm:max-w-xl lg:max-w-full">
        <div className="basis-1/2">
          <ProductItem product={product} withoutPrice />
        </div>
        <div className="flex flex-col justify-center pt-8 md:pt-12 lg:pt-0 basis-1/2">
          <p className="font-extrabold text-3xl">{product.title}</p>
          {Boolean(product.description) && (
            <div
              className="product-description pt-6 pb-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          <CurrencyFormatter
            className="py-6 text-3xl"
            currency="USD"
            amount={productPrice}
          />
          <AddToCartButton
            product={product}
            quantity={1}
            className="w-2/3 sm:w-1/2 text-sm"
            styleType="primary"
            buttonCopy={"Add"}
          />
        </div>
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: "productPromo",
  component: ProductPromo,
});

export default ProductPromo;
