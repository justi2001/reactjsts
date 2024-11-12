import { Avatar, Button, Input, Space } from "antd";
import { Notification, SearchNormal1 } from "iconsax-react";
import React from "react";
import { colors } from "../constants/color";
import HomeScrenns from "../screens/HomeScrenns";

const HeaderComponent = () => {
  return (
    <div className="p-2 row bg-white m-0">
      <div className="col">
        <Input
          placeholder="Search product, supplier, order"
          style={{
            borderRadius: 100,
            width: "50%",
          }}
          size="large"
          prefix={<SearchNormal1 className="text-muted" size={20} />}
        />
      </div>
      <div className="col text-right">
        <Space>
          <Button
            type="text"
            icon={<Notification size={22} color={colors.gray600} />}
          />
          {/* <Dropdown menu={{ items }}> */}
          <Avatar size={40} />
          {/* </Dropdown> */}
        </Space>
        <HomeScrenns />
      </div>
    </div>
  );
};

export default HeaderComponent;
