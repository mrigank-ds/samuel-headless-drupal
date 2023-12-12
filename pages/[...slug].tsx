import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { NodeProduct } from "components/node--product";
import { drupal } from "lib/drupal";
import { NodeArticle } from "components/node--article";
import { NodeBasicPage } from "components/node--basic-page";
import { Layout } from "components/layout";
import { NodeMarketSolution } from "components/node--market_solution";
import { NodeService } from "components/node--services";
import { NodeCustomerResources } from "components/node--customer-resources";
const RESOURCE_TYPES = ["node--page", "node--article"];

interface NodePageProps {
  resource: DrupalNode;
  mainMenu: any;
  paragraph: any;
  customerResourceStateData:any;
  buloakTechnologiesMenu:any
}

export default function NodePage({
  resource,
  mainMenu,
  paragraph,
  customerResourceStateData,
  buloakTechnologiesMenu
}: NodePageProps) {
  if (!resource) return null;

  return (
    <>
    <Layout menus={mainMenu}>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--article" && <NodeArticle node={resource} />}
      {resource.type === "node--market_solution" && (
        <NodeMarketSolution node={resource} />
      )}
      {resource.type === "node--products" && (
        <NodeProduct node={resource} paragraphs={paragraph} />
      )}
      
      {resource.type === "node--services" && (
        <NodeService node={resource} />
      )}

      {resource.type === "node--customer_resources" && (
        <NodeCustomerResources node={resource} paragraphData={customerResourceStateData}/>
      )}

    </Layout>
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
  const paragraph = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "paragraph--product_specification",
    context,
    {
      params: {
        "fields[paragraph--product_specification]":
          "field_specification_title,field_specification_value,parent_id",
      },
    }
  );

  const customerResourceStateData = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "paragraph--state",
    context,
    {
      params: {
        "fields[paragraph--state]":
          "field_state_name,field_state_data,parent_id",
      },
    }
  );

  const mainMenu = await drupal.getMenu("main"); // Mainu for main samuel.com site
  const buloakTechnologiesMenu = await drupal.getMenu("burloak-technologies") ; // Header menus for Burloak Technologies Subsite



  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;

  let params = {};
  if (type === "node--market_solution") {
    params = {
      include: "field_market_solution_image,field_call_to_action_image,uid",
    };
  } else if (type === "node--products") {
    params = {
      include:
        "field_product_image,field_call_to_action_image,uid,field_product_specification",
    };
  }else if(type === "node--services"){
    params = {
      include:
        "field_service_image,field_call_to_action_image,uid",
    };
  }else if(type === 'node--customer_resources'){
    params = {
      include :
       "field_resource_image,field_resource,field_call_to_action_image,uid"
    }
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
      mainMenu,
      paragraph,
      buloakTechnologiesMenu,
      customerResourceStateData
    },
  };
}
