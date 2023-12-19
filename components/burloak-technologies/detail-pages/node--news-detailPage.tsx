export default function BtNewsDetailPage({resources}){
    return (
      <>
        {resources.field_news_title && (
          <h2 className="text-3xl font-bold">{resources.field_news_title}</h2>
        )}
        <hr className="border-t-2 border-white-600 mt-7 mb-7" />
        {resources.field_published_date && (
          <p className="mb-5">{resources.field_published_date}</p>
        )}
        {resources.field_news_body && (
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{
              __html: resources.field_news_body.value,
            }}
          />
        )}
      </>
    );
}