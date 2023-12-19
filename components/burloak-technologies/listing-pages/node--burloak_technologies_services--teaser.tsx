import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "../../commons/wordLimit";

interface NodeBTServicesProps {
  node: DrupalNode;
}

export function NodeBTServicesTeaser({
  node,
  ...props
}: NodeBTServicesProps) {
    
  const description = node.field_service_description
    ? limitDescription(node.field_service_description.processed, 20)
    : null;
    
  return (
    <div className="burloak-technologies-services">
        {node.field_service_thumbnail && (
        <Link href={`/our-businesses/burloak-technologies/services${node.path.alias}`}>
        <Image
          src={`http://localhost/${node.field_service_thumbnail.uri.url}`}
          width={480}
          height={480}
          alt={`${node.field_service_name}`}
        />
        </Link>
      )}
        {node.field_service_name && <Link href={`/our-businesses/burloak-technologies/services${node.path.alias}`}><h2 className="font-semibold text-center">{node.field_service_name}</h2></Link>}
        <Link href={`/our-businesses/burloak-technologies/services${node.path.alias}`}><div dangerouslySetInnerHTML={{ __html: description }} /></Link>
    </div>
  );
}
