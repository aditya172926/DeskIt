import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { useAuthContext } from "../components/context/AuthContext";
import { getRepositories } from "../services/commands";
import { GithubItem, Nullable, Repository } from "../types";
import { Container, Grid, GridItem } from "@chakra-ui/react";

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

    const preSelect = () => (
        <Container maxW="5xl">
            <h2>Top Repositories</h2>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'>
                <GridItem colSpan={2} rowSpan={2}>
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
                </GridItem>
                <GridItem colSpan={2}>
                    <p>Your currently work in progress issues</p>
                </GridItem>
                <GridItem colSpan={2}>
                    <p>Your currently work in progress PRs</p>
                </GridItem>
            </Grid>
        </Container>
    );

    const postSelect = () => (
        <>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'>
                <GridItem colSpan={1} rowSpan={2}>
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
                </GridItem>
                <GridItem colSpan={3}>
                    <p>Show the selected repo "{selectedItem?.description}" information here like code contributors, stargrazers, commit history and code files</p>
                </GridItem>
            </Grid>
        </>
    );

    return (
        <>
            {selectedItem ? postSelect() : preSelect()}
        </>
    )

};
export default Explore;