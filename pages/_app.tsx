import { SessionProvider } from "next-auth/react";
import { AppComponent } from "next/dist/shared/lib/router/router";
import { Header } from "../components/Header";
import { HeaderNavItem } from "../components/HeaderNavItem";
import { UserCartContextProvider } from "../components/UserCartContext";
import { IntlProvider } from "react-intl";

import "../css/globals.css";
import { useRouter } from "next/router";

import { en } from "../intl/en";
import { de } from "../intl/de";
import { sr } from "../intl/sr";

const messages: Record<string, Dictionary> = {
  en,
  de,
  sr,
};

const App: AppComponent = (props) => {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <SessionProvider session={props.pageProps.session}>
        <Header />
        <nav className="col-span-3 bg-gray-100 p-2">
          <ul className="flex gap-4 max-w-screen-lg mx-auto">
            <HeaderNavItem>{messages[locale]["shop.menu.shop"]}</HeaderNavItem>
            <HeaderNavItem className="text-red-600">
              % {messages[locale]["shop.menu.sale"]} %
            </HeaderNavItem>
            <HeaderNavItem>{messages[locale]["shop.menu.about"]}</HeaderNavItem>
          </ul>
        </nav>
        <main className="min-h-screen">
          <UserCartContextProvider>
            <props.Component {...props.pageProps} />
          </UserCartContextProvider>
        </main>
        <footer className="p-4 mt-auto text-center bg-gray-200">
          &copy; {new Date().getFullYear()} – My Shop, Inc.
        </footer>
      </SessionProvider>
    </IntlProvider>
  );
};

export default App;
