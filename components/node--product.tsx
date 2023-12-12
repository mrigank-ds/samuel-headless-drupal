import Image from "next/image";
import { DrupalNode } from "next-drupal";
import CallToAction from "./commons/CallToAction";
interface NodeProductProps {
  node: DrupalNode;
  paragraphs: any;
}

export function NodeProduct({ node, paragraphs }: NodeProductProps) {
  // Child Paragraph - Starts from here
  /**
   * childParagraph function returns paragraphs that are inside a paragraph by matching the parent id.
   * @param parentId - type : string - Contains the parent paragraph id for matching
   * @returns Paragraphs
   */
  const childParagraph: any = (parentId: any) =>
    paragraphs &&
    paragraphs.map((value: any, index: number) => {
      return (
        <>
          {parentId.toString() === value.parent_id ? (
            <>
              <p className="font-bold">{value.field_specification_title}</p>
              <p>{value.field_specification_value && value.field_specification_value.value}</p>
            </>
          ) : null}
        </>
      );
    });
  // Child Paragraph - Ends here
  const description = node.body.processed;
  return (
    <>
      {/* Header part - Title, Image and Description starts from here */}

      <div className="mainDetailPageDiv flex flex-row">
        <div className="w-2/5">
          <h1 className="text-semibold text-2xl">{node.title}</h1>
        </div>
        <div className="w-3/5">
          <Image
            src={`http://localhost/${node.field_product_image.uri.url}`}
            width={node.field_product_image.resourceIdObjMeta.width}
            height={node.field_product_image.resourceIdObjMeta.height}
            alt={`${node.title}`}
          ></Image>
          {description && (
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>

      {/* Header part - Title, Image and Description ends here */}

      {/* Product Specification Section starts from here */}

      <div className="product-specifications">
        {node.field_product_specification &&
          node.field_product_specification.map((value: any, index: number) => {
            const drupalInternalId = value.drupal_internal__id
              ? value.drupal_internal__id
              : null; // Contains the unique id
            return (
              <>
                <div className="specification-title">
                  <p className="text-semibold text-2xl">
                    {value.field_section_title}
                  </p>
                </div>
                <div className="specifications">
                  {childParagraph(drupalInternalId)}
                </div>
                <hr className="my-20 darken-3 border-gray-300" />
              </>
            );
          })}
      </div>

      {/* Product Specification section ends here */}
      {/* Call to Action Section */}
      <CallToAction node={node} />
    </>
  );
}
