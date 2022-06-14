// description is optional here
const Title = ({
  title,
  description = null,
  color = "text-black",
  fontSize = "text-4xl",
}) => {
  return (
    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
      <h2
        className={`text-3xl font-bold  tracking-tight sm:${fontSize} ${color}`}
      >
        {title}
      </h2>
      {description !== null && (
        <p className="text-xl text-gray-300">{description}</p>
      )}
    </div>
  );
};
export default Title;
