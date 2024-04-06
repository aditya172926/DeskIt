import { Avatar, Box, Card, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GithubItem, Nullable } from "../types";

interface Props<T> {
  item: T;
  onSelect: (item: T) => void;
  selectedItem: Nullable<T>;
  title: string;
}

const ListItem = <T extends GithubItem>({
  item,
  onSelect,
  selectedItem,
  title,
}: Props<T>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gridStyle, setGridStyle] = useState<any>({
    margin: "3%",
    width: "94%",
  });

  useEffect(() => {
    const isSelected = selectedItem?.id === item.id;
    setGridStyle({
      margin: "3%",
      width: "94%",
      ...(isSelected && { backgroundColor: "lightblue" }),
    });
  }, [selectedItem]);

  const onClickHandler = () => {
    onSelect(item);
    console.log(item);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Card style={gridStyle} onClick={onClickHandler}>
      <CardHeader>
        <Flex gap={4}>
          <Avatar src={item.owner.avatar_url} />
          <Box>
            <Heading size='sm'>{title}</Heading>
            <Text>{item.description}</Text>
          </Box>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default ListItem;