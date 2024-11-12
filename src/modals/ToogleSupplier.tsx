import { useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Avatar,
  Typography,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { User } from "iconsax-react";
import { colors } from "../constants/color";
import { uploadFile } from "../utils/uploadFile";
import { replaceName } from "../utils/replaceName";
import handleAPI from "../apis/handleAPI";
import { SupplierModel } from "../models/SupplierModel";
// import { replaceName } from "../utils/replaceName";

const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: SupplierModel) => void;
  supplier?: SupplierModel;
}
const ToogleSupplier = (props: Props) => {
  const { visible, onClose, onAddNew, supplier } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();
  // const [formData, setFormData] = useState<FormModel>();

  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  const addNewSupplier = async (values: any) => {
    setIsLoading(true);

    const data: any = {};
    const api = `/supplier/${
      supplier ? `update?id=${supplier._id}` : "add-new"
    }`;
    for (const i in values) {
      data[i] = values[i] ?? "";
    }

    data.price = values.price ? parseInt(values.price) : 0;
    data.isTaking = isTaking ? 1 : 0;

    if (file) {
      data.photoUrl = await uploadFile(file);
    }
    data.slug = replaceName(values.name);
    console.log(data);

    try {
      const res: any = await handleAPI(api, data, supplier ? "put" : "post");
      message.success(res.message);
      !supplier && onAddNew(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // const getFormData = async () => {
  // 	const api = `/supplier/get-form`;
  // 	setIsGetting(true);
  // 	try {
  // 		const res = await handleAPI(api);
  // 		// res.data && setFormData(res.data);
  // 	} catch (error) {
  // 		console.log(error);
  // 	} finally {
  // 		setIsGetting(false);
  // 	}
  // };
  const handleClose = () => {
    form.resetFields();
    setFile(undefined);
    onClose();
  };

  return (
    <div>
      <Modal
        // loading={isLoading}
        closable={!isLoading}
        open={visible}
        onClose={handleClose}
        onCancel={handleClose}
        onOk={() => form.submit()} // add supplier note
        okButtonProps={{ loading: isLoading }}
        title="Add Supplier"
        okText="Add Supplier"
        cancelText="Discard"
      >
        <label htmlFor="inpFile" className="p-2 mb-3 row">
          {file ? (
            <Avatar size={100} src={URL.createObjectURL(file)} />
          ) : (
            <Avatar
              size={100}
              style={{
                backgroundColor: "white",
                border: "1px dashed #e0e0e0",
              }}
            >
              <User size={60} color={colors.gray600} />
            </Avatar>
          )}
          <div className="ml-3">
            <Paragraph className="text-muted m-0">Drag image here</Paragraph>
            <Paragraph className="text-muted mb-2">Or</Paragraph>
            <Button onClick={() => inpRef.current.click()} type="link">
              Browse image
            </Button>
          </div>
        </label>

        <Form
          disabled={isLoading}
          onFinish={addNewSupplier}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="large"
          form={form}
        >
          <FormItem
            name={"name"}
            rules={[
              {
                required: true,
                message: "Enter supplier name",
              },
            ]}
            label="Supplier Name"
          >
            <Input placeholder="Enter supplier name" allowClear />
          </FormItem>{" "}
          <FormItem name={"product"} label="Product">
            <Input placeholder="Enter product" allowClear />
          </FormItem>{" "}
          <FormItem name={"category"} label="Category">
            <Select placeholder="Select product category" />
          </FormItem>{" "}
          <FormItem name={"price"} label="Buying Price">
            <Input placeholder="Enter buying price" type="number" allowClear />
          </FormItem>{" "}
          <FormItem name={"contact"} label="Contact Number">
            <Input placeholder="Enter supplier contact number" />
          </FormItem>
          <FormItem label="Type">
            <div className="mb-2">
              <Button
                onClick={() => setIsTaking(false)}
                type={isTaking === false ? "primary" : "default"}
              >
                Not taking return
              </Button>
            </div>
            <Button
              onClick={() => setIsTaking(true)}
              type={isTaking ? "primary" : "default"}
            >
              Taking return
            </Button>
          </FormItem>
        </Form>
        <div className="d-none">
          <input
            ref={inpRef}
            accept="image/*" //chỉ lấy những file image
            type="file"
            name=""
            id="inpFile"
            onChange={(val: any) => setFile(val.target.files[0])}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ToogleSupplier;
