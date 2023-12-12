import Image from "next/image";
import { DrupalNode } from "next-drupal";
import CallToAction from "./commons/CallToAction";
import DetailPageHeaderPart from "./commons/DetailPageHeaderPart";
interface NodeArticleProps {
  node: DrupalNode
}

export function NodeMarketSolution({ node, ...props }: NodeArticleProps) {
  return ( 
    <>
        <DetailPageHeaderPart title={node.title} image={node.field_market_solution_image} description={node.field_market_solution_descriptio.processed}/>
        <CallToAction node={node}/>
    </>
   )
}
