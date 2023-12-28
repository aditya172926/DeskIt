import { Button } from "antd";
import { Nullable } from "../../types";
import { ReactNode } from "react";
import { SearchOutlined } from "@ant-design/icons";

enum SearchUIType {
  Button,
  Text,
}

interface Props {
  type: SearchUIType;
  icon: Nullable<ReactNode>;
  onClick: () => void;
}

const SearchInterface = ({ type, icon, onClick }: Props) => {
  if (type === SearchUIType.Button) {
    return (
      <Button
        type="primary"
        shape="circle"
        icon={icon ? icon : <SearchOutlined />}
        onClick={onClick}
      />
    );
  }
};

export {
    SearchInterface, SearchUIType
};