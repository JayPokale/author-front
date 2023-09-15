import { client } from "~/utils/client";
import xmlFormat from "xml-formatter";
import { createRouteData, useRouteData } from "solid-start";

export function routeData() {
  return createRouteData(async () =>
    xmlFormat((await client.sitemap.sitemap.query()) as string)
  );
}

function Sitemap() {
  const XML: any = useRouteData();

  return (
    <div>
      <h1>XML Sitemap</h1>
      <pre>{XML()}</pre>
    </div>
  );
}

export default Sitemap;
