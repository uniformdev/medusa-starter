import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import Container, { BackgroundTypes } from "@/components/_atoms/Container";
import ButtonLink from "./_atoms/ButtonLink";
import ProductItem from "@/components/_atoms/ProductItem";
import Carousel from "@/components/Carousel";

type FeaturedProductsProps = ComponentProps<{
  products: Array<any>;
  title?: string;
}>;

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  products,
}: FeaturedProductsProps) => (
  <Container backgroundType={BackgroundTypes.LightGray}>
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10">
      <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
        <p className="font-extrabold text-3xl">{title}</p>
      </div>
      <ButtonLink
        href="/products"
        text="See more products"
        styleType={"primary"}
      />
    </div>
    <Carousel>
      {(products || []).map((item: any) => (
        <ProductItem
          key={`featured-product-${item.id}`}
          product={item}
          addToCart={undefined}
        />
      ))}
    </Carousel>
  </Container>
);

registerUniformComponent({
  type: "featuredProducts",
  component: FeaturedProducts,
});

export default FeaturedProducts;
