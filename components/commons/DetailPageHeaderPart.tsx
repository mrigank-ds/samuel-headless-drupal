import Image from "next/image";
/**
 * DetailPageHeaderPart - It is suitated just below the header in the Detail page.
 * @param title -  Title of the node
 * @param image - Image Field of the node
 * @param description - Description of the node
 * @returns - Header part consisting of image, name, and description of the detail page.
 */

type DetailPageHeaderPartProps = {
  title ?: string;
  image ?: any;
  description?: string;
}
export default function DetailPageHeaderPart({title, image,description}:DetailPageHeaderPartProps) {
    return (
      <>
        <div className="mainDetailPageDiv flex flex-row">
          <div className="w-2/5">
            <h1 className="text-semibold text-2xl">{title}</h1>
          </div>
          <div className="w-3/5">
            {image && 
            <Image
              src={`http://localhost/${image.uri.url}`}
              width={image.resourceIdObjMeta.width}
              height={image.resourceIdObjMeta.height}
              alt={`${title}`}
            ></Image>}
            {description && <div className="mt-5" dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
        </div>
      </>
    );
}