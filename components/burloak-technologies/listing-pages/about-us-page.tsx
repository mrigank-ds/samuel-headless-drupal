import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "../../commons/wordLimit";
import BtDetailPageFirstSection from "../commons/BtDetailPageFirstSection";
import CallToAction from "components/commons/CallToAction";

interface NodeBTAboutUsProps {
  node: DrupalNode;
}

export function AboutUsPage({ node }: NodeBTAboutUsProps) {
  console.log(node, "About Us Page");
  const aboutUsHeading = node.field_about_us_heading
    ? node.field_about_us_heading
    : null;
  const aboutUsSubHeading = node.field_about_us_subheading
    ? node.field_about_us_subheading
    : null;
  const aboutUsVideo = node.field_about_us_video
    ? node.field_about_us_video.field_media_video_file
    : null;
  const aboutUsDescription = node.field_about_us_description ? node.field_about_us_description.value : null;
  return (
    <>
      <BtDetailPageFirstSection
        title={aboutUsHeading}
        subTitle={aboutUsSubHeading}
        description={aboutUsDescription}
        video={aboutUsVideo}
      />
      {/* Service Paragraph section */}
      {node.field_about_us_service_paragraph && (
        <div className="m-5">
          {node.field_about_us_service_paragraph.map(
            (data: any, index: number) => {
              return (
                <>
                  <div className="flex flex-row">
                    {data.field_service_image && (
                      <>
                        <div className="service-paragraph-image m-5">
                          <Image
                            src={`http://localhost/${data.field_service_image.uri.url}`}
                            width={
                              data.field_service_image.resourceIdObjMeta.width
                            }
                            height={
                              data.field_service_image.resourceIdObjMeta.height
                            }
                            alt={`${data.field_title}`}
                          />
                        </div>
                        <div className="service-paragraph-data m-5">
                          {data.field_title && (
                            <h2 className="text-3xl font-bold m-3">
                              {node.field_am_short_description && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      node.field_am_short_description.value,
                                  }}
                                />
                              )}
                              {data.field_title}
                            </h2>
                          )}
                          {data.field_service_specifications && (
                            <div
                              className="m-3"
                              dangerouslySetInnerHTML={{
                                __html: data.field_service_specifications.value,
                              }}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
            }
          )}
        </div>
      )}
      {/* Service Paragraph section */}
      {/* Related Burloak Technology Services section */}
      {node.field_services_heading && (
        <h2 className="text-2xl font-bold mb-7">
          {node.field_services_heading}
        </h2>
      )}
      {node.field_related_services && (
        <div className="flex flex-row">
          {node.field_related_services.map((data: any, index: number) => {
            const shortServiceDescription = data.field_service_description
              ? limitDescription(data.field_service_description.value, 20)
              : null;
            return (
              <div key={index}>
                <Image
                  src={`http://localhost/${data.field_service_thumbnail.uri.url}`}
                  width={400}
                  height={400}
                  alt={`${data.field_service_name}`}
                />
                <h2 className="text-[20px] font-bold">
                  {data.field_service_name}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: shortServiceDescription,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      {/* Related Burloak Technology Services section */}
      {/* Join our mailing list section */}
      {node.field_join_mailing_list && (
        <Link href={node.field_join_mailing_list.uri}>
          <h2 className="text-[20px] font-semibold text-center mt-10 mb-10">
            {node.field_join_mailing_list.title}
          </h2>
        </Link>
      )}
      {/* Join our mailing list section */}
      {/* AM operations section */}
      {node.field_am_operation_heading && (
        <h2 className="text-2xl font-bold">
          {node.field_am_operation_heading}
        </h2>
      )}
      {node.field_am_short_description && (
        <div
          className="m-2"
          dangerouslySetInnerHTML={{ __html: node.field_am_short_description }}
        />
      )}
      <div className="flex flex-row">
        <Image
          src={`http://localhost/${node.field_am_operation_image.uri.url}`}
          width={400}
          height={400}
          alt={`${node.field_am_operation_heading}`}
        />
        {node.field_am_operation_description && <div className="m-7" dangerouslySetInnerHTML={{__html : node.field_am_operation_description.value}}/>}
        
      </div>
      {/* AM operations section */}
      {/* About us certificate section */}
        {node.field_certificate_heading && <h2 className="text-2xl font-bold mt-7">{node.field_certificate_heading}</h2>}
        {node.field_certificate_description && <div dangerouslySetInnerHTML={{__html: node.field_certificate_description.value}}/>}
        {node.field_certificates && (
            <div className="grid grid-cols-3">
            {node.field_certificates.map((value: any, index: number) => {
                return (
                  <div key={index} className="m-12">
                    {value.field_certificate_icon && (
                      <Image
                        src={`http://localhost${value.field_certificate_icon.uri.url}`}
                        height={
                          value.field_certificate_icon.resourceIdObjMeta.height
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
            })}
            </div>
        )}
      {/* About us certificate section */}
      <CallToAction node={node} />
    </>
  );
}
