import Editor from "../Quill";

const Article = () => {
  return (
    <div className="ml-80">
      <h1 className="text-3xl p-12">Bài 1</h1>
      <form className="p-12">
        <div>Title</div>
        <input className="border rounded" type={"text"}></input>
      </form>
      <div className="px-12">
        <Editor />
      </div>
    </div>
  );
};

export default Article;
