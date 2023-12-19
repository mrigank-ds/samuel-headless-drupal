import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalMenuLinkContent } from "next-drupal";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";
import { AboutUsPage } from "components/burloak-technologies/listing-pages/about-us-page";

interface BtAboutUsProps {
  nodes: DrupalNode[];
  mainMenu : any;
  footerMenus : any;
}

export default function BtAboutUsPage({ nodes,mainMenu, footerMenus}: BtAboutUsProps) {
  return (
    <BtLayout menus={mainMenu} footerMenus={footerMenus}>
      <Head>
        <title>About Us | Burloak Technologies</title>
        <meta
          name="description"
        />
      </Head>
      <div>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id} className="m-12">
               <AboutUsPage node={node}/>
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
): Promise<GetStaticPropsResult<BtAboutUsProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "block_content--burloak_technologies_about_us_bl",
    context,
    {
      params: {
        "fields[block_content--burloak_technologies_about_us_bl]":
          "field_about_us_heading,field_about_us_subheading,field_about_us_video,field_about_us_description,field_about_us_service_paragraph,field_services_heading,field_related_services,field_join_mailing_list,field_am_operation_heading,field_am_short_description,field_am_operation_description,field_am_operation_image,field_certificate_heading,field_certificate_description,field_certificates,field_call_to_action_title,field_call_to_action,field_call_to_action_image",
        include: "field_about_us_video,field_about_us_video.field_media_video_file,field_about_us_service_paragraph,field_about_us_service_paragraph.field_service_image,field_related_services,field_related_services.field_service_thumbnail,field_am_operation_image,field_certificates,field_certificates.field_certificate_icon,field_call_to_action_image",
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
