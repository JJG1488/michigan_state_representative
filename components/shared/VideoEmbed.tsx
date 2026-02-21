interface VideoEmbedProps {
  url?: string;
  title?: string;
  className?: string;
}

export default function VideoEmbed({ url, title = 'Campaign video', className = '' }: VideoEmbedProps) {
  if (!url) {
    return null;
  }

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg ${className}`}>
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
        loading="lazy"
      />
    </div>
  );
}
