const HeroVideoPlayer = ({ src }: { src: string }) => {
  return (
    <div className="lg:w-[50%] h-[368px] lg:h-[680px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        src={src}
      />
    </div>
  );
};

export default HeroVideoPlayer;
