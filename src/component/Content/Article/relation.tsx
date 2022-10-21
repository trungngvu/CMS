import Tag from "./tag";

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
  tag: {
    createAt: string;
    id: string;
    name: string;
    updateAt: string;
  }[];
  relation: {
    category: string;
    author: string;
    tag: string[];
  };
  setRelation: React.Dispatch<
    React.SetStateAction<{
      category: string;
      author: string;
      tag: string[];
    }>
  >;
}

const ArticleRelation = ({
  category,
  author,
  relation,
  tag,
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
            setRelation({...relation, category: e.target.value,})
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
            setRelation({...relation, author: e.target.value, })
          }
        >
          <option key={"default"}>Select</option>
          {author.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
      <Tag tag={tag} relation={relation} setRelation={setRelation}/>
    </div>
  );
};

export default ArticleRelation;
