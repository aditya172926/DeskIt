import { invoke } from "@tauri-apps/api/tauri";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import { useEffect, useState } from "react";
import { CodeSnippet, Gist } from "../../types";

interface Props {
  gist: Gist;
}

const GistDetails = ({ gist }: Props) => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippets]);

  useEffect(() => {
    const getSnippets = async () => {
      setIsLoading(true);
      const snippets: CodeSnippet[] = await Promise.all(
        Object.values(gist.files).map(async (file) => ({
          language: file.language?.toLowerCase() || "text",
          content: await invoke("get_gist_content", { url: file.raw_url }),
        }))
      );
      setSnippets(snippets);
      setIsLoading(false);
    };
    getSnippets();
  }, [gist]);

  return (
    <>
    <><p>Gist details</p></>
      {/* <Spin tip="Loading" spinning={isLoading}>
        <Row justify="center">
          <Col>
            {gist.description && (
              <Typography.Text strong>{gist.description}</Typography.Text>
            )}
          </Col>
        </Row>
        <div>
            <Carousel autoplay style={{backgroundColor: "#272822", height: "100%"}}>
                {snippets.map((snippet, index) => (
                    <pre key={index}>
                        <code className={`language-${snippet.language}`}>
                            {snippet.content}
                        </code>
                    </pre>
                ))}
            </Carousel>
        </div>
      </Spin> */}
    </>
  );
};

export default GistDetails;