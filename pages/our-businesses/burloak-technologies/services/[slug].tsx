import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/commons/burloak-technologies-commons/BtLayout";
import { NodeBTService } from "components/node--burloak_technologies_services";

const RESOURCE_TYPES = ["node--page", "node--article"];

interface NodePageProps {
  resource: DrupalNode;
  buloakTechnologiesMenu: any;
}

export default function BurloakTechnologiesNodePage({
  resource,
  buloakTechnologiesMenu
}: NodePageProps) {
  if (!resource) return null;
  
  return (
    <>
      <BtLayout menus={buloakTechnologiesMenu}>
        <Head>
          <title>{resource.field_service_name}</title>
          <meta name="description" content="Burloak technologies subsite" />
        </Head>
        {resource.type === "node--burloak_technologies_services" && (
          <NodeBTService node={resource} />
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
 
  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;
  let params = {};
  if (type === "node--burloak_technologies_services") {
    params = {
      include:
        "field_service_video,field_service_video.field_media_video_file,field_call_to_action_image,uid,field_advantages.field_icon,field_advantages,field_certificates,field_certificates.field_certificate_icon,field_services_paragraph,field_services_paragraph.field_service_image,field_service_thumbnail",
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
    },
  };
}
