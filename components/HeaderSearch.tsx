import { useEffect, useState } from "react";
import { search } from "../__generated__/search";

export const HeaderSearch = () => {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState<search["shop_items"]>([]);

  useEffect(() => {
    fetch(`/api/search?text=${text}`)
      .then((r) => r.json())
      .then(setSearchResults);
  }, [text]);

  return (
    <>
      <input
        list="search-results"
        className="border border-gray-300 w-full rounded md:p-2"
        type="text"
        placeholder="Search..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && searchResults.length > 0 && (
        <datalist id="search-results">
          {searchResults.map((result) => (
            <option key={result.id}>{result.name}</option>
          ))}
        </datalist>
      )}
    </>
  );
};
