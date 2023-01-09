import React from "react";

interface Props {
  currency: any;
  amount?: number;
  className?: string;
}

const CurrencyFormatter: React.FC<Props> = ({
  currency,
  amount,
  className,
}) => {
  if (typeof amount === "undefined") return null;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

  return <div className={className}>{amount && formattedPrice}</div>;
};

export default CurrencyFormatter;
