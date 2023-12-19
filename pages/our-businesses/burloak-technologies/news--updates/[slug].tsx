import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";
import BtNewsDetailPage from "components/burloak-technologies/detail-pages/node--news-detailPage";

const RESOURCE_TYPES = ["node--page", "node--article"];

interface NodePageProps {
  resource: DrupalNode;
  buloakTechnologiesMenu: any;
  footerMenus:any;
}

export default function BurloakTechnologiesNewsNodePage({
  resource,
  buloakTechnologiesMenu,
  footerMenus
}: NodePageProps) {
  if (!resource) return null;
  
  return (
    <>
      <BtLayout menus={buloakTechnologiesMenu} footerMenus={footerMenus}>
        <Head>
          <title>{resource.title}</title>
          <meta name="description" content="Burloak technologies subsite" />
        </Head>
        {resource.type === "node--news_insights" && (
         <BtNewsDetailPage resources={resource}/>
        )}
      </BtLayout>
    </>
  );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    return {
      paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
      fallback: "blocking",
    };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context);
  const buloakTechnologiesMenu = await drupal.getMenu("burloak-technologies"); // Header menus for Burloak Technologies Subsite
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');
  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;
  let params = {};
  if (type === "node--news_insights") {
    params = {
      include:
        "field_news_thumbnail_image,uid",
    };
  }

  //  field_service_image
  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resource,
      buloakTechnologiesMenu,
      footerMenus
    },
  };
}
