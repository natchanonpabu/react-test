import { Button as AntButton, ButtonProps, Col, Divider, Row } from "antd";
import PageContainer from "../../layouts/page-container";
import React from "react";
import { useTranslation } from "react-i18next";

const shapes = [
  "square",
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
];
const shapes_length_array = Array.from(Array(shapes.length).keys());

const LayoutAndStyle = () => {
  const { t } = useTranslation();

  const [orders, set_orders] = React.useState(shapes_length_array);
  const [position_order, set_position_order] = React.useState([1, 2]);

  const moveToLeft = () => {
    let new_orders = [...orders];
    const first = new_orders.shift();
    new_orders.push(first!);

    return set_orders(new_orders);
  };

  const moveToRight = () => {
    let new_orders = [...orders];
    const last = new_orders.pop();
    new_orders.unshift(last!);

    return set_orders(new_orders);
  };

  const swap_position = () => {
    let new_position_order = [...position_order];
    const first = new_position_order.shift();
    new_position_order.push(first!);

    return set_position_order(new_position_order);
  };

  const randomOrders = () => {
    let new_orders: number[] = [];
    orders.reduce((p) => {
      const random_index = Math.floor(Math.random() * p.length);
      new_orders.push(p[random_index]);
      return p.filter((_, index) => index !== random_index);
    }, orders);

    return set_orders(new_orders);
  };

  return (
    <PageContainer title={t("layout_and_style")}>
      <div className="flex justify-center">
        <div className="w-3/4 flex flex-col gap-2">
          <Row className="w-full pb-4" gutter={16}>
            <Col span={6} className="relative">
              <Button onClick={moveToLeft} className="pb-8">
                <div className="triangle -rotate-90"></div>
              </Button>
              <RecommendButton recommend={t("move_shape")} />
            </Col>
            <Col span={12} className="relative">
              <Button
                onClick={swap_position}
                className="flex justify-around pb-8"
              >
                <div className="triangle"></div>
                <div className="triangle rotate-180"></div>
              </Button>
              <RecommendButton recommend={t("move_position")} />
            </Col>
            <Col span={6} className="relative">
              <Button onClick={moveToRight} className="pb-8">
                <div className="triangle rotate-90"></div>
              </Button>
              <RecommendButton recommend={t("move_shape")} />
            </Col>
          </Row>

          <Divider className="my-4" />

          <Row gutter={[16, 16]}>
            <Col span={24} order={position_order[0]}>
              <Row gutter={16} justify="end" className="w-full">
                {orders
                  .filter((_, index) => index < shapes.length / 2)
                  .map((order) => (
                    <Col key={order} span={6}>
                      <Button onClick={randomOrders}>
                        <div className={shapes[order]}></div>
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col span={24} order={position_order[1]}>
              <Row gutter={16} justify="center" className="w-full">
                {orders
                  .filter((_, index) => index >= shapes.length / 2)
                  .map((order) => (
                    <Col key={order} span={6}>
                      <Button onClick={randomOrders}>
                        <div className={shapes[order]}></div>
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </PageContainer>
  );
};

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <AntButton
      className={
        "w-full h-fit p-4 hover:!bg-primary-orange hover:!border-primary-orange " +
        className
      }
      {...props}
    />
  );
};

const RecommendButton = ({ recommend }: { recommend: string }) => {
  return (
    <div className="absolute w-full flex justify-center -bottom-3">
      <div className="text-white bg-primary-green rounded-full px-2">
        {recommend}
      </div>
    </div>
  );
};

export default LayoutAndStyle;
