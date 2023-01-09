import { GetStaticPropsContext } from "next";
import PageComposition from "@/components/PageComposition";
import { getCompositionBySlug } from "lib/uniform/canvasClient";

const CanvasPage = (props) => PageComposition(props);

export default CanvasPage;

export async function getServerSideProps(context: GetStaticPropsContext) {
  const { slug } = context?.params || {};
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview = false } = context;
  const slashedSlug = !slugString
    ? "/"
    : slugString.startsWith("/")
    ? slugString
    : `/${slugString}`;
  const composition = await getCompositionBySlug(slashedSlug, context);
  return {
    props: {
      composition,
      preview,
    },
  };
}
