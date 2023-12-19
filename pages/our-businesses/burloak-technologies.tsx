import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { BtLayout } from "components/burloak-technologies/commons/BtLayout";
import Link from "next/link";
import Image from "next/image";
import limitDescription from "components/commons/wordLimit";
import BtDetailPageFirstSection from "components/burloak-technologies/commons/BtDetailPageFirstSection";
interface IndexPageBurloakTechnologiesProps {
  servicesView: any
  mainMenu : any;
  footerMenus:any;
  firstSection:any;
  videoSection:any;
  industriesListingSection:any;
  certificatesSection:any;
}

export default function IndexPageBurloakTechnologies({ servicesView,mainMenu,footerMenus,firstSection,videoSection,industriesListingSection,certificatesSection }: IndexPageBurloakTechnologiesProps) {
  console.log(industriesListingSection,"certificatesSection");
  return (
    <BtLayout menus={mainMenu} footerMenus={footerMenus}>
      <Head>
        <title>Burloak Technologies</title>
        <meta
          name="description"
          content="Burloak Technologies is Canada&#x2019;s leading supplier of highly-engineered additive manufactured components for demanding applications."
        />
      </Head>
      {/* Home Page First Section  */}
      {firstSection && (
        <div className="mb-10">
          <BtDetailPageFirstSection
            title={firstSection.field_title}
            description={firstSection.body.value}
            video={firstSection.field_video.field_media_video_file}
          />
        </div>
      )}
      {/* Home page First Section */}
      {/* Home page service listing section */}
      <div className="home-page-service-listing">
        <h2 className="text-3xl font-bold">
          DRIVING COMPETITIVE ADVANTAGE THROUGH VERTICALLY INTEGRATED AM
          SOLUTIONS.
        </h2>
        <p className="mt-5 mb-5">
          From application and process design to component printing at scale, to
          post processing solutions – Burloak Technologies provides a seamless,
          customized, highly efficient, and eco-friendly solution for every
          customer, every component, and every market.
        </p>
        <div className="grid grid-cols-3">
          {servicesView &&
            servicesView.results.map((data: any, index: number) => {
              const serviceDescription = data.field_service_description
                ? limitDescription(data.field_service_description.processed, 20)
                : null;
              return (
                <div
                  className="burloak-technologies-services-lsiting m-12"
                  key={index}
                >
                  {data.field_service_thumbnail && (
                    <Link
                      href={`/our-businesses/burloak-technologies/services${data.path.alias}`}
                    >
                      <Image
                        src={`http://localhost/${data.field_service_thumbnail.uri.url}`}
                        width={480}
                        height={480}
                        alt={`${data.field_service_name}`}
                      />
                    </Link>
                  )}
                  {data.field_service_name && (
                    <Link
                      href={`/our-businesses/burloak-technologies/services${data.path.alias}`}
                    >
                      <h2 className="font-semibold text-center">
                        {data.field_service_name}
                      </h2>
                    </Link>
                  )}
                  <Link
                    href={`/our-businesses/burloak-technologies/services${data.path.alias}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: serviceDescription }}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      {/* Home page service listing section */}
      {/* Video Section of Home Page */}
      {videoSection && (
        <>
          {videoSection.field_videos_title && (
            <h2 className="text-3xl font-bold">
              {videoSection.field_videos_title}
            </h2>
          )}
          <div className="video-section-home-page flex flex-row">
            {videoSection.field_home_page_video.field_media_video_file && (
              <>
                <div className="w-1/2 m-5">
                  <video controls autoPlay loop muted>
                    <source
                      src={`http://localhost${videoSection.field_home_page_video.field_media_video_file.uri.url}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            )}
            {videoSection.field_video_description && (
              <div
                className="mt-5 w-1/2"
                dangerouslySetInnerHTML={{
                  __html: videoSection.field_video_description.value,
                }}
              />
            )}
          </div>
        </>
      )}
      {/* Video Section of Home Page */}
      {/* Industries Listing Section Home Page */}
      {industriesListingSection && (
        <div className="industries-listing-home-page">
          {industriesListingSection.field_industry_section_title && (
            <h2 className="mt-5 font-bold text-3xl">
              {industriesListingSection.field_industry_section_title}
            </h2>
          )}
          {industriesListingSection.field_industry_description && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  industriesListingSection.field_industry_description.value,
              }}
            />
          )}
          {industriesListingSection.field_related_industries && (
            <div className="grid grid-cols-3 gap-4">
              {industriesListingSection.field_related_industries.map(
                (data: any, index: number) => {
                  const indutryDescription = data.field_industry_description
                    ? limitDescription(
                        data.field_industry_description.processed,
                        20
                      )
                    : null;
                  return (
                    <div key={index} className="industries">
                      {data.field_industry_thumbnail_image && (
                        <Link
                          href={`/our-businesses/burloak-technologies/industries${data.path.alias}`}
                        >
                          <Image
                            src={`http://localhost/${data.field_industry_thumbnail_image.uri.url}`}
                            width={
                              data.field_industry_thumbnail_image
                                .resourceIdObjMeta.width
                            }
                            height={
                              data.field_industry_thumbnail_image
                                .resourceIdObjMeta.height
                            }
                            alt={`${data.title}`}
                          ></Image>
                        </Link>
                      )}
                      {data.title && (
                        <Link
                          href={`/our-businesses/burloak-technologies/industries${data.path.alias}`}
                        >
                          <h2 className="font-bold text-[20px] text-center">
                            {data.title}
                          </h2>
                        </Link>
                      )}
                      {indutryDescription && (
                        <Link
                          href={`/our-businesses/burloak-technologies/industries${data.path.alias}`}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: indutryDescription,
                            }}
                          />
                        </Link>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
      {/* Industries Listing Section Home Page */}
      {/* Certificate Listing Section - Home Page */}
      {certificatesSection && (
        <div className="certificate-listing-home-page">
          {certificatesSection.field_certificate_heading && (
            <h2 className="mt-10 text-2xl font-bold">
              {certificatesSection.field_certificate_heading}
            </h2>
          )}
          {certificatesSection.field_certificate_description && (
            <div
              dangerouslySetInnerHTML={{
                __html: certificatesSection.field_certificate_description.value,
              }}
            />
          )}
          {certificatesSection.field_certificates && (
            <div className="grid grid-cols-3">
              {certificatesSection.field_certificates.map(
                (value: any, index: number) => {
                  return (
                    <div key={index} className="m-12">
                      {value.field_certificate_icon && (
                        <Image
                          src={`http://localhost${value.field_certificate_icon.uri.url}`}
                          height={
                            value.field_certificate_icon.resourceIdObjMeta
                              .height
                          }
                          width={
                            value.field_certificate_icon.resourceIdObjMeta.width
                          }
                          alt={value.field_certificate_title}
                        ></Image>
                      )}
                      <h6 className="font-semibold text-xl text-center">
                        {value.field_certificate_title}
                      </h6>
                      {value.field_certificate_download && (
                        <Link href={value.field_certificate_download.uri}>
                          <p className="text-center">
                            {value.field_certificate_download.title}
                          </p>
                        </Link>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
      {/* Certificate Listing Section - Home Page */}
    </BtLayout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageBurloakTechnologiesProps>> {
  const mainMenu = await drupal.getMenu('burloak-technologies');
  const footerMenus = await drupal.getMenu('burloak-technologies-footer');

  const servicesView = await drupal.getView<DrupalNode>(
    "burloak_technologies_home_page_service_listing--block_1",
    {
      params: {
        include: "uid,field_service_thumbnail",
      },
    }
  );

  // Block for First Section of Home page
  const firstSection = await drupal.getResource(
    "block_content--burloak_technologies_home_page_f",
    "51b2606b-1cfb-42a5-8912-83c550bcf9dc",
    {
      params: {
        include: "field_video,field_video.field_media_video_file",
      },
    }
  );
  // Block for the Video Section of Home Page
  const videoSection = await drupal.getResource(
    "block_content--bt_home_page_video_section",
    "6d84ba7e-c5cb-4e80-a821-cace65d6febe",
    {
      params: {
        include: "field_home_page_video,field_home_page_video.field_media_video_file",
      },
    }
  );
 // Block for the Industries Listing Section 
  const industriesListingSection = await drupal.getResource(
    "block_content--bt_home_page_industries_listing",
    "f87608ce-7ba4-47e0-8ea0-a9c3b2782714",
    {
      params: {
        include: "field_related_industries,field_related_industries.field_industry_thumbnail_image",
      },
    }
  );
// Block for the Certificate Listing Section
  const certificatesSection = await drupal.getResource(
    "block_content--certificate_section_bt_home_page",
    "e65d8ed7-65c2-4094-9f56-3d7115107ef3",
    {
      params: {
        include: "field_certificates,field_certificates.field_certificate_icon",
      },
    }
  );

  return {
    props: {
      mainMenu,
      footerMenus,
      servicesView,
      firstSection,
      videoSection,
      industriesListingSection,
      certificatesSection
    },
  };
}
