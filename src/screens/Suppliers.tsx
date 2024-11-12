import { Button, message, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Sort } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/color";
import { useHref } from "react-router-dom";
import { ToogleSupplier } from "../modals";
import { SupplierModel } from "../models/SupplierModel";
import handleAPI from "../apis/handleAPI";

const { Title, Text } = Typography;
const Suppliers = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  // const [total, setTotal] = useState<number>(10);
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const columns: ColumnProps<SupplierModel>[] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Supplier name",
    },
    {
      key: "product",
      dataIndex: "product",
      title: "Supplier name",
    },
    {
      key: "contact",
      dataIndex: "contact",
      title: "Contact",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "type",
      dataIndex: "isTaking",
      title: "Contact",
      render: (isTaking: boolean) => (
        <Text>{isTaking ? "isTaking Return" : "Not Taking Return"}</Text>
      ),
    },
  ];
  useEffect(() => {
    getSuppliers();
  }, []);
  const getSuppliers = async () => {
    const api = `/supplier`;
    setIsLoading(true);
    try {
      const res = await handleAPI(api);

      res.data && setSuppliers(res.data);
      console.log(res.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Table
        loading={isLoading}
        dataSource={suppliers}
        columns={columns}
        title={() => (
          <div className="row">
            <div className="col ">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-right">
              <Space>
                <Button
                  onClick={() => setIsVisibleModalAddNew(true)}
                  type="primary"
                >
                  Add Suppliers
                </Button>
                <Button icon={<Sort size={20} color={colors.gray600} />}>
                  Filters
                </Button>
                <Button>Download all</Button>
              </Space>
            </div>
            <ToogleSupplier
              visible={isVisibleModalAddNew}
              onClose={() => setIsVisibleModalAddNew(false)}
              onAddNew={(val) => console.log(val)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Suppliers;
