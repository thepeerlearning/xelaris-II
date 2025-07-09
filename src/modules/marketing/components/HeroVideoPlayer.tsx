const HeroVideoPlayer = ({ src }: { src: string }) => {
  return (
    <div className="lg:w-1/2 w-full lg:absolute lg:left-1/2 h-[368px] lg:h-full  overflow-hidden bg-gray-800 ">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover "
        src={src}
      />
    </div>
  );
};

export default HeroVideoPlayer;
