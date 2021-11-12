import { useEffect, useState } from "react";
import { items } from "../__generated__/items";
import { H2 } from "./H2";
import { ProductCard } from "./ProductCard";
import { useAutoCompleteIntl } from "../hooks/useAutocompleteIntl";

export const TopSellers = () => {
  const [items, setItems] = useState<items["shop_items"]>([]);
  const { messages } = useAutoCompleteIntl();

  const refresh = () =>
    fetch("/api/products")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <section className="items p-4 container mx-auto grid gap-4">
      <H2>{messages["shop.topSellers"]}</H2>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-4 gap-12">
        {items.map((item) => (
          <ProductCard onItemsChange={refresh} item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
