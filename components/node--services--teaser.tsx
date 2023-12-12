import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "./commons/wordLimit";

interface NodeServicesTeaserProps {
  node: DrupalNode;
}

export function NodeServicesTeaser({
  node,
  ...props
}: NodeServicesTeaserProps) {
  const description = node.body.value
    ? limitDescription(node.body.value, 20)
    : null;
  return (
    <div className="Service-Listing mt-10 mb-10 w-1/3">
      <Link href={node.path.alias}>
        <Image
          src={`http://localhost/${node.field_service_image.uri.url}`}
          width={300}
          height={500}
          alt={`${node.title}`}
        ></Image>
      </Link>
      <Link href={node.path.alias}>
        <h3 className="text-bold text-3xl">{node.title}</h3>
      </Link>
      <Link href={node.path.alias}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Link>
    </div>
  );
}
