import React, { ComponentType } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import getConfig from "next/config";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  Composition,
  Slot,
  useContextualEditing,
  createApiEnhancer,
} from "@uniformdev/canvas-react";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import Navigation, { NavLink } from "./global/Navigation";
import Footer from "./global/Footer";

import "./components";

const PreviewDevPanel = dynamic(
  () => import("lib/uniform/preview/PreviewDevPanel")
);

export default function PageComposition({
  preview,
  composition,
  navLinks,
}: {
  preview: boolean;
  composition: RootComponentInstance;
  navLinks: Array<NavLink>;
}) {
  const [showPreviewToggle, setShowPreviewToggle] =
    React.useState<boolean>(false);
  const { composition: compositionInstance } = useContextualEditing({
    initialCompositionValue: composition,
    enhance: createApiEnhancer({
      apiUrl: "/api/preview",
    }),
  });

  if (!compositionInstance) {
    return null;
  }

  const { serverRuntimeConfig } = getConfig();
  const { projectId, apiKey, apiHost } = serverRuntimeConfig;
  const { metaTitle } = composition.parameters || {};
  const title = metaTitle?.value as string;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <Navigation navLinks={navLinks} />
        <Composition data={compositionInstance}>
          <Slot name="content" />
        </Composition>
        <ToggleEmbeddedContextDevTools
          initialSettings={{
            apiHost: apiHost,
            apiKey: apiKey,
            projectId: projectId,
          }}
        />
        <Footer />
      </>
      {showPreviewToggle && (
        <PreviewDevPanel
          preview={preview}
          compositionId={compositionInstance._id}
        />
      )}
    </>
  );
}
