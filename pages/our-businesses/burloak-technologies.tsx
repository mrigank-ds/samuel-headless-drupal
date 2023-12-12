import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";

import { drupal } from "lib/drupal";
import { BtLayout } from "components/commons/burloak-technologies-commons/BtLayout";
import { NodeCustomerResourcesTeaser } from "components/node--customer-resources--teaser";
import siteConfig from "site.config";

interface IndexPageBurloakTechnologiesProps {
  nodes: DrupalNode[];
  mainMenu : any;
}

export default function IndexPageBurloakTechnologies({ nodes,mainMenu }: IndexPageBurloakTechnologiesProps) {
  return (
    <BtLayout menus={mainMenu}>
      <Head>
        <title>Burloak Technologies</title>
        <meta
          name="description"
          content="Burloak Technologies is Canada&#x2019;s leading supplier of highly-engineered additive manufactured components for demanding applications."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Burloak Technologies</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="margin-auto">
              <NodeCustomerResourcesTeaser node={node} />
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
): Promise<GetStaticPropsResult<IndexPageBurloakTechnologiesProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--burloak_technologies_services",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--burloak_technologies_services]":
          "field_service_name,path,field_service_description,uid,field_service_thumbnail",
        include: "field_service_thumbnail,uid",
        sort: "-created",
      },
    }
  );

  return {
    props: {
      nodes,
      mainMenu
    },
  };
}
