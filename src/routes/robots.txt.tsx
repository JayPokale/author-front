const Robots = () => {
  return (
    <div>
      <p>User-agent: *</p>
      <p>Allow: /*</p>
      <p>Disallow: /api/*</p>
      <p>Sitemap: <a href={`sitemap.xml`}>
        {`${import.meta.env.VITE_MAIN_URI}sitemap.xml`}</a>
      </p>
    </div>
  );
};

export default Robots;
