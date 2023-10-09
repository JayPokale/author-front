import { A } from "solid-start";

const Robots = () => {
  return (
    <div>
      <p>User-agent: *</p>
      <p>Allow: /*</p>
      <p>Disallow: /api/*</p>
      <p>Sitemap: <A href="/sitemap.xml">{`${import.meta.env.VITE_MAIN_URI}sitemap.xml`}</A>
      </p>
    </div>
  );
};

export default Robots;
