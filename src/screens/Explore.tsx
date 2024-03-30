import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { useAuthContext } from "../components/context/AuthContext";
import { getRepositories } from "../services/commands";
import { GithubItem, Nullable, Repository } from "../types";

const Explore = () => {
    const { token } = useAuthContext();
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedItem, setSelectedItem] = useState<Nullable<GithubItem>>(null);

    useEffect(() => {
        const repos = async () => {
            setRepositories(await getRepositories(token));
        }
        repos();
    }, [token]);

    return (
        <>
        <h2>Top Repositories</h2>
            <div
                id="scrollableDiv"
                style={{ height: "100vh", overflow: "auto", padding: "0 5px" }}
            >
                {repositories.map((item: Repository, index: number) => (
                    <ListItem
                        key={index}
                        item={item}
                        onSelect={setSelectedItem}
                        selectedItem={selectedItem}
                        title={item.name}
                    />
                ))}
            </div>
        </>
    )

};
export default Explore;