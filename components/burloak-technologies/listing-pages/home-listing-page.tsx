import limitDescription from "components/commons/wordLimit";
import Link from "next/link";
import Image from "next/image";

export default function BtHomePage({ serviceNodes, industryNodes }) {
  
  return (
    <>
      {/* Burloak Technologies Service listing starts from here */}
      {serviceNodes &&  serviceNodes.map((value:any,index:number)=>{
         const serviceDescription = value.field_service_description
         ? limitDescription(value.field_service_description.processed, 20)
         : null;

         return (
           <div className="burloak-technologies-services-lsiting" key={index}>
             {value.field_service_thumbnail && (
               <Link
                 href={`/our-businesses/burloak-technologies/services${value.path.alias}`}
               >
                 <Image
                   src={`http://localhost/${value.field_service_thumbnail.uri.url}`}
                   width={480}
                   height={480}
                   alt={`${value.field_service_name}`}
                 />
               </Link>
             )}
             {value.field_service_name && (
               <Link
                 href={`/our-businesses/burloak-technologies/services${value.path.alias}`}
               >
                 <h2 className="font-semibold text-center">
                   {value.field_service_name}
                 </h2>
               </Link>
             )}
             <Link
               href={`/our-businesses/burloak-technologies/services${value.path.alias}`}
             >
               <div dangerouslySetInnerHTML={{ __html: serviceDescription }} />
             </Link>
           </div>
         );
      })
      }
      {/* Burloak Technologies Service listing ends here */}
      {/* Burloak Technologies Industry listing stars from here */}
      {industryNodes &&
        industryNodes.map((value: any, index: number) => {
          const industryDescription = value.field_industry_description
            ? limitDescription(value.field_industry_description.processed, 20)
            : null;
          return (
            <div
              className="burloak-technologies-industries-listing"
              key={index}
            >
              {value.field_industry_thumbnail_image && (
                <Image
                  src={`http://localhost/${value.field_industry_thumbnail_image.uri.url}`}
                  width={480}
                  height={480}
                  alt={`${value.title}`}
                />
              )}
              {value.title && (
                <h2 className="font-semibold text-center">{value.title}</h2>
              )}
              <div dangerouslySetInnerHTML={{ __html: industryDescription }} />
            </div>
          );
        })}
      {/* Burloak Technologies Industry listing ends here */}
    </>
  );
}
