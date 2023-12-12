import Link from "next/link";
import Image from "next/image";
import { DrupalNode } from "next-drupal";

interface NodeCallToActionProps {
    node: DrupalNode
}
/**
 * CallToAction - It shows the lower 'Call To Action' section
 * @param node - The whole node of any content type 
 * @returns Call to action section - Call to action title, Call to action(button), Call to action Image
 */
function CallToAction({node} : NodeCallToActionProps){
    return(
        <div className="Call-to-action mt-10 flex flex-row">
            <div className="w-1/2">
                <h2>{node.field_call_to_action_title}</h2>
                <Link href={node.field_call_to_action.uri}>
                    {node.field_call_to_action.title}
                </Link>
            </div>
            <div className="w-1/2">
                <Image
                 src={`http://localhost/${node.field_call_to_action_image.uri.url}`}
                 width={node.field_call_to_action_image.resourceIdObjMeta.width}
                 height={node.field_call_to_action_image.resourceIdObjMeta.height}
                 alt={`${node.title}`}>
                </Image>
            </div>
        </div>
    )
}

export default CallToAction;