import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { NodeProductsTeaser } from "components/node--products--teaser";
import { NodeServicesTeaser } from "components/node--services--teaser";
import { drupal } from "lib/drupal";
import { Layout } from "components/layout";


interface IndexPageProps {
  productNodes: DrupalNode[];
  serviceNodes: DrupalNode[];
  mainMenu : any;
}


export default function MarketSolutionPage({ productNodes,mainMenu,serviceNodes }: IndexPageProps) {
 
  return (
    <Layout menus={mainMenu}>
      <Head>
        <title>Samuel | Products & Services</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <h1 className="mb-10 text-6xl font-black">Product & Services</h1>
      {/* Product Listing Starts from here */}
      <div>
        <h2 className="text-bold text-4xl text-red-500">Explore</h2>
        <h2 className="text-bold text-4xl text-black-500">Our Products</h2>
        {productNodes?.length ? (
          productNodes.map((node) => (
            <div key={node.id} className="margin-auto">
              <NodeProductsTeaser node={node}/>
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
      {/* Service Listing Starts from here */}
      <div>
        <h2 className="text-bold text-4xl text-red-500">Explore</h2>
        <h2 className="text-bold text-4xl text-black-500">Our Services</h2>
        {serviceNodes?.length ? (
          serviceNodes.map((node) => (
            <div key={node.id} className="margin-auto flex flex-row">
              <NodeServicesTeaser node={node}/>
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
  const productNodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--products",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--products]":
          "title,path,field_product_image,uid,body",
        include: "field_product_image,uid",
        sort: "-created",
      },  
      
    }
  );
  const serviceNodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--services",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--services]":
          "title,path,field_service_image,uid,body",
        include: "field_service_image,uid",
        sort: "-created",
      },
    }
  );

  return {
    props: {
      productNodes,
      serviceNodes,
      mainMenu
    },
  };
}
