import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { NodeBTServicesTeaser } from "components/burloak-technologies/listing-pages/node--burloak_technologies_services--teaser";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";

interface BtServiceProps {
  nodes: DrupalNode[];
  mainMenu : any;
  footerMenus : any;
}

export default function BtServicePage({ nodes,mainMenu, footerMenus}: BtServiceProps) {

  return (
    <BtLayout menus={mainMenu} footerMenus={footerMenus}>
      <Head>
        <title>Our Services  | Burloak Technologies</title>
        <meta
          name="description"
        />
      </Head>
      <h1 className="mb-10 text-3xl font-black">INTRODUCING YOU TO A WHOLE NEW WORLD OF POSSIBILITIES.</h1>
      <div className="grid grid-cols-3">
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="m-12">
              <NodeBTServicesTeaser node={node}/>
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
): Promise<GetStaticPropsResult<BtServiceProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--burloak_technologies_services",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--burloak_technologies_services]":
          "field_service_name,path,field_service_description,uid,field_service_thumbnail",
        include: "field_service_thumbnail,uid",
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
