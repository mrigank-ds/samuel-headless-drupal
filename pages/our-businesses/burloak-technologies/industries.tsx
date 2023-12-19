import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";
import { NodeBtIndustriesTeaser } from "components/burloak-technologies/listing-pages/node--industries--teaser";
interface BtIndustryProps {
  nodes: DrupalNode[];
  mainMenu : any;
  footerMenus : any;
}

export default function MarketSolutionPage({ nodes,mainMenu, footerMenus}: BtIndustryProps) {
  
  return (
    <BtLayout menus={mainMenu} footerMenus={footerMenus}>
      <Head>
        <title>Our Industries | Burloak Technologies</title>
        <meta name="description" />
      </Head>
      <h1 className="mb-10 text-3xl font-black">
        EXPLORING NEW MARKET OPPORTUNITIES WITH ADDITIVE MANUFACTURING
      </h1>
      <div className="grid grid-cols-3">
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="m-12">
              <NodeBtIndustriesTeaser node={node} />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </BtLayout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<BtIndustryProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--burloak_technologies_industries",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--burloak_technologies_industries]":
          "title,field_industry_thumbnail_image,field_industry_description,path",
        include: "uid,field_industry_thumbnail_image",
      },
    }
  );
  
  

  return {
    props: {
      nodes,
      mainMenu,
      footerMenus
    },
  };
}
