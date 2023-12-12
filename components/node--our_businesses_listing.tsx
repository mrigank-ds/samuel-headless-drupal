import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import DetailPageHeaderPart from "./commons/DetailPageHeaderPart";
import CallToAction from "./commons/CallToAction";
interface NodeOurBusinessesListingProps {
  node: DrupalNode;
  listingParagraph ?:any ;
}

export function NodeOurBusinessesListingProps({
  node,
  listingParagraph
}: NodeOurBusinessesListingProps) {
    
/**
 * BusinessListing - It shows the list of our Businesses.
 * @returns List of Our Businesses
 */    
    const BusinessListing : any = () =>
        listingParagraph && listingParagraph.map((value:any, index:number)=>{
            return(
                <div key={index} className="businesses mt-5 mb-5">
                    <Link href={value.field_listing_paragraph_slug}>
                        <Image
                          src={`http://localhost/${value.field_listing_paragraph_image.uri.url}`}
                          height={380}
                          width={380}
                          alt={value.field_listing_paragraph_name}
                        >
                        </Image>
                    </Link>
                    <Link href={value.field_listing_paragraph_slug}>
                        <h2 className="font-semibold text-center mt-2 uppercase">{value.field_listing_paragraph_name}</h2>
                    </Link>
                </div>
            )
        })

  return (
    <>
        <DetailPageHeaderPart title={node.title} image={node.field_business_image}/>
        <div className="grid grid-cols-3">
            {BusinessListing()}
        </div>
        <CallToAction node={node}/>
    </>
   );
}
