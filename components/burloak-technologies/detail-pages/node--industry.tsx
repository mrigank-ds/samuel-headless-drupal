import { DrupalNode } from "next-drupal";
import BtDetailPageFirstSection from "../commons/BtDetailPageFirstSection";
import Image from "next/image";
import Link from "next/link";
interface NodeBTServiceProps {
    node: DrupalNode;
}
export default function BtIndustryDetailPage({node}:NodeBTServiceProps ){
    const industryVideo = node.field_industry_video ? node.field_industry_video : null;
    const industryImage = node.field_industry_image ? node.field_industry_image : null
 return (
   <div>
     {/* Detail page top Section */}
     <BtDetailPageFirstSection
       title={node.field_industry_heading}
       subTitle={node.field_industry_sub_heading}
       image={industryImage}
       video={industryVideo}
       description={node.field_industry_description.value}
     />
     {/* Detail page top Section */}
     {/* Connect with Team section */}
     {node.field_industry_connect_team && (
       <Link href={node.field_industry_connect_team.uri}>
         {node.field_industry_connect_team.title}
       </Link>
     )}
     {/* Connect with Team section */}
     {/* Advantage Section  */}
     {node.field_industry_advantages &&
       node.field_industry_advantages.map((value: any, index: number) => {
         return (
           <div key={index} className="advantage-paragraph mt-10">
             {value.field_advantage_title && (
               <h2 className="text-3xl font-bold">
                 {value.field_advantage_title}
               </h2>
             )}
             {value.field_icon && (
               <Image
                 src={`http://localhost${value.field_icon.uri.url}`}
                 width={value.field_icon.resourceIdObjMeta.width}
                 height={value.field_icon.resourceIdObjMeta.height}
                 alt={node.title}
               ></Image>
             )}
           </div>
         );
       })}
     {/* Advantage Section  */}
     {/* Difference Section */}
     {node.field_industry_differences && (
       <div
         className="mt-5"
         dangerouslySetInnerHTML={{
           __html: node.field_industry_differences.value,
         }}
       />
     )}
     {/* Difference Section */}
     {/* Enhancement Section */}
     {node.field_enhancements &&
       node.field_enhancements.map((value: any, index: number) => {
         return (
           <div key={index}>
             {value.field_enhancement_title && (
               <h2 className="text-3xl font-bold mt-5 mb-5">
                 {value.field_enhancement_title}
               </h2>
             )}
             {value.field_enhancement_cards &&
               value.field_enhancement_cards.map((data) => {
                 return (
                   <>
                     {data.field_enhancement_card_body && (
                       <div
                         className="mt-5"
                         dangerouslySetInnerHTML={{
                           __html: data.field_enhancement_card_body.value,
                         }}
                       />
                     )}
                   </>
                 );
               })}
             {value.field_enhancement_image && (
               <Image
                 src={`http://localhost${value.field_enhancement_image.uri.url}`}
                 width={value.field_enhancement_image.resourceIdObjMeta.width}
                 height={value.field_enhancement_image.resourceIdObjMeta.height}
                 alt={node.title}
               ></Image>
             )}
           </div>
         );
       })}
     {/* Enhancement Section */}
     {/* Industry related service section */}
     {/* Industry related service section */}
     {/* Industry Certificates sections */}
     <div>
       {node.field_industry_certificate_descr && (
         <div
           className="mt-5"
           dangerouslySetInnerHTML={{
             __html: node.field_industry_certificate_descr.value,
           }}
         />
       )}
     </div>
     {node.field_industry_certificates && (
       <div className="grid grid-cols-3">
         {node.field_industry_certificates.map((value: any, index: number) => {
           return (
             <div key={index} className="m-12">
               {value.field_certificate_icon && (
                 <Image
                   src={`http://localhost${value.field_certificate_icon.uri.url}`}
                   height={
                     value.field_certificate_icon.resourceIdObjMeta.height
                   }
                   width={value.field_certificate_icon.resourceIdObjMeta.width}
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
     {/* Industry Certificates sections */}
     {/* Qualitites Section */}
     {node.field_industry_qualitites &&
       node.field_industry_qualitites.map((data: any, index: number) => {
         return (
           <>
             <div key={index}>
               <h2>
                 {data.field_qualities_title && data.field_qualities_title}
               </h2>
               {data.field_qualities_description && (
                 <div
                   className="mt-5"
                   dangerouslySetInnerHTML={{
                     __html: data.field_qualities_description.value,
                   }}
                 />
               )}
             </div>
             {data.field_qualities_card &&
               data.field_qualities_card.map((cardData: any, index: number) => {
                 return (
                   <>
                     {cardData.field_qualities_icon && (
                       <Image
                         src={`http://localhost${cardData.field_qualities_icon.uri.url}`}
                         width={
                           cardData.field_qualities_icon.resourceIdObjMeta.width
                         }
                         height={
                           cardData.field_qualities_icon.resourceIdObjMeta.width
                         }
                         alt={node.title}
                       ></Image>
                     )}
                   </>
                 );
               })}
           </>
         );
       })}
     {/* Qualities Section */}
   </div>
 );
}