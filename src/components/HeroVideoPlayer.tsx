const HeroVideoPlayer = ({ src }: { src: string }) => {
  // Function to generate poster from Cloudinary video URL
  const generatePoster = (videoUrl: string) => {
    // Check if it's a Cloudinary URL
    if (
      videoUrl.includes("res.cloudinary.com") &&
      videoUrl.includes("/video/upload/")
    ) {
      // Get auto-best frame as JPG (Cloudinary picks the best frame)
      return videoUrl.replace("/video/upload/", "/video/upload/so_auto,f_jpg/");
    }
    return undefined;
  };

  const poster = generatePoster(src);

  return (
    <div className="lg:w-1/2 w-full lg:absolute lg:left-1/2 h-[368px] lg:h-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="h-full w-full object-cover"
        src={src}
      />
    </div>
  );
};

export default HeroVideoPlayer;
