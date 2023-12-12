import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { NodeOurBusinessesListingProps } from "components/node--our_businesses_listing";
import { drupal } from "lib/drupal";
import { Layout } from "components/layout";

interface OurBusinessesListingPageProps {
  nodes: DrupalNode[];
  mainMenu : any;
  listingParagraph:any
}

export default function OurBusinessesListingPage({ nodes,mainMenu,listingParagraph }: OurBusinessesListingPageProps) {
  return (
    <Layout menus={mainMenu}>
      <Head>
        <title>Samuel | Our Businesses</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="margin-auto">
                <NodeOurBusinessesListingProps node={node} listingParagraph={listingParagraph}/>
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<OurBusinessesListingPageProps>> {
  const mainMenu = await drupal.getMenu('main');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--our_businesses_listing",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--our_businesses_listing]":
          "title,path,field_business_image,uid,field_call_to_action,field_call_to_action_image,field_call_to_action_title,field_our_businesses",
        include: "field_business_image,uid,field_call_to_action_image,field_our_businesses",
      },
    }
  );    
 const listingParagraph = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "paragraph--business_listing_paragraph",
    context,
    {
      params: {
        "fields[paragraph--business_listing_paragraph]":
          "field_listing_paragraph_name,field_listing_paragraph_slug,field_listing_paragraph_image",
        include: "field_listing_paragraph_image",
      },
    }
  ); 
    // paragraph--business_listing_paragraph
  return {
    props: {
      nodes,
      mainMenu,
      listingParagraph
    },
  };
}
