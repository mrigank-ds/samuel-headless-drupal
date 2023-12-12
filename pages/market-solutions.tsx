import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";

import { drupal } from "lib/drupal";
import { Layout } from "components/layout";
import { NodeMarketSolutionTeaser } from "components/node--market_solution--teaser";
import siteConfig from "site.config";

interface IndexPageProps {
  nodes: DrupalNode[];
  mainMenu : any;
}

export default function MarketSolutionPage({ nodes,mainMenu }: IndexPageProps) {
  return (
    <Layout menus={mainMenu}>
      <Head>
        <title>Samuel | Market Solution</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Market Soution</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="margin-auto">
              <NodeMarketSolutionTeaser node={node} />
              {/* <hr className="my-20" /> */}
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
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const mainMenu = await drupal.getMenu('main');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--market_solution",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--market_solution]":
          "title,path,field_market_solution_image,uid,field_market_solution_descriptio",
        include: "field_market_solution_image,uid",
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
