export const PrefetchLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const handleMouseEnter = () => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    link.as = "document";
    document.head.appendChild(link);
  };

  return (
    <a href={href} onMouseEnter={handleMouseEnter}>
      {children}
    </a>
  );
};
