import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import limitDescription from "../../commons/wordLimit";

interface NodeBTNewsProps {
  node: DrupalNode;
}

export function NodeBTNewsTeaser({ node, ...props }: NodeBTNewsProps) {

  const description = node.field_news_body
    ? limitDescription(node.field_news_body.value, 20)
    : null;

  return (
    <>
      {node.field_news_thumbnail_image && (
        <div className="news-image mr-10">
          <Link href={`/our-businesses/burloak-technologies/news--updates/${node.path.alias}`}>
            <Image
              src={`http://localhost/${node.field_news_thumbnail_image.uri.url}`}
              width={320}
              height={320}
              alt={`${node.field_news_title}`}
            />
          </Link>
        </div>
      )}
      {node && (
        <div className="news-content">
          {node.field_news_title && (
            <Link href={`/our-businesses/burloak-technologies/news--updates/${node.path.alias}`}>
              <h2 className="text-3xl font-bold">{node.field_news_title}</h2>
            </Link>
          )}
          {node.field_published_date && (
            <Link href={`/our-businesses/burloak-technologies/news--updates/${node.path.alias}`}>
              <p>{node.field_published_date}</p>
            </Link>
          )}
          {description && (
            <Link href={`/our-businesses/burloak-technologies/news--updates/${node.path.alias}`}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Link>
          )}
        </div>
      )}
    </>
  );
}
