import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "./commons/wordLimit";

interface NodeCustomerResorcesTeaserProps {
  node: DrupalNode;
}

export function NodeCustomerResourcesTeaser({
  node,
  ...props
}: NodeCustomerResorcesTeaserProps) {
  const description = node.field_resource_description
    ? limitDescription(node.field_resource_description.processed, 20)
    : undefined;


  return (
    <div className="market-solution-cards">
      {node.field_resource_image && (
        <Image
          src={`http://localhost/${node.field_resource_image.uri.url}`}
          width={480}
          height={480}
          alt={`${node.title}`}
        />
      )}

      {node.title && <h2 className="mt-5">{node.title}</h2>}

      {description ? (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      ) : (
        <></>
      )}

      <Link
        href={node.path.alias}
        className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100 mb-10 mt-3"
      >
        EXPLORE  {node.title}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
