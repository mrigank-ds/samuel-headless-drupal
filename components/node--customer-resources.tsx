import { DrupalNode } from "next-drupal";
import DetailPageHeaderPart from "./commons/DetailPageHeaderPart";
import CallToAction from "./commons/CallToAction";

interface NodeCustomerResourcesProps {
  node: DrupalNode;
  paragraphData: any;
}

export function NodeCustomerResources({
  node,
  paragraphData,
}: NodeCustomerResourcesProps) {
  // Child Paragraph - Starts from here
  /**
   * childParagraph function returns paragraphs that are inside a paragraph by matching the parent id.
   * @param parentId - type : string - Contains the parent paragraph id for matching
   * @returns Paragraphs
   */
  const childParagraph: any = (parentId: any) =>
    paragraphData &&
    paragraphData.map((value: any, index: number) => {
      return (
        <>
          {parentId.toString() === value.parent_id ? (
            <>
              <p className="font-semibold">{value.field_state_name}</p>
              {value.field_state_data && (
                <div
                  className="mt-5 mb-5"
                  dangerouslySetInnerHTML={{
                    __html: value.field_state_data.processed,
                  }}
                />
              )}
            </>
          ) : null}
        </>
      );
    });
  // Child Paragraph - Ends here

  return (
    <>
      <DetailPageHeaderPart
        image={node.field_resource_image}
        title={node.title}
        description={node.field_resource_description.processed}
      />
      <div className="customer-resource-data">
        {node.field_resource &&
          node.field_resource.map((value: any, index: number) => {
            const drupalInternalId = value.drupal_internal__id
              ? value.drupal_internal__id
              : null;
            return (
              <>
                <div className="parent-paragraph">
                  {value.field_country_name && (
                    <h2 className="font-bold">{value.field_country_name}</h2>
                  )}
                  {value.field_country_short_description && (
                    <p>{value.field_country_short_description}</p>
                  )}
                  <div className="child-paragraph-data">
                    {childParagraph(drupalInternalId)}
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <CallToAction node={node} />
    </>
  );
}
