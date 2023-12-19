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
  image?:any
};
export default function BtDetailPageFirstSection({
  title,
  subTitle,
  video,
  description,
  image
}: BtDetailPageFirstSectionProps) {
  return (
    <>
      <div className="mainDetailPageDiv flex flex-row bg-black text-white">
        <div className="w-2/5 ml-[100px] mt-[280px]">
          <h1 className="text-semibold text-2xl">{title}</h1>
          {subTitle && <h1 className="text-semibold text-2xl">{subTitle}</h1>}
        </div>
        <div className="w-3/5">
          {video ? (
            <video controls autoPlay loop muted>
              <source
                src={`http://localhost${video.uri.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              {image && (
                <Image
                  src={`http://localhost/${image.uri.url}`}
                  width={680}
                  height={480}
                  alt={`${title}`}
                ></Image>
              )}
            </>
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
