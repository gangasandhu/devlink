const HomePost = ({ post }) => {
  // This function is to cut the text short when its too long for the home post component
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    }
    return text;
  };
  const maxLength = 140;

  return (
    <div className="px-4 py-3 rounded bg-zinc-100 flex flex-col gap-4 w-96 drop-shadow-md">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <div>
            <h1 className="text-lg font-medium leading-4">{post.username}</h1>
            <h1 className="text-gray-500">{post.email}</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="h-20">{truncateText(post.content, maxLength)}</p>
        </div>
        <p className="text-gray-500">{post.datePublished}</p>
      </div>
    </div>
  );
};

export default HomePost;
