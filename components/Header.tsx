import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAutoCompleteIntl } from "../hooks/useAutocompleteIntl";
import { HeaderSearch } from "./HeaderSearch";

export const Header = () => {
  const session = useSession();
  const { push } = useRouter();
  const { messages } = useAutoCompleteIntl();

  const login = () => {
    if (session.data?.user) {
      push("/api/logout");
      return;
    }
    window.open("/api/auth/signin", "_blank", "width=640,height=480");
  };

  return (
    <header className="grid grid-cols-3 mx-auto items-center leading-none py-8">
      <button
        onClick={() => {
          push("/");
        }}
        className="text-7xl text-center"
      >
        🛍
      </button>
      <div>
        <HeaderSearch />
      </div>
      <div className="flex items-center text-2xl justify-center md:gap-8">
        <button onClick={login} className="grid gap-1 text-center">
          🧔🏾‍♂️
          <label className="text-xs">
            {session.data?.user
              ? session.data?.user.name
              : messages["header.login"]}
          </label>
        </button>
        <button
          onClick={() => {
            if (session.data?.user) {
              push("/cart");
            } else {
              login();
            }
          }}
          className="grid gap-1 text-center"
        >
          🛒 <label className="text-xs">{messages["header.myCart"]}</label>
        </button>
      </div>
    </header>
  );
};
