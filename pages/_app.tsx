import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import createUniformContext from "lib/uniform/uniformContext";
import { Hydrate } from "react-query";
import { MEDUSA_BACKEND_URL, queryClient } from "@lib/medusa/config";
import { AccountProvider } from "@lib/medusa/context/account-context";
import { CartDropdownProvider } from "@lib/medusa/context/cart-dropdown-context";
import { MobileMenuProvider } from "@lib/medusa/context/mobile-menu-context";
import { StoreProvider } from "@lib/medusa/context/store-context";
import { CartProvider, MedusaProvider } from "medusa-react";

import "../styles/styles.css";
import "tailwindcss/tailwind.css";

const clientContext = createUniformContext();

function MyApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps<{ dehydratedState?: unknown }>) {
  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <Hydrate state={pageProps.dehydratedState}>
        <CartDropdownProvider>
          <MobileMenuProvider>
            {/* <CartProvider>
              <StoreProvider>
                <AccountProvider> */}
                  <UniformContext
                    context={serverUniformContext ?? clientContext}
                    outputType={"standard"}
                    // enable for edge-side rendering
                    //outputType={"edge"}
                  >
                    <Component {...pageProps} />
                  </UniformContext>
                  {/*</AccountProvider>
             </StoreProvider>
            </CartProvider>*/}
          </MobileMenuProvider> 
        </CartDropdownProvider>
      </Hydrate>
    </MedusaProvider>
  );
}

export default MyApp;
