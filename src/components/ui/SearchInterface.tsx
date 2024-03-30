import { Nullable } from "../../types";
import { ReactNode } from "react";

enum SearchUIType {
  Button,
  Text,
}

interface Props {
  type: SearchUIType;
  icon?: Nullable<ReactNode>;
  onClick: () => void;
}

const SearchInterface = ({ type, icon, onClick }: Props) => {
  if (type === SearchUIType.Button) {
    return (
      // <Button
      //   type="primary"
      //   shape="circle"
      //   icon={icon ? icon : <SearchOutlined />}
      //   onClick={onClick}
      // />
      <></>
    );
  }
};

export {
    SearchInterface, SearchUIType
};