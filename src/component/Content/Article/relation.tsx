interface Props {
  category: {
    createAt: string;
    id: string;
    name: string;
    updateAt: string;
    slug: string;
  }[];
  author: {
    createAt: string;
    id: string;
    name: string;
    updateAt: string;
    email: string;
  }[];
  relation: {
    category: string;
    author: string;
  };
  setRelation: React.Dispatch<
    React.SetStateAction<{
      category: string;
      author: string;
    }>
  >;
}

const ArticleRelation = ({
  category,
  author,
  relation,
  setRelation,
}: Props) => {
  return (
    <div className="p-4 uppercase">
      Relation
      <div>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          onChange={(e) =>
            setRelation({ category: e.target.value, author: relation.author })
          }
        >
          <option key={"default"}>Select</option>
          {category.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <select
          name="author"
          onChange={(e) =>
            setRelation({ author: e.target.value, category: relation.category })
          }
        >
          <option key={"default"}>Select</option>
          {author.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ArticleRelation;
