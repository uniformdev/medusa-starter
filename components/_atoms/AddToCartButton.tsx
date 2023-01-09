import React from "react";
import ButtonAction from "@/components/_atoms/ButtonAction";

interface Props {
  product: any;
  quantity: number;
  className?: string;
  styleType?: "primary" | "secondary";
  buttonCopy?: string;
}

const AddToCartButton: React.FC<Props> = ({
  className = "",
  styleType = "secondary",
  buttonCopy = "Add to Cart",
}) => {
  return (
    <ButtonAction
      onClick={() => console.log("not implemented")}
      isLoading={false}
      className={className}
      styleType={styleType}
    >
      <span>{buttonCopy}</span>
    </ButtonAction>
  );
};

export default AddToCartButton;
