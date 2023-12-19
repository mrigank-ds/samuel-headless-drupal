import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "../../commons/wordLimit";

interface NodeBtIndustriesProps {
  node: DrupalNode;
}

export function NodeBtIndustriesTeaser({
  node,
  ...props
}: NodeBtIndustriesProps) {
   const description = node.field_industry_description
    ? limitDescription(node.field_industry_description.processed, 20)
    : null;
  return (
    <div className="burloak-technologies-industries">
      {node.field_industry_thumbnail_image && (
        <Link
          href={`/our-businesses/burloak-technologies/industries${node.path.alias}`}
        >
          <Image
            src={`http://localhost/${node.field_industry_thumbnail_image.uri.url}`}
            width={480}
            height={480}
            alt={`${node.title}`}
          />
        </Link>
      )}
      {node.title && (
        <Link
          href={`/our-businesses/burloak-technologies/industries${node.path.alias}`}
        >
          <h2 className="font-semibold text-center">{node.title}</h2>
        </Link>
      )}
      {description && (
        <Link
          href={`/our-businesses/burloak-technologies/industries${node.path.alias}`}
        >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Link>
      )}
    </div>
  );
}
