import Image from "next/image";
import { DrupalNode } from "next-drupal";
import CallToAction from "./commons/CallToAction";
import DetailPageHeaderPart from "./commons/DetailPageHeaderPart";

interface NodeServiceProps {
  node: DrupalNode;
}

export function NodeService({ node }: NodeServiceProps) {
  const description = node.body.processed;
  return (
    <>
      {/* Header part - Title, Image and Description starts from here */}
      <DetailPageHeaderPart title={node.title} image={node.field_service_image} description={description}/>
      {/* Header part - Title, Image and Description ends here */}
      {/* Call to Action Section */}
      <CallToAction node={node} />
    </>
  );
}
