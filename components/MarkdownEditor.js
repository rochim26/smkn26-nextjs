import MarkdownIt from "markdown-it";
// import style manually
import dynamic from "next/dynamic";
import { CLIENT_AXIOS } from "../client/clientAxios";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", text);
// }

export default ({ onChange, value }) => {
  return (
    <MdEditor
      value={value}
      placeholder="Tekan icon keyboard untuk memperbesar layar"
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
      onImageUpload={async (file) => {
        const data = new FormData();
        data.append("file", file);
        const res = await CLIENT_AXIOS.post("/uploads", data);

        return res.data;
      }}
    />
  );
};
