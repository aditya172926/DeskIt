import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { Commit, GithubUser, Nullable, Repository } from "../../types";
import GithubUserGrid from "./GithubUserGrid";

interface Props {
  repository: Repository;
  token?: Nullable<string>;
}

const RepositoryDetails = ({ repository, token = null }: Props) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [contributors, setContributors] = useState<GithubUser[]>([]);
  const [stargazers, setStargazers] = useState<GithubUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRepositoryDetails = async () => {
      setIsLoading(true);
      const stargazers: GithubUser[] = await invoke(
        "get_users_associated_with_repository",
        {
          url: repository.stargazers_url,
          token,
        }
      );

      const contributors: GithubUser[] = await invoke(
        "get_users_associated_with_repository",
        {
          url: repository.contributors_url,
          token,
        }
      );

      const commits: Commit[] = await invoke("get_commits_to_repository", {
        url: repository.commits_url.replace(/{\/[a-z]*}/, ""),
        token,
      });

      setCommits(commits);
      setContributors(contributors);
      setStargazers(stargazers);
      setIsLoading(false);
    };
    getRepositoryDetails();
  }, [repository]);

  return (
    <>Repo title: {repository.name}</>
    // <Card title={repository.name} bordered={false} style={{ margin: "1%" }}>
    //   {repository.description}
    //   <Divider />

    //   <Spin tip="Loading" spinning={isLoading}>
    //     <Typography.Title level={5} style={{ margin: 10 }}>
    //       Contributors
    //     </Typography.Title>
    //     <GithubUserGrid users={contributors} />
    //     <Divider />

    //     <Typography.Title level={5} style={{ marginBottom: 15 }}>
    //       Stargazers
    //     </Typography.Title>
    //     <GithubUserGrid users={stargazers} />
    //     <Divider />

    //     <Typography.Title level={5} style={{ marginBottom: 15 }}>
    //       Commits
    //     </Typography.Title>
    //     <Timeline mode="alternate">
    //       {commits.map((commit, index) => {
    //         if (commit.commit) {
    //           return (
    //             <Timeline.Item key={index} dot={<Popover content={<p>{commit.commit?.author?.name}</p>}><Avatar src={commit.committer?.avatar_url} /></Popover>}>
    //               <p style={{padding: "0px 5px 0px 5px"}}>{commit.commit?.message}</p>
    //             </Timeline.Item>
    //           );
    //         }
    //         return null;
    //       })}
    //     </Timeline>
    //   </Spin>
    // </Card>
  );
};

export default RepositoryDetails;