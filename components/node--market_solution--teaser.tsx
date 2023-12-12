import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "./commons/wordLimit";

interface NodeMarketSolutionTeaserProps {
  node: DrupalNode;
}

export function NodeMarketSolutionTeaser({
  node,
  ...props
}: NodeMarketSolutionTeaserProps) {
  const description = node.field_market_solution_descriptio
    ? limitDescription(node.field_market_solution_descriptio.processed, 20)
    : null;

  return (
    <div className="market-solution-cards">
      <Link href={node.path.alias}>
        {node.field_market_solution_image && (
          <Image
            src={`http://localhost/${node.field_market_solution_image.uri.url}`}
            width={480}
            height={480}
            alt={`${node.title}`}
          />
        )}
      </Link>
      <Link href={node.path.alias}>{node.title && <h2>{node.title}</h2>}</Link>
      <Link href={node.path.alias}>
        {description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
}
