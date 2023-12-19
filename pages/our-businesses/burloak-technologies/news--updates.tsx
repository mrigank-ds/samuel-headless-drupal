import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { NodeBTNewsTeaser } from "components/burloak-technologies/listing-pages/news--listing-page";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";

interface BtNewsProps {
  nodes: DrupalNode[];
  mainMenu : any;
  footerMenus : any;
}

export default function BtNewsPage({ nodes,mainMenu, footerMenus}: BtNewsProps) {
  return (
    <BtLayout menus={mainMenu} footerMenus={footerMenus}>
      <Head>
        <title>News & Insghts | Burloak Technologies</title>
        <meta
          name="description"
        />
      </Head>
      <h1 className="mb-10 text-3xl font-black">NEWS & INSIGHTS</h1>
      <div>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="m-12 flex flex-row">
              <NodeBTNewsTeaser node={node}/>
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
): Promise<GetStaticPropsResult<BtNewsProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--news_insights",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--news_insights]":
          "field_news_title,field_news_published_date,field_news_body,uid,field_news_thumbnail_image,field_published_date,path",
        include: "field_news_thumbnail_image,uid",
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
