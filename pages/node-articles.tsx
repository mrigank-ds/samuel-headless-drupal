import { DrupalClient } from "next-drupal"
import { locales } from "site.config";

const drupal = new DrupalClient("http://localhost/New-Headless-Drupal-Website/d-9.5.11/install-dir/web/")

export default function BlogPage({ articles }) {
    console.log(articles,"Articles");
  return (
    <div>
        <h2>Node Articles Page</h2>
    </div>
  )
}

export async function getStaticProps(context) {
  const articles = await drupal.getResourceCollectionFromContext(
    "node--products",
    context,
   
  )

  return {
    props: {
      articles,
    },
  }
}