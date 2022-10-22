import Tag from "./tag";

import {
  authorTypes,
  categoryTypes,
  tagTypes,
  relationType,
} from "../../../Common/Types";

interface Props {
  category: categoryTypes[];
  author: authorTypes[];
  tag: tagTypes[];
  relation: relationType;
  setRelation: React.Dispatch<React.SetStateAction<relationType>>;
}

const ArticleRelation = ({
  category,
  author,
  relation,
  tag,
  setRelation,
}: Props) => {
  return (
    <div className="my-2 cursor-pointer font-medium w-fix">
      <div className="mb-4 text-blue-800">RELATIONS</div>
      <div className="mb-4">
        <label htmlFor="category" className="mr-4 text-blue-800">
          Category<span className="text-red-600"> *</span>
        </label>
        <select
          name="category"
          onChange={(e) =>
            setRelation({ ...relation, category: e.target.value })
          }
          className="border rounded bg-blue-100 border-3 border-blue-800 w-2/5 h-7 align-middle"
          placeholder="Select"
        >
          {category.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="mr-8 text-blue-800">
          Author<span className="text-red-600"> *</span>
        </label>
        <select
          name="author"
          onChange={(e) => setRelation({ ...relation, author: e.target.value })}
          className="border rounded bg-blue-100 border-3 border-blue-800 w-2/5 h-7 align-middle"
          placeholder="Select"
        >
          {author.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
      <Tag tag={tag} relation={relation} setRelation={setRelation} />
    </div>
  );
};

export default ArticleRelation;
