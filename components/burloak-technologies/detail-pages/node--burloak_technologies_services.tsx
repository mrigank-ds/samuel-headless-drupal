import Image from "next/image";
import { DrupalNode } from "next-drupal";
import CallToAction from "../../commons/CallToAction";
import BtDetailPageFirstSection from "../commons/BtDetailPageFirstSection";
import Link from "next/link";
interface NodeBTServiceProps {
  node: DrupalNode;
}

export function NodeBTService({ node }: NodeBTServiceProps) {
  
  return (
    <>
      <BtDetailPageFirstSection
        title={node.title}
        subTitle={node.field_services_sub_title}
        description={node.field_service_description.value}
        video={node.field_service_video.field_media_video_file}
      />
      {/* Advantage Paragraph - Cards code starts here */}
      {node.field_advantages && (
        <div className="grid grid-cols-4">
          {node.field_advantages.map((value: any, index: number) => {
            const advantageDescription = value.field_text ? value.field_text.value : null ;
            return (
              <div key={index} className="m-12">
                {value.field_icon && (
                  <Image
                    src={`http://localhost${value.field_icon.uri.url}`}
                    height={value.field_icon.resourceIdObjMeta.height}
                    width={value.field_icon.resourceIdObjMeta.width}
                    alt={value.field_advantage_title}
                  ></Image>
                )}
                <h6 className="font-semibold text-xl">
                  {value.field_advantage_title}
                </h6>
                {advantageDescription && (
                  <div
                    dangerouslySetInnerHTML={{ __html: advantageDescription }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Advantage Paragraph - Cards code ends here */}
      {/* Service Paragraph code starts here */}
      {node.field_services_paragraph && (node.field_services_paragraph).map((value:any,index:number)=>{
        return(
            <div key={index}>
                <h3 className="text-4xl font-bold mb-10">{value.field_title}</h3>
                {value.field_short_description && <div dangerouslySetInnerHTML={{ __html: value.field_short_description.value }}/>}
                <div className="flex flex-row">
                    <div className="image m-12">
                        <Image
                            src={`http://localhost${value.field_service_image.uri.url}`}
                            height={value.field_service_image.resourceIdObjMeta.height}
                            width={value.field_service_image.resourceIdObjMeta.width}
                            alt={value.field_title}
                        ></Image>
                    </div>
                    <div className="specification m-12">
                       {value.field_service_specifications && <div dangerouslySetInnerHTML={{ __html: value.field_service_specifications.value }}/>} 
                    </div>
                </div>
            </div>
        )
      })}
      {/* Service Paragraph code ends here */}
      {/* field_second_description Code for second description */}
        {node.field_second_description && <div dangerouslySetInnerHTML={{ __html: node.field_second_description.value }}/>}
      {/* Code for second description */}
      {/* Code for Certifications - Paragraph */}
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
      {/* Code for Certifications - Paragraph */}
      <CallToAction node={node} />
    </>
  );
}
