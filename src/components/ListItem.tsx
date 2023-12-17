import { useEffect, useState } from "react";
import { GithubItem, Nullable } from "../types";
import { Avatar, Card, Skeleton } from "antd";

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
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Card.Grid hoverable={true} style={gridStyle} onClick={onClickHandler}>
      <Skeleton loading={loading} avatar active>
        <Card.Meta
          avatar={<Avatar src={item.owner.avatar_url} />}
          title={title}
          description={`By ${item.owner.login}`}
        />
      </Skeleton>
    </Card.Grid>
  );
};

export default ListItem;