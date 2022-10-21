import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface Props {
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Tag({ tag, relation, setRelation }: Props) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof relation.tag>) => {
    const {
      target: { value },
    } = event;
    const tagValue = typeof value === "string" ? value.split(",") : value;
    setRelation({ ...relation, tag: tagValue });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">
          <div className="text-blue-800 font-bold"> Tag</div>
        </InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={relation.tag}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }} className="">
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            className="b-blue-800 b-1"
            MenuProps={MenuProps}
          >
            {tag.map((name) => (
              <MenuItem
                key={name.id}
                value={name.name}
                style={getStyles(name.name, relation.tag, theme)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    </div>
  );
}
