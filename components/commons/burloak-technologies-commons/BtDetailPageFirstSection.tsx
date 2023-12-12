import Image from "next/image";
/**
 * DetailPageHeaderPart - It is suitated just below the header in the Detail page.
 * @param title -  Title of the node
 * @param video - Video of the node
 * @param description - Description of the node
 * @returns - Header part consisting of image, name, and description of the detail page.
 */

type BtDetailPageFirstSectionProps = {
  title?: string;
  video?: any;
  description?: string;
  subTitle?: string;
};
export default function BtDetailPageFirstSection({
  title,
  subTitle,
  video,
  description,
}: BtDetailPageFirstSectionProps) {
  return (
    <>
      <div className="mainDetailPageDiv flex flex-row">
        <div className="w-2/5">
          <h1 className="text-semibold text-2xl">{title}</h1>
          {subTitle && <h1 className="text-semibold text-2xl">{subTitle}</h1>}
        </div>
        <div className="w-3/5">
          {video && (
            <video controls autoPlay loop muted>
              <source
                src={`http://localhost${video.uri.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      {description && (
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </>
  );
}
